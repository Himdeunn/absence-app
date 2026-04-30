"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email atau password salah")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("Terjadi kesalahan, silakan coba lagi")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto mb-4"
          >
            <img src="/logo.jpg" alt="Logo" className="h-20 w-20 rounded-3xl object-cover mx-auto shadow-2xl ring-4 ring-background" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter">{t('brand')}</h1>
          <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">Kinetic Authentication</p>
        </div>

        <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8 text-center border-b bg-secondary/20">
            <CardTitle className="text-2xl font-black tracking-tight uppercase">{t('welcomeBack')}</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">
              {t('enterCredentials')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="flex justify-between items-center px-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t('newPassword')}</label>
                   <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">{t('forgotPassword')}</Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="h-14 rounded-2xl border-2 focus:border-primary transition-all font-bold"
                  {...form.register("password")}
                />
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-rose-50 border-2 border-rose-100 p-4 text-[10px] text-rose-600 font-black uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}
              <Button type="submit" className="w-full h-16 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('authenticating')}
                  </>
                ) : (
                  t('login')
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t py-8 bg-secondary/10">
            <div className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {t('dontHaveAccount')} <Link href="/auth/register" className="text-primary hover:underline">{t('registerHere')}</Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
