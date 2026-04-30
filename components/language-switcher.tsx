"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Language } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Languages, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { code: 'jp', label: 'Japanese', flag: '🇯🇵' },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="rounded-xl h-10 px-3 flex items-center gap-2 hover:bg-secondary transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="h-4 w-4" />
        <span className="text-[10px] font-black uppercase tracking-widest">{language}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-card rounded-2xl shadow-2xl border p-2 z-[100] ring-1 ring-black/5"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  language === lang.code ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-secondary'
                }`}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-bold text-[10px] uppercase tracking-[0.15em]">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
