"use server"

import prisma from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function register(values: any) {
  const { name, email, password } = values

  try {
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
