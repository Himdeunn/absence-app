"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Clock, Shield, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Home() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30 overflow-x-hidden">
      <header className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center space-x-3">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-primary/20" />
          <span className="text-2xl font-bold tracking-tighter">{t('brand')}</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/auth/login" className="hidden sm:block">
            <Button variant="ghost" className="font-bold text-base">{t('login')}</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="font-bold text-base rounded-xl px-6">{t('register')}</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 pt-16 pb-32 text-center md:pt-28">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 rounded-full border bg-secondary/50 px-5 py-2 text-sm font-bold backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="tracking-tight uppercase">{t('brand')} v1.0 — Kinetic Minimalism</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-8 max-w-4xl text-6xl font-extrabold tracking-tight md:text-8xl leading-[0.9]"
          >
            {t('slogan').split('.')[0]}. <span className="text-primary italic">{t('slogan').split('.')[1]}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl font-medium"
          >
            {t('heroDesc')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 w-full sm:w-auto px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 group">
                {t('startFree')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="h-16 w-full sm:w-auto px-10 text-lg font-bold rounded-2xl border-2 transition-all hover:bg-secondary">
                {t('productDemo')}
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 py-24 border-t relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{t('efficientFast')}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{t('efficientDesc')}</p>
            </div>
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{t('instantHistory')}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{t('historyDesc')}</p>
            </div>
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{t('accurateVerify')}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">{t('verifyDesc')}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-16 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground text-sm font-bold">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Logo" className="h-6 w-6 rounded-lg object-cover" />
          {t('brand')} — Simple. Accurate. Minimal.
        </div>
        <div className="flex items-center gap-8 uppercase tracking-widest text-[10px]">
          <a href="#" className="hover:text-primary transition-colors">{t('privacy')}</a>
          <a href="#" className="hover:text-primary transition-colors">{t('terms')}</a>
          <a href="#" className="hover:text-primary transition-colors">© 2024 {t('brand')}</a>
        </div>
      </footer>
    </div>
  )
}
