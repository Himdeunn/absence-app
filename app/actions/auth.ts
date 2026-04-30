"use server"

import prisma from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function register(values: any) {
  const { name, email, password, turnstileToken } = values

  // Verify Turnstile Token
  if (!turnstileToken) {
    return { success: false, error: "Verifikasi keamanan diperlukan" }
  }

  try {
    const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAADGhp74oIKwaVCUbTWDnlmL1Q_E"
    
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${TURNSTILE_SECRET}&response=${turnstileToken}`,
      }
    )

    const verifyData = await verifyResponse.json()
    if (!verifyData.success) {
      console.error("Turnstile verification failed:", verifyData)
      return { success: false, error: "Verifikasi keamanan gagal" }
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return { success: false, error: "Email sudah terdaftar" }
    }

    const hashedPassword = await hash(password, 12)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: "USER", // Default role
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Register error:", error)
    return { success: false, error: "Terjadi kesalahan saat mendaftar" }
  }
}
