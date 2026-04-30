"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function PrivacyPage() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <header className="container mx-auto h-24 flex items-center px-4 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="rounded-full gap-2 font-black uppercase tracking-widest text-[10px]">
            <ArrowLeft className="h-4 w-4" />
            {t('backToHome')}
          </Button>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 shadow-xl">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">{t('privacy')}</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs">
              {t('lastUpdated')}: {new Date().toLocaleDateString()}
            </p>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            {t('privacyDesc')}
          </p>

          <div className="grid gap-12 pt-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center border-2">
                   <Database className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">Data yang Kami Kumpulkan</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Kami mengumpulkan data personal minimal seperti Nama, Email, Lokasi Geografis (saat absen), dan Foto Selfie sebagai bukti kehadiran yang sah.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center border-2">
                   <Eye className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">Penggunaan Data</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Data Anda digunakan semata-mata untuk kepentingan administrasi kehadiran internal organisasi Anda. Kami tidak menjual data Anda kepada pihak ketiga manapun.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center border-2">
                   <Lock className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">Keamanan Data</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Kami menggunakan enkripsi tingkat lanjut dan infrastruktur server yang aman untuk memastikan data Anda terlindungi dari akses yang tidak sah.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <footer className="container mx-auto px-4 py-24 border-t mt-24 flex flex-col md:flex-row items-center justify-between gap-8 text-muted-foreground font-bold text-sm">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-8 rounded-xl object-cover" />
          {t('brand')} — Kinetic Minimalism.
        </div>
        <div className="flex items-center gap-12 uppercase tracking-[0.2em] text-[10px]">
           <Link href="/terms" className="hover:text-primary transition-colors">{t('terms')}</Link>
           <span>© 2024 {t('brand')}</span>
        </div>
      </footer>
    </div>
  )
}
