"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { hash } from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function updateProfile(data: { name?: string; password?: string }) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const userId = (session.user as any).id
  
  const updateData: any = {}
  if (data.name) updateData.name = data.name
  if (data.password) {
    updateData.passwordHash = await hash(data.password, 12)
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: updateData
    })

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: "Gagal memperbarui profil" }
  }
}

export async function deleteAccount() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const userId = (session.user as any).id

  try {
    // Delete related attendance records first
    await prisma.attendance.deleteMany({
      where: { userId }
    })
    
    await prisma.user.delete({
      where: { id: userId }
    })

    return { success: true }
  } catch (error) {
    console.error("Delete account error:", error)
    return { success: false, error: "Gagal menghapus akun" }
  }
}
