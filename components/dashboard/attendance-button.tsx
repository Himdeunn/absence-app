"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { clockIn, clockOut } from "@/app/actions/attendance"
import { MapPin, Loader2, LogOut, CheckCircle2, Camera } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { CameraCapture } from "./camera-capture"
import { useLanguage } from "@/components/language-provider"
import { toast } from "sonner"

interface AttendanceButtonProps {
  todayAttendance: any
}

export function AttendanceButton({ todayAttendance }: AttendanceButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClockIn = async (capturedImage: string) => {
    setShowCamera(false)
    setIsLoading(true)
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
          toast.warning("Lokasi tidak dapat diakses, tetap melanjutkan...")
        }
      }
      
      await clockIn(capturedImage, location)
      toast.success(t('clockIn') + " berhasil!")
    } catch (err: any) {
      toast.error(err.message || "Gagal absen masuk")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClockOut = async () => {
    setIsLoading(true)
    try {
      await clockOut()
      toast.success(t('clockOut') + " berhasil!")
    } catch (err: any) {
      toast.error(err.message || "Gagal absen keluar")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  if (todayAttendance?.clockIn && todayAttendance?.clockOut) {
    return (
      <div className="flex flex-col items-center space-y-6 py-10">
        <div className="flex h-32 w-32 items-center justify-center rounded-[3rem] bg-emerald-100 text-emerald-600 shadow-2xl border-4 border-white dark:border-emerald-950/30">
          <CheckCircle2 className="h-16 w-16" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-black tracking-tight uppercase">Selesai!</h3>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            {t('attendanceRecorded')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-8 w-full max-w-sm mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Button
            size="lg"
            className={cn(
              "h-64 w-full rounded-[4rem] text-3xl font-black flex flex-col gap-6 shadow-2xl transition-all duration-500 border-8 border-white dark:border-background/50",
              !todayAttendance?.clockIn 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30" 
                : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30"
            )}
            onClick={!todayAttendance?.clockIn ? () => setShowCamera(true) : handleClockOut}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-20 w-20 animate-spin" />
            ) : !todayAttendance?.clockIn ? (
              <>
                <div className="bg-white/20 p-6 rounded-[2.5rem] shadow-inner">
                  <Camera className="h-14 w-14" />
                </div>
                <span className="tracking-tighter uppercase">{t('clockIn')}</span>
              </>
            ) : (
              <>
                <div className="bg-white/20 p-6 rounded-[2.5rem] shadow-inner">
                  <LogOut className="h-14 w-14" />
                </div>
                <span className="tracking-tighter uppercase">{t('clockOut')}</span>
              </>
            )}
          </Button>
        </motion.div>

        <div className="flex items-center gap-4 text-xs font-black text-muted-foreground">
          <div className="flex items-center bg-card px-5 py-2.5 rounded-full border-2 shadow-sm">
            <MapPin className="mr-2 h-4 w-4 text-primary" />
            <span className="uppercase tracking-[0.2em] text-[10px]">{t('activeVerification')}</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em]">{t('readyToRecord')}</span>
        </div>
      </div>

      <AnimatePresence>
        {showCamera && mounted && (
          <CameraCapture 
            onCapture={handleClockIn} 
            onCancel={() => setShowCamera(false)} 
          />
        )}
      </AnimatePresence>
    </>
  )
}
