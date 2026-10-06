import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Cpu, ShieldCheck } from "lucide-react"

const BOOT_LOGS = [
  "INITIALIZING QUANTUM COMPUTATIONAL CORE...",
  "CALIBRATING 3D GYROSCOPIC WEBGL TOPOLOGY...",
  "LINKING NEURAL ARCHITECTURE & REST SERVICES...",
  "MOUNTING REPOSITORIES & HACKATHON RECORDS...",
  "ACTIVATING SPIDER-SENSE CHROMATIC SHADERS...",
  "PORTFOLIO SYSTEM ONLINE · WELCOME"
]

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Check if user already saw the bootloader in this session
    const hasLoaded = sessionStorage.getItem("vinay_portfolio_booted")
    if (hasLoaded) {
      setIsFinished(true)
      onComplete?.()
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            sessionStorage.setItem("vinay_portfolio_booted", "true")
            setIsFinished(true)
            onComplete?.()
          }, 400)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 12) + 6
        return next > 100 ? 100 : next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    )
    setLogIndex(idx)
  }, [progress])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="kernel-loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-[#050508] flex flex-col items-center justify-center p-6 select-none font-mono text-white"
        >
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e1e38_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Glowing central orb */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-accent-indigo/20 via-accent-cyan/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-md space-y-6 text-center">
            {/* Header Icon & Title */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f0f18] border border-accent-indigo/40 flex items-center justify-center text-accent-cyan shadow-lg shadow-accent-indigo/20">
                <Cpu size={22} className="animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold tracking-widest text-text-primary uppercase flex items-center gap-2">
                  VINAY SHARMA <span className="text-[10px] text-emerald-400 font-normal">v2.6</span>
                </div>
                <div className="text-[10px] text-text-muted tracking-wider">
                  KERNEL BOOT SEQUENCE
                </div>
              </div>
            </div>

            {/* Simulated Terminal Log Stream */}
            <div className="h-14 flex items-center justify-center px-4 py-2 rounded-xl bg-[#0d0d16]/80 border border-white/5 backdrop-blur-md">
              <div className="text-xs text-accent-cyan font-mono flex items-center gap-2 truncate">
                <span className="text-accent-indigo">&gt;</span>
                <span className="truncate">{BOOT_LOGS[logIndex]}</span>
                <span className="w-1.5 h-3.5 bg-accent-cyan inline-block animate-pulse" />
              </div>
            </div>

            {/* Progress Bar & Numerical Counter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-text-muted" /> INITIALIZING
                </span>
                <span className="font-bold text-white font-mono">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#12121e] rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-indigo via-accent-cyan to-accent-indigo rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>

            <div className="text-[10px] text-text-muted tracking-widest uppercase flex items-center justify-center gap-1.5">
              <ShieldCheck size={11} className="text-emerald-400" /> WebGL · Particle Core · Lenis Physics
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
