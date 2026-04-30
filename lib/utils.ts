import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function formatTime(date: Date | string) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function getStatusColor(status: string) {
  switch (status) {
    case "PRESENT":
      return "bg-emerald-500"
    case "LATE":
      return "bg-amber-500"
    case "ABSENT":
      return "bg-rose-500"
    default:
      return "bg-zinc-500"
  }
}
