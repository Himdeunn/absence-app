"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Clock } from "lucide-react"

export function RealTimeClock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) {
    return (
      <div className="text-center h-24 flex flex-col justify-center">
        <div className="h-8 w-48 bg-secondary animate-pulse rounded-xl mx-auto" />
      </div>
    )
  }

  return (
    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-4 text-primary">
        <Clock className="h-6 w-6 animate-pulse" />
        <span className="text-6xl font-black tabular-nums tracking-tighter">
          {format(time, "HH:mm:ss")}
        </span>
      </div>
      <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.4em]">
        {format(time, "EEEE, d MMMM yyyy", { locale: id })}
      </p>
    </div>
  )
}
