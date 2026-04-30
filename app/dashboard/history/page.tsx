import { auth } from "@/auth"
import { getAllAttendance } from "@/app/actions/attendance"
import { AttendanceHistory } from "@/components/dashboard/history"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Calendar } from "lucide-react"

export default async function HistoryPage() {
  const session = await auth()
  const attendances = await getAllAttendance()

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Riwayat Absensi</h1>
          <p className="text-muted-foreground font-medium">Lihat seluruh catatan kehadiran Anda selama ini.</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 flex items-center gap-3">
          <History className="h-6 w-6" />
          <div className="h-6 w-px bg-primary/20" />
          <span className="text-sm font-bold uppercase tracking-widest">History Log</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg ring-1 ring-black/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Total Kehadiran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{attendances.length}</div>
            <div className="mt-2 flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-md w-fit">
              <Calendar className="mr-1 h-3 w-3" />
              RECORDED
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-2">
        <AttendanceHistory attendances={attendances} />
      </div>
    </div>
  )
}
