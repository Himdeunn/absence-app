"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { register } from "@/app/actions/auth"
import { useLanguage } from "@/components/language-provider"
import { toast } from "sonner"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true)
    
    try {
      const result = await register(values)
      if (result.success) {
        toast.success("Pendaftaran berhasil! Silakan masuk.")
        router.push("/auth/login?registered=true")
      } else {
        toast.error(result.error || "Gagal mendaftar")
      }
    } catch (err) {
      toast.error("Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-4"
          >
            <img src="/logo.jpg" alt="Logo" className="h-20 w-20 rounded-3xl object-cover mx-auto shadow-2xl ring-4 ring-background" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter">{t('brand')}</h1>
          <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">Create Account</p>
        </div>

        <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8 text-center border-b bg-secondary/20">
            <CardTitle className="text-2xl font-black tracking-tight uppercase">{t('createAccount')}</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">
              {t('completeData')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('fullName')}</label>
                <Input
                  placeholder="John Doe"
                  disabled={isLoading}
                  className="h-14 rounded-2xl border-2 focus:border-primary transition-all font-bold"
                  {...form.register("name")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('emailAddress')}</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  className="h-14 rounded-2xl border-2 focus:border-primary transition-all font-bold"
                  {...form.register("email")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">{t('newPassword')}</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="h-14 rounded-2xl border-2 focus:border-primary transition-all font-bold"
                  {...form.register("password")}
                />
              </div>
              <Button type="submit" className="w-full h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('registering')}
                  </>
                ) : (
                  t('register')
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t py-8 bg-secondary/10">
            <div className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {t('alreadyHaveAccount')} <Link href="/auth/login" className="text-primary hover:underline">{t('loginHere')}</Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
