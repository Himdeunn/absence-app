"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Artificial delay for cinematic effect, adjust as needed
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                opacity: 1,
                rotate: [0, 0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut",
                times: [0, 0.5, 0.7, 0.9, 1]
              }}
              className="relative h-32 w-32 md:h-40 md:w-40 rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <img 
                src="/logo.jpg" 
                alt="InkWell Logo" 
                className="h-full w-full object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Brand Text Animation */}
            <div className="mt-10 overflow-hidden">
               <motion.h1
                 initial={{ y: 100 }}
                 animate={{ y: 0 }}
                 transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                 className="text-4xl md:text-5xl font-black tracking-[-0.1em] uppercase flex items-center gap-1"
               >
                 {"INKWELL".split("").map((char, index) => (
                   <motion.span
                     key={index}
                     initial={{ opacity: 0, filter: "blur(10px)" }}
                     animate={{ opacity: 1, filter: "blur(0px)" }}
                     transition={{ delay: 0.8 + index * 0.1 }}
                   >
                     {char}
                   </motion.span>
                 ))}
               </motion.h1>
            </div>

            {/* Tagline Animation */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500"
            >
              Kinetic Minimalism
            </motion.p>

            {/* Loading Bar */}
            <div className="absolute -bottom-24 w-48 h-[2px] bg-white/5 overflow-hidden rounded-full">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
