"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Scale, ShieldCheck, FileText, Gavel } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function TermsPage() {
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
              <Scale className="h-8 w-8" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">{t('terms')}</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-xs">
              {t('lastUpdated')}: {new Date().toLocaleDateString()}
            </p>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            {t('termsDesc')}
          </p>

          <div className="grid gap-12 pt-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center border-2">
                   <Gavel className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">1. Penggunaan Layanan</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                InkWell menyediakan platform absensi berbasis web untuk organisasi. Anda bertanggung jawab untuk menjaga keamanan akun Anda dan setiap aktivitas yang terjadi di bawah akun tersebut.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center border-2">
                   <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">2. Integritas Data</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Setiap data absensi yang dicatat melalui fitur verifikasi wajah dan lokasi haruslah data yang sebenarnya. Manipulasi data dapat menyebabkan pembatasan akses pada layanan kami.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-secondary flex items-center justify-center border-2">
                   <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase">3. Batasan Tanggung Jawab</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-medium">
                InkWell tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan ini.
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
           <Link href="/privacy" className="hover:text-primary transition-colors">{t('privacy')}</Link>
           <span>© 2024 {t('brand')}</span>
        </div>
      </footer>
    </div>
  )
}
