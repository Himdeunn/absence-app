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
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

interface NavbarProps {
  user: any
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { label: t('dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { label: t('history'), href: "/dashboard/history", icon: History },
    { label: t('profile'), href: "/dashboard/profile", icon: UserCircle },
    ...(user?.role === "ADMIN" ? [{ label: t('admin'), href: "/admin", icon: Settings }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="h-10 w-10 rounded-xl object-cover shadow-lg transition-transform group-hover:scale-105" 
            />
            <span className="text-2xl font-bold tracking-tighter">Presence</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-xl transition-all",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="mr-2.5 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <div className="h-6 w-px bg-border mx-2" />
            <Link href="/dashboard/profile" className="flex items-center space-x-3 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-2xl border transition-colors group">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                <UserIcon className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">{user?.name?.split(' ')[0] || "User"}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="rounded-full h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-11 w-11"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-5 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-[1.25rem] transition-all",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="mr-4 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <hr className="my-4 opacity-50" />
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center border shadow-inner">
                    <UserIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest leading-none mb-1">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground font-medium">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12 text-destructive hover:bg-destructive/10"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
