"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut, 
  User as UserIcon,
  Menu,
  X,
  UserCircle,
  ChevronRight
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

interface NavbarProps {
  user: any
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { label: t('dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { label: t('history'), href: "/dashboard/history", icon: History },
    { label: t('profile'), href: "/dashboard/profile", icon: UserCircle },
    ...(user?.role === "ADMIN" ? [{ label: t('admin'), href: "/admin", icon: Settings }] : []),
  ]

  if (!mounted) return null

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8">
      {/* Floating Pill Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-[1200px] h-20 bg-zinc-950 text-white rounded-full flex items-center justify-between px-2 md:px-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
      >
        {/* Left: Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 p-1.5 hover:opacity-80 transition-opacity">
          <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/20">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="h-full w-full object-cover" 
            />
          </div>
          <span className="hidden lg:block text-xl font-black tracking-tighter mr-4">{t('brand')}</span>
        </Link>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 whitespace-nowrap",
                pathname === item.href
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: User / Language / Menu */}
        <div className="flex items-center gap-2">
           <div className="hidden sm:flex items-center gap-2">
              <LanguageSwitcher />
              <div className="h-8 w-px bg-white/10 mx-1" />
           </div>
           
           <div className="hidden lg:flex items-center">
              <Link 
                href="/dashboard/profile" 
                className="flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-colors"
              >
                <span className="text-[11px] font-black uppercase tracking-widest">
                   {user?.email}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Link>
           </div>

           <Button
             variant="ghost"
             size="icon"
             className="md:hidden h-14 w-14 rounded-full hover:bg-white/10 text-white"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </Button>

           <Button
             variant="ghost"
             size="icon"
             onClick={() => signOut()}
             className="hidden md:flex h-14 w-14 rounded-full hover:bg-white/10 text-zinc-400 hover:text-rose-500"
           >
             <LogOut className="h-5 w-5" />
           </Button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-32 left-4 right-4 bg-zinc-950 rounded-[2.5rem] p-10 z-[60] md:hidden shadow-2xl ring-1 ring-white/10 flex flex-col items-center gap-8"
            >
              <div className="flex flex-col items-center gap-6 w-full">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block text-center text-2xl font-black uppercase tracking-[0.2em] transition-colors",
                        pathname === item.href ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="w-full h-px bg-white/10" />

              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex items-center gap-6">
                   <LanguageSwitcher />
                   <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut()}
                    className="h-12 w-12 rounded-full border border-white/10 text-zinc-400"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
                <Link 
                  href="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs w-full text-center"
                >
                  {user?.email}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
