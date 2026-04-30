"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
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
          <h1 className="text-4xl font-black tracking-tighter">Presence</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px]">Minimalist Auth</p>
        </div>

        <Card className="border-2 shadow-2xl rounded-[2rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8 text-center border-b bg-secondary/20">
            <CardTitle className="text-2xl font-bold tracking-tight">Selamat Datang</CardTitle>
            <CardDescription className="text-xs font-medium">
              Masukkan kredensial Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-2 focus:border-primary transition-all"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive font-bold ml-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-2 focus:border-primary transition-all"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive font-bold ml-1">{form.formState.errors.password.message}</p>
                )}
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-destructive/10 border-2 border-destructive/20 p-4 text-xs text-destructive font-bold text-center"
                >
                  {error}
                </motion.div>
              )}
              <Button type="submit" className="w-full h-14 rounded-xl font-bold text-base shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  "MASUK SEKARANG"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t py-6 bg-secondary/10">
            <div className="text-center text-xs font-bold text-muted-foreground">
              Belum punya akun? <Link href="/auth/register" className="text-primary hover:underline">Daftar di sini</Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
