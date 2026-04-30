import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User, Mail, Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ProfilePage() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.1em] text-[10px]">Informasi Akun & Pengaturan Personal</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
          <User className="h-6 w-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="h-40 bg-gradient-to-br from-primary/20 via-primary/5 to-background relative">
             <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="h-32 w-32 rounded-[2.5rem] bg-card border-8 border-background flex items-center justify-center text-primary shadow-2xl ring-1 ring-black/5">
                  <User className="h-16 w-16" />
                </div>
             </div>
          </div>
          <CardContent className="pt-20 pb-10 text-center">
            <h2 className="text-3xl font-black tracking-tighter">{user?.name}</h2>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mt-2">{(user as any)?.role}</p>
            
            <div className="mt-10 flex flex-col gap-3 px-4">
              <Button className="rounded-2xl font-bold h-14 shadow-lg shadow-primary/20">
                EDIT PROFIL
              </Button>
              <Button variant="ghost" className="rounded-2xl font-bold text-destructive hover:bg-destructive/10 h-14">
                HAPUS AKUN
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-8">
          <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-secondary/20 border-b p-10">
              <CardTitle className="text-2xl font-bold tracking-tight">Detail Akun</CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Data Terverifikasi Sistem</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="flex items-start gap-8">
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0 border-2 shadow-inner">
                  <User className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Nama Lengkap</p>
                  <p className="font-bold text-xl tracking-tight">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0 border-2 shadow-inner">
                  <Mail className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Email Terdaftar</p>
                  <p className="font-bold text-xl tracking-tight">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0 border-2 shadow-inner">
                  <Shield className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Level Akses</p>
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border-2 border-primary/20">
                      {(user as any)?.role}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
