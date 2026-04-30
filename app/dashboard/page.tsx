import { auth } from "@/auth"
import { getTodayAttendance, getRecentAttendance } from "@/app/actions/attendance"
import { RealTimeClock } from "@/components/dashboard/clock"
import { AttendanceButton } from "@/components/dashboard/attendance-button"
import { AttendanceHistory } from "@/components/dashboard/history"
import { User, ShieldCheck, Sparkles } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  const todayAttendance = await getTodayAttendance()
  const recentAttendances = await getRecentAttendance()

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
            <Sparkles className="h-4 w-4" />
            Welcome Back
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Halo, {session?.user?.name || "Rekan"}!</h1>
          <p className="text-muted-foreground font-medium">Jangan lupa untuk mencatat kehadiran Anda hari ini.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-card border shadow-sm rounded-2xl p-4 ring-1 ring-black/5">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Sesi Aktif</p>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <p className="text-sm font-bold">{(session?.user as any)?.role === "ADMIN" ? "Administrator" : "Karyawan"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col items-center space-y-10 py-6">
          <RealTimeClock />
          <AttendanceButton todayAttendance={todayAttendance} />
        </div>
        
        <div className="lg:sticky lg:top-24">
          <AttendanceHistory attendances={recentAttendances} />
        </div>
      </div>
    </div>
  )
}
