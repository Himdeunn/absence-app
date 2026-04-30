"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export function RealTimeClock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!time) return <div className="h-20" /> // Avoid hydration mismatch

  return (
    <div className="flex flex-col items-center justify-center space-y-1 py-4">
      <div className="text-6xl font-bold tracking-tighter text-foreground tabular-nums">
        {format(time, "HH:mm:ss")}
      </div>
      <div className="text-base font-medium text-muted-foreground capitalize">
        {format(time, "EEEE, d MMMM yyyy", { locale: id })}
      </div>
    </div>
  )
}
