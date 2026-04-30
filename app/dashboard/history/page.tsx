"use client"

import { useEffect, useState } from "react"
import { getAllAttendance } from "@/app/actions/attendance"
import { AttendanceHistory } from "@/components/dashboard/history"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Calendar, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function HistoryPage() {
  const { t } = useLanguage()
  const [attendances, setAttendances] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchData() {
      const data = await getAllAttendance()
      setAttendances(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">{t('history')}</h1>
          <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px]">Activity Log — {t('brand')}</p>
        </div>
        <div className="p-5 bg-primary/10 rounded-[2.5rem] text-primary border-2 border-primary/20 flex items-center gap-5 shadow-2xl shadow-primary/5">
          <History className="h-8 w-8" />
          <div className="h-10 w-0.5 bg-primary/20" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Log Monitor</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('totalAttendance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">{attendances.length}</div>
            <div className="mt-5 flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 w-fit">
              <Calendar className="mr-2 h-4 w-4" />
              {t('recorded')}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <AttendanceHistory attendances={attendances} />
      </div>
    </div>
  )
}
