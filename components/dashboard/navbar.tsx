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
  UserCircle
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-24 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-16">
          <Link href="/dashboard" className="flex items-center space-x-4 group">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="h-12 w-12 rounded-xl object-cover shadow-xl transition-transform group-hover:scale-105" 
            />
            <span className="text-3xl font-black tracking-tighter">{t('brand')}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitcher />
            <div className="h-8 w-px bg-border mx-2" />
            <Link href="/dashboard/profile" className="flex items-center space-x-4 px-6 py-2.5 bg-secondary/50 hover:bg-secondary rounded-2xl border-2 transition-all group">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden shadow-inner">
                <UserIcon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{user?.name?.split(' ')[0] || "User"}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="rounded-full h-12 w-12 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border-2 border-transparent hover:border-destructive/20"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-12 w-12 border-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && mounted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b bg-background overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-6 py-5 text-sm font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="mr-5 h-6 w-6" />
                  {item.label}
                </Link>
              ))}
              <hr className="my-6 opacity-50" />
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-5">
                  <div className="h-14 w-14 rounded-3xl bg-secondary flex items-center justify-center border-2 shadow-xl">
                    <UserIcon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-black uppercase tracking-widest leading-none mb-1.5">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground font-bold">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-14 w-14 text-destructive hover:bg-destructive/10 border-2 border-transparent hover:border-destructive/20"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-7 w-7" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
