"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User, Mail, Shield, Loader2, CheckCircle2, AlertCircle, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { updateProfile, deleteAccount } from "@/app/actions/user"
import { motion, AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const { t } = useLanguage()
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [name, setName] = useState(session?.user?.name || "")
  const [password, setPassword] = useState("")
  const [confirmPass, setConfirmPass] = useState("")

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setMessage(null)

    if (password && password !== confirmPass) {
      setMessage({ type: 'error', text: "Password tidak cocok" })
      setIsUpdating(false)
      return
    }

    const result = await updateProfile({ 
      name: name !== session?.user?.name ? name : undefined,
      password: password || undefined
    })

    if (result.success) {
      setMessage({ type: 'success', text: "Profil berhasil diperbarui" })
      setPassword("")
      setConfirmPass("")
      await update() // Refresh session
    } else {
      setMessage({ type: 'error', text: result.error || "Terjadi kesalahan" })
    }
    setIsUpdating(false)
  }

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.")) {
      const result = await deleteAccount()
      if (result.success) {
        signOut({ callbackUrl: "/" })
      } else {
        alert(result.error)
      }
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('profile')}</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.1em] text-[10px]">{t('accountInfo')}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
          <User className="h-6 w-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm h-fit">
          <div className="h-40 bg-gradient-to-br from-primary/20 via-primary/5 to-background relative">
             <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="h-32 w-32 rounded-[2.5rem] bg-card border-8 border-background flex items-center justify-center text-primary shadow-2xl ring-1 ring-black/5 overflow-hidden">
                  <User className="h-16 w-16" />
                </div>
             </div>
          </div>
          <CardContent className="pt-20 pb-10 text-center">
            <h2 className="text-3xl font-black tracking-tighter">{session?.user?.name}</h2>
            <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mt-2">{(session?.user as any)?.role}</p>
            
            <div className="mt-10 flex flex-col gap-3 px-4">
              <Button 
                variant="ghost" 
                className="rounded-2xl font-bold text-destructive hover:bg-destructive/10 h-14"
                onClick={handleDelete}
              >
                {t('deleteAccount')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-8">
          <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-secondary/20 border-b p-10">
              <CardTitle className="text-2xl font-bold tracking-tight">{t('editProfile')}</CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t('saveChanges')}</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('fullName')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="h-12 pl-12 rounded-xl border-2 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('emailAddress')}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={session?.user?.email || ""} 
                        disabled
                        className="h-12 pl-12 rounded-xl border-2 bg-secondary/50 opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border my-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('newPassword')}</label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pl-12 rounded-xl border-2 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('confirmPassword')}</label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password"
                        placeholder="••••••••"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="h-12 pl-12 rounded-xl border-2 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border-2",
                        message.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"
                      )}
                    >
                      {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      {message.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="w-full h-14 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20"
                >
                  {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : t('saveChanges')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
