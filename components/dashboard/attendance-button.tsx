"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { clockIn, clockOut } from "@/app/actions/attendance"
import { MapPin, Loader2, LogIn, LogOut, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AttendanceButtonProps {
  todayAttendance: any
}

export function AttendanceButton({ todayAttendance }: AttendanceButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClockIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      let location = undefined
      if ("geolocation" in navigator) {
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
          })
          location = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        } catch (e) {
          console.warn("Location permission denied or timed out")
        }
      }
      
      await clockIn(location)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClockOut = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await clockOut()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (todayAttendance?.clockIn && todayAttendance?.clockOut) {
    return (
      <div className="flex flex-col items-center space-y-4 py-8">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 shadow-inner">
          <CheckCircle2 className="h-14 w-14" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">Selesai!</h3>
          <p className="text-sm font-medium text-muted-foreground">
            Anda telah menyelesaikan absensi hari ini.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-sm mx-auto">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full"
      >
        <Button
          size="lg"
          className={cn(
            "h-56 w-full rounded-[3.5rem] text-2xl font-bold flex flex-col gap-5 shadow-2xl transition-all duration-500",
            !todayAttendance?.clockIn 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-emerald-500/30" 
              : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30"
          )}
          onClick={!todayAttendance?.clockIn ? handleClockIn : handleClockOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-14 w-14 animate-spin" />
          ) : !todayAttendance?.clockIn ? (
            <>
              <div className="bg-white/20 p-5 rounded-[2rem]">
                <LogIn className="h-12 w-12" />
              </div>
              <span className="tracking-tight">Clock In</span>
            </>
          ) : (
            <>
              <div className="bg-white/20 p-5 rounded-[2rem]">
                <LogOut className="h-12 w-12" />
              </div>
              <span className="tracking-tight">Clock Out</span>
            </>
          )}
        </Button>
      </motion.div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-destructive bg-destructive/10 px-4 py-2 rounded-xl border border-destructive/20"
        >
          {error}
        </motion.div>
      )}

      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <div className="flex items-center bg-secondary/50 px-3 py-1.5 rounded-full border">
          <MapPin className="mr-1.5 h-3.5 w-3.5 text-primary" />
          Lokasi Aktif
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider">Ready to record</span>
      </div>
    </div>
  )
}
