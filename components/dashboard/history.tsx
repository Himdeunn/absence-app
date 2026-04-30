import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react"

interface HistoryProps {
  attendances: any[]
}

export function AttendanceHistory({ attendances }: HistoryProps) {
  return (
    <Card className="border-none shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-secondary/10">
        <CardTitle className="text-lg font-bold">Riwayat Kehadiran</CardTitle>
        <div className="p-2 bg-secondary rounded-lg">
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {attendances.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-4">
                <Clock className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Belum ada data absensi 7 hari terakhir
              </p>
            </div>
          ) : (
            attendances.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-transparent hover:border-primary/20 hover:bg-secondary/50 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground capitalize">
                    {format(new Date(item.date), "EEEE", { locale: id })}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {format(new Date(item.date), "d MMM yyyy", { locale: id })}
                  </span>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                      <ArrowDownLeft className="mr-0.5 h-3 w-3" />
                      MASUK
                    </div>
                    <span className="text-sm font-bold tabular-nums">
                      {format(new Date(item.clockIn), "HH:mm")}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-[10px] font-bold text-amber-600 dark:text-amber-400 mb-0.5">
                      <ArrowUpRight className="mr-0.5 h-3 w-3" />
                      KELUAR
                    </div>
                    <span className="text-sm font-bold tabular-nums">
                      {item.clockOut ? format(new Date(item.clockOut), "HH:mm") : "--:--"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
