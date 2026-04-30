"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, XCircle, Loader2, Calendar } from "lucide-react"
import { format } from "date-fns"
import { id, enUS, zhCN, ja } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const locales = {
    id: id,
    en: enUS,
    zh: zhCN,
    jp: ja
  }

  const currentLocale = locales[language] || locales.en

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && (session?.user as any)?.role !== "ADMIN")) {
      router.push("/dashboard")
    }
  }, [status, session])

  useEffect(() => {
    async function fetchData() {
       // Implementation for data fetching will be in next steps
    }
    setIsLoading(false)
  }, [])

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">{t('adminDashboard')}</h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.1em] text-[10px]">{t('adminSummary')}</p>
        </div>
        <div className="text-right p-4 bg-secondary/30 rounded-3xl border-2">
          <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-1">{t('realTimeStatus')}</p>
          <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
             <Calendar className="h-4 w-4" />
             {format(new Date(), "EEEE, d MMMM", { locale: currentLocale })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('totalMembers')}</CardTitle>
            <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">--</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">{t('activeInSystem')}</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('presentToday')}</CardTitle>
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200">
              <CheckCircle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">--</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">{t('alreadyClockedIn')}</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('notPresent')}</CardTitle>
            <div className="p-3 bg-rose-100 rounded-2xl text-rose-600 border border-rose-200">
              <XCircle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">--</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">{t('noDataYet')}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-secondary/20 border-b p-10 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">{t('attendanceLog')}</CardTitle>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t('todayData')}</p>
          </div>
          <Button variant="outline" className="rounded-2xl border-2 font-bold text-xs h-12 px-6">
            {t('exportCsv')}
          </Button>
        </CardHeader>
        <CardContent className="p-8">
            <div className="text-center py-20 text-muted-foreground font-bold italic">
               {t('loadingMembers')}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
