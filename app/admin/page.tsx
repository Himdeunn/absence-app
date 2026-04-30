"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, XCircle, Loader2, Calendar, FileDown, Eye } from "lucide-react"
import { format } from "date-fns"
import { id, enUS, zhCN, ja } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getAdminStats, getAllAttendanceForExport } from "@/app/actions/admin"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [exportData, setExportData] = useState<any[]>([])
  const [isExporting, setIsExporting] = useState(false)

  const locales = { id, en: enUS, zh: zhCN, jp: ja }
  const currentLocale = (locales as any)[language] || locales.en

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && (session?.user as any)?.role !== "ADMIN")) {
      router.push("/dashboard")
    }
  }, [status, session])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAdminStats()
        setStats(data)
      } catch (error) {
        toast.error(t('errorUpdate'))
      } finally {
        setIsLoading(false)
      }
    }
    if (status === "authenticated") fetchData()
  }, [status])

  const handlePreviewExport = async () => {
    setIsExporting(true)
    try {
      const data = await getAllAttendanceForExport()
      setExportData(data)
      setIsPreviewOpen(true)
      toast.success("Preview data berhasil dimuat")
    } catch (error) {
      toast.error("Gagal memuat data export")
    } finally {
      setIsExporting(false)
    }
  }

  const downloadCSV = () => {
    try {
      const headers = ["ID", "Name", "Email", "Date", "Clock In", "Clock Out", "Location"]
      const rows = exportData.map(item => [
        item.id,
        item.userName,
        item.userEmail,
        format(new Date(item.date), "yyyy-MM-dd"),
        item.clockIn ? format(new Date(item.clockIn), "HH:mm:ss") : "--:--",
        item.clockOut ? format(new Date(item.clockOut), "HH:mm:ss") : "--:--",
        item.location
      ])

      const csvContent = [
        headers.join(","),
        ...rows.map(e => e.join(","))
      ].join("\n")

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `InkWell_Attendance_${format(new Date(), "yyyy-MM-dd")}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setIsPreviewOpen(false)
      toast.success("Data berhasil diunduh")
    } catch (error) {
      toast.error("Gagal mengunduh CSV")
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">{t('adminDashboard')}</h1>
          <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px]">{t('adminSummary')}</p>
        </div>
        <div className="text-right p-5 bg-card border-2 shadow-2xl rounded-[2.5rem] backdrop-blur-sm">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{t('realTimeStatus')}</p>
          <div className="flex items-center gap-3 text-muted-foreground font-black text-sm">
             <Calendar className="h-5 w-5" />
             {format(new Date(), "EEEE, d MMMM yyyy", { locale: currentLocale })}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('totalMembers')}</CardTitle>
            <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
              <Users className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">{stats?.totalUsers || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-3 font-black uppercase tracking-widest">{t('activeInSystem')}</p>
          </CardContent>
        </Card>
        
        <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('presentToday')}</CardTitle>
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200">
              <CheckCircle className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">{stats?.presentToday || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-3 font-black uppercase tracking-widest">{t('alreadyClockedIn')}</p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-2xl rounded-[3rem] overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t('notPresent')}</CardTitle>
            <div className="p-3 bg-rose-100 rounded-2xl text-rose-600 border border-rose-200">
              <XCircle className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-black tracking-tighter">{stats?.notPresent || 0}</div>
            <p className="text-[10px] text-muted-foreground mt-3 font-black uppercase tracking-widest">{t('noDataYet')}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-2xl rounded-[3.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-secondary/20 border-b p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <CardTitle className="text-3xl font-black tracking-tight uppercase">{t('attendanceLog')}</CardTitle>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t('todayData')}</p>
          </div>
          <Button 
            onClick={handlePreviewExport}
            disabled={isExporting}
            className="rounded-2xl border-2 font-black text-xs h-14 px-8 flex items-center gap-3 shadow-xl shadow-primary/20"
          >
            {isExporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileDown className="h-5 w-5" />}
            {t('exportCsv')}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y-2">
            {stats?.todayAttendances.length === 0 ? (
              <div className="p-20 text-center text-muted-foreground font-black uppercase tracking-widest text-xs italic">
                {t('noData')}
              </div>
            ) : (
              stats?.todayAttendances.map((att: any) => (
                <div key={att.id} className="flex items-center justify-between p-8 hover:bg-secondary/20 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-secondary flex items-center justify-center font-black text-xl border-2 shadow-inner group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {att.user.name?.[0] || att.user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-black text-lg tracking-tight">{att.user.name || "Anonymous"}</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{att.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Clock In</p>
                      <p className="text-xl font-black tabular-nums">{format(new Date(att.clockIn), "HH:mm")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Clock Out</p>
                      <p className="text-xl font-black tabular-nums">{att.clockOut ? format(new Date(att.clockOut), "HH:mm") : "--:--"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* CSV Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-5xl rounded-[3rem] p-10">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
              <Eye className="h-8 w-8 text-primary" />
              Preview Data Export
            </DialogTitle>
            <DialogDescription className="text-xs font-bold uppercase tracking-widest">
              Tinjau data kehadiran sebelum mengunduh file CSV.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[50vh] overflow-auto rounded-3xl border-2 border-secondary bg-secondary/10">
            <Table>
              <TableHeader className="bg-secondary/30 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Name</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Date</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Clock In</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Clock Out</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px]">Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exportData.map((row, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-bold text-sm">
                      <p className="font-black">{row.userName}</p>
                      <p className="text-[9px] text-muted-foreground uppercase">{row.userEmail}</p>
                    </TableCell>
                    <TableCell className="text-sm font-black tabular-nums">{format(new Date(row.date), "dd/MM/yy")}</TableCell>
                    <TableCell className="text-sm font-black text-emerald-600 tabular-nums">{row.clockIn ? format(new Date(row.clockIn), "HH:mm") : "--:--"}</TableCell>
                    <TableCell className="text-sm font-black text-amber-600 tabular-nums">{row.clockOut ? format(new Date(row.clockOut), "HH:mm") : "--:--"}</TableCell>
                    <TableCell className="text-[9px] font-bold text-muted-foreground">{row.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter className="mt-10">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)} className="rounded-2xl h-14 px-8 font-black uppercase text-xs">
              Batal
            </Button>
            <Button onClick={downloadCSV} className="rounded-2xl h-14 px-10 font-black uppercase text-xs gap-3 shadow-xl shadow-primary/30">
              <FileDown className="h-5 w-5" />
              Unduh CSV Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
