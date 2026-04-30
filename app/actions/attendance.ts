"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { startOfDay } from "date-fns"

export async function clockIn(location?: { lat: number; lng: number }) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const userId = (session.user as any).id
  const now = new Date()
  const today = startOfDay(now)

  const existing = await prisma.attendance.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      }
    },
  })

  if (existing) throw new Error("Sudah absen hari ini")

  await prisma.attendance.create({
    data: {
      userId,
      date: today,
      clockIn: now,
      locationLat: location?.lat,
      locationLong: location?.lng,
    },
  })

  revalidatePath("/dashboard")
  return { success: true }
}

export async function clockOut() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const userId = (session.user as any).id
  const now = new Date()
  const today = startOfDay(now)

  const existing = await prisma.attendance.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      }
    },
  })

  if (!existing) throw new Error("Belum absen masuk hari ini")
  if (existing.clockOut) throw new Error("Sudah absen keluar hari ini")

  await prisma.attendance.update({
    where: { id: existing.id },
    data: {
      clockOut: now,
    },
  })

  revalidatePath("/dashboard")
  return { success: true }
}

export async function getTodayAttendance() {
  const session = await auth()
  if (!session?.user) return null

  const userId = (session.user as any).id
  const today = startOfDay(new Date())

  return await prisma.attendance.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      }
    },
  })
}

export async function getRecentAttendance() {
  const session = await auth()
  if (!session?.user) return []

  const userId = (session.user as any).id

  return await prisma.attendance.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 7,
  })
}
