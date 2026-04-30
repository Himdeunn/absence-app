import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import prisma from "@/lib/prisma"
import { compare } from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user || !user.passwordHash) return null

          // Check if account is locked
          if (user.lockUntil && user.lockUntil > new Date()) {
            throw new Error("ACCOUNT_LOCKED")
          }

          const isValid = await compare(credentials.password as string, user.passwordHash)
          
          if (!isValid) {
            // Increment failed attempts
            const newAttempts = user.loginAttempts + 1
            let lockUntil = null
            
            // Lock account after 5 failed attempts for 15 minutes
            if (newAttempts >= 5) {
              lockUntil = new Date(Date.now() + 15 * 60 * 1000)
            }

            await prisma.user.update({
              where: { id: user.id },
              data: { 
                loginAttempts: newAttempts,
                lockUntil
              }
            })

            return null
          }

          // Reset failed attempts on successful login
          await prisma.user.update({
            where: { id: user.id },
            data: { 
              loginAttempts: 0,
              lockUntil: null
            }
          })

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (error: any) {
          console.error("Auth authorize error:", error)
          if (error.message === "ACCOUNT_LOCKED") {
             throw new Error("Akun Anda terkunci sementara karena terlalu banyak percobaan gagal.")
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
})
