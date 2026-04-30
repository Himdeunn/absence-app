import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Clock, Shield, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30 overflow-x-hidden">
      <header className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <span className="font-bold text-xl">P</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter">Presence</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="hidden sm:block">
            <Button variant="ghost" className="font-bold text-base">Masuk</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="font-bold text-base rounded-xl px-6">Daftar</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 pt-16 pb-32 text-center md:pt-28">
          <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 rounded-full border bg-secondary/50 px-5 py-2 text-sm font-bold backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="tracking-tight">Modern Minimalist Attendance System</span>
          </div>
          <h1 className="mx-auto mb-8 max-w-4xl text-6xl font-extrabold tracking-tight md:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Absensi Lebih <span className="text-primary italic">Cepat</span>, Kerja Lebih <span className="text-primary">Efisien</span>.
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Sistem absensi satu sentuhan dengan desain minimalis untuk organisasi modern. Pantau kehadiran tim secara real-time dengan akurasi tinggi.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 w-full sm:w-auto px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 group">
                Mulai Gratis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="h-16 w-full sm:w-auto px-10 text-lg font-bold rounded-2xl border-2 transition-all hover:bg-secondary">
                Demo Produk
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 border-t relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">One-Tap Presence</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">Absen masuk dan keluar hanya dengan satu klik. Sangat cepat dan responsif di semua perangkat.</p>
            </div>
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Real-time Tracking</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">Pantau riwayat kehadiran harian dan bulanan secara instan dari dashboard Anda yang bersih.</p>
            </div>
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Geolocation Verified</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">Verifikasi lokasi absensi secara otomatis untuk memastikan kejujuran data di setiap sesi.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-16 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground text-sm font-bold">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-primary text-[10px]">P</div>
          Presence © 2024
        </div>
        <div className="flex items-center gap-8 uppercase tracking-widest text-[10px]">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  )
}
