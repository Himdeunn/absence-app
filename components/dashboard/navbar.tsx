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
  ChevronRight,
  Globe
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { label: t('dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { label: t('history'), href: "/dashboard/history", icon: History },
    { label: t('profile'), href: "/dashboard/profile", icon: UserCircle },
    ...(user?.role === "ADMIN" ? [{ label: t('admin'), href: "/admin", icon: Settings }] : []),
  ]

  if (!mounted) return null

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-8">
      {/* Floating Pill Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "w-full max-w-[1200px] h-20 bg-zinc-950 text-white rounded-full flex items-center justify-between px-3 md:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/20 backdrop-blur-2xl transition-all duration-500",
          isMobileMenuOpen ? "rounded-[2rem] md:rounded-full" : "rounded-full"
        )}
      >
        {/* Left: Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 p-1.5 hover:opacity-80 transition-opacity">
          <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-xl">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="h-full w-full object-cover" 
            />
          </div>
          <span className="hidden lg:block text-2xl font-black tracking-tighter mr-4">{t('brand')}</span>
        </Link>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 whitespace-nowrap",
                pathname === item.href
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
           <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <div className="h-8 w-px bg-white/10" />
              <Link 
                href="/dashboard/profile" 
                className="flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all shadow-lg active:scale-95"
              >
                <span className="text-[10px] font-black uppercase tracking-widest hidden xl:block">
                   {user?.email}
                </span>
                <UserIcon className="h-4 w-4" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
                className="h-12 w-12 rounded-full hover:bg-white/10 text-zinc-400 hover:text-rose-500 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Button>
           </div>

           {/* Mobile Menu Toggle */}
           <Button
             variant="ghost"
             size="icon"
             className="md:hidden h-14 w-14 rounded-full hover:bg-white/10 text-white transition-all active:scale-90"
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           >
             {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-32 left-4 right-4 bg-zinc-950 rounded-[3rem] p-8 z-[90] md:hidden shadow-2xl ring-1 ring-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-10">
                <div className="grid gap-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 px-6 mb-2">Main Navigation</p>
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all duration-300",
                          pathname === item.href 
                            ? "bg-white text-black shadow-xl" 
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className={cn(
                          "p-3 rounded-2xl",
                          pathname === item.href ? "bg-black/5" : "bg-white/5"
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-black uppercase tracking-[0.15em]">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-white/10 mx-6" />

                <div className="space-y-6">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 px-6">Account & Settings</p>
                   
                   <div className="flex flex-col gap-4">
                      {/* Integrated Language Switcher for Mobile */}
                      <div className="bg-white/5 rounded-[2.5rem] p-4 flex flex-col gap-2">
                         <div className="flex items-center gap-3 px-4 mb-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t('privacy').split(' ')[0]} Language</span>
                         </div>
                         <div className="flex items-center justify-center">
                            <LanguageSwitcher />
                         </div>
                      </div>

                      <Link 
                        href="/dashboard/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between bg-white text-black p-6 rounded-[2.5rem] shadow-xl active:scale-95 transition-transform"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-black/5 flex items-center justify-center">
                             <UserIcon className="h-6 w-6" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-black uppercase tracking-tight leading-none mb-1">{user?.name || "User"}</p>
                            <p className="text-[9px] font-bold text-black/60 truncate max-w-[150px]">{user?.email}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 opacity-50" />
                      </Link>

                      <Button
                        variant="ghost"
                        onClick={() => signOut()}
                        className="h-20 w-full rounded-[2.5rem] border-2 border-white/5 text-rose-500 font-black uppercase tracking-[0.2em] text-xs gap-3 hover:bg-rose-500/10 transition-all"
                      >
                        <LogOut className="h-5 w-5" />
                        {t('logout')}
                      </Button>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
