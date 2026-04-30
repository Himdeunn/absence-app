"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getTodayAttendance, getRecentAttendance } from "@/app/actions/attendance"
import { RealTimeClock } from "@/components/dashboard/clock"
import { AttendanceButton } from "@/components/dashboard/attendance-button"
import { AttendanceHistory } from "@/components/dashboard/history"
import { User, ShieldCheck, Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { t } = useLanguage()
  const [todayAttendance, setTodayAttendance] = useState<any>(null)
  const [recentAttendances, setRecentAttendances] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchData() {
      if (status === "authenticated") {
        const [today, recent] = await Promise.all([
          getTodayAttendance(),
          getRecentAttendance()
        ])
        setTodayAttendance(today)
        setRecentAttendances(recent)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [status])

  if (!mounted || status === "loading" || isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
            {t('loadingData')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
            <Sparkles className="h-4 w-4" />
            {t('welcomeBack')}
          </div>
          <h1 className="text-5xl font-black tracking-tighter">
            {t('welcome')}, {session?.user?.name || "Rekan"}!
          </h1>
          <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest">
            {todayAttendance?.clockIn ? t('attendanceRecorded') : t('notPresentYet')}
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-card border-2 shadow-2xl rounded-[2.5rem] p-6 backdrop-blur-sm">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 shadow-inner">
            <User className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">{t('activeSession')}</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-black uppercase tracking-widest">
                {(session?.user as any)?.role === "ADMIN" ? t('administrator') : t('employee')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col items-center space-y-12 py-8 bg-secondary/20 rounded-[4rem] border-2 border-dashed border-primary/20">
          <RealTimeClock />
          <AttendanceButton todayAttendance={todayAttendance} />
        </div>
        
        <div className="lg:sticky lg:top-24">
          <div className="flex items-center gap-3 mb-6 px-2">
             <div className="h-1.5 w-1.5 rounded-full bg-primary" />
             <h2 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">{t('recentHistory')}</h2>
          </div>
          <AttendanceHistory attendances={recentAttendances} />
        </div>
      </div>
    </div>
  )
}
