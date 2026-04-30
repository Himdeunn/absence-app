"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { startOfDay } from "date-fns"

export async function getAdminStats() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const today = startOfDay(new Date())
  
  const totalUsers = await prisma.user.count()
  const todayAttendances = await prisma.attendance.findMany({
    where: { date: today },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { clockIn: 'desc' }
  })

  return {
    totalUsers,
    presentToday: todayAttendances.length,
    notPresent: Math.max(0, totalUsers - todayAttendances.length),
    todayAttendances: todayAttendances.map(att => ({
      ...att,
      clockIn: att.clockIn?.toISOString(),
      clockOut: att.clockOut?.toISOString(),
      date: att.date.toISOString(),
    }))
  }
}

export async function getAllAttendanceForExport() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized")
  }

  const attendances = await prisma.attendance.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { date: 'desc' }
  })

  return attendances.map(att => ({
    id: att.id,
    userName: att.user.name || "N/A",
    userEmail: att.user.email,
    date: att.date.toISOString(),
    clockIn: att.clockIn?.toISOString(),
    clockOut: att.clockOut?.toISOString(),
    location: att.locationLat ? `${att.locationLat}, ${att.locationLong}` : "No Location"
  }))
}
