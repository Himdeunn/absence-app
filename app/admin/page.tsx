import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react"
import { startOfDay, format } from "date-fns"
import { id } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminPage() {
  const session = await auth()

  if ((session?.user as any)?.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const today = startOfDay(new Date())
  
  const totalUsers = await prisma.user.count()
  const todayAttendances = await prisma.attendance.findMany({
    where: { date: today },
    include: { user: true },
    orderBy: { clockIn: 'desc' }
  })

  const presentCount = todayAttendances.length
  const absentCount = Math.max(0, totalUsers - presentCount)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground font-medium">Rekapitulasi kehadiran organisasi hari ini.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">{format(today, "EEEE, d MMMM", { locale: id })}</p>
          <p className="text-xs text-muted-foreground font-medium">Status Real-time</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg ring-1 ring-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Total Anggota</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Terdaftar di sistem</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg ring-1 ring-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Hadir</CardTitle>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/30 rounded-lg text-emerald-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{presentCount}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Telah melakukan clock-in</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg ring-1 ring-black/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Belum Hadir</CardTitle>
            <div className="p-2 bg-rose-100 dark:bg-rose-950/30 rounded-lg text-rose-600">
              <XCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{absentCount}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Belum ada keterangan</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-xl ring-1 ring-black/5 overflow-hidden">
        <CardHeader className="bg-secondary/10 border-b flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Log Kehadiran Hari Ini</CardTitle>
            <p className="text-xs text-muted-foreground font-medium">Urutan berdasarkan waktu terbaru</p>
          </div>
          <Button variant="outline" size="sm" className="font-bold text-xs h-8">
            Export CSV
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {todayAttendances.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground font-medium">
                Belum ada aktivitas absensi hari ini.
              </div>
            ) : (
              todayAttendances.map((att) => (
                <div key={att.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm">
                      {att.user.name?.[0] || att.user.email[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{att.user.name || att.user.email}</p>
                      <p className="text-xs text-muted-foreground font-medium">{att.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase">Clock In</p>
                      <p className="text-sm font-black tabular-nums">{format(new Date(att.clockIn), "HH:mm")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-amber-600 uppercase">Clock Out</p>
                      <p className="text-sm font-black tabular-nums">{att.clockOut ? format(new Date(att.clockOut), "HH:mm") : "--:--"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
