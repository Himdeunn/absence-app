"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw, Check, X, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { useLanguage } from "@/components/language-provider"

interface CameraCaptureProps {
  onCapture: (image: string) => void
  onCancel: () => void
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [image, setImage] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const { t } = useLanguage()

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
  }, [])

  const startCamera = useCallback(async () => {
    setIsInitializing(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsInitializing(false)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Gagal mengakses kamera. Pastikan izin kamera telah diberikan.")
      onCancel()
    }
  }, [onCancel])

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.4)
        setImage(dataUrl)
        stopCamera()
      }
    }
  }

  const retake = () => {
    setImage(null)
    startCamera()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-card w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-bold text-lg">{t('takeSelfie')}</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{t('status')}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative aspect-square bg-zinc-900 overflow-hidden m-4 rounded-[2rem] border-4 border-secondary shadow-inner">
          {isInitializing && !image && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest opacity-50">Mengaktifkan Kamera</p>
            </div>
          )}
          
          {!image ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover scale-x-[-1]"
            />
          ) : (
            <img src={image} className="w-full h-full object-cover scale-x-[-1]" alt="Captured" />
          )}
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
            {!image ? (
              <Button 
                size="lg" 
                className="rounded-full h-16 w-16 bg-white text-black hover:bg-zinc-200 border-4 border-black/10 shadow-xl"
                onClick={captureImage}
                disabled={isInitializing}
              >
                <Camera className="h-8 w-8" />
              </Button>
            ) : (
              <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="rounded-2xl font-bold uppercase tracking-widest text-[10px]"
                  onClick={retake}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t('retake')}
                </Button>
                <Button 
                  size="lg" 
                  className="rounded-2xl bg-primary px-8 font-bold uppercase tracking-widest text-[10px]"
                  onClick={() => onCapture(image)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  {t('usePhoto')}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-8 py-6 text-center bg-secondary/30">
          <p className="text-xs text-muted-foreground font-bold leading-relaxed uppercase tracking-wider">
            Pastikan wajah terlihat jelas di area kotak
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
