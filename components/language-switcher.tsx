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
        className="rounded-full h-10 px-4 flex items-center gap-2 hover:bg-white/10 text-inherit transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="h-4 w-4" />
        <span className="text-[10px] font-black uppercase tracking-widest">{language}</span>
        <ChevronDown className={`h-3 w-3 opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-56 bg-zinc-900 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 z-[100] backdrop-blur-xl"
          >
            <div className="p-3 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-2">Select Language</div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-left transition-all group ${
                  language === lang.code 
                    ? 'bg-white text-black font-black' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{lang.label}</span>
                </div>
                {language === lang.code && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
