"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, UserPlus } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { register } from "@/app/actions/auth"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
    
    try {
      const result = await register(values)
      if (result.success) {
        router.push("/auth/login?registered=true")
      } else {
        setError(result.error || "Gagal mendaftar")
      }
    } catch (err) {
      setError("Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"
          >
            <UserPlus className="h-8 w-8" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight">Daftar Akun</h1>
          <p className="text-muted-foreground">Mulai gunakan Presence untuk absensi Anda</p>
        </div>

        <Card className="border-none shadow-xl ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>Registrasi</CardTitle>
            <CardDescription>
              Lengkapi data berikut untuk membuat akun baru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Nama Lengkap"
                  disabled={isLoading}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive font-medium">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive font-medium">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive font-medium">{form.formState.errors.password.message}</p>
                )}
              </div>
              {error && (
                <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive font-medium">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mendaftar...
                  </>
                ) : (
                  "Buat Akun"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <div className="text-center text-sm text-muted-foreground">
              Sudah punya akun? <Link href="/auth/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
