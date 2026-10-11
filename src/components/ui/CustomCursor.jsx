import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
  const [label, setLabel] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Cursor position
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Outer ring spring physics (stiffness: 200, damping: 24)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 24 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 24 })

  useEffect(() => {
    if (typeof window === "undefined") return
    if (navigator.maxTouchPoints > 0) return

    const handleMouseMove = (e) => {
      setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const cursorEl = el?.closest("[data-cursor]")
      const interactiveEl = el?.closest("a, button, [role=button], input, textarea, select")

      if (cursorEl) {
        setLabel(cursorEl.getAttribute("data-cursor") || "")
        setIsHovering(true)
      } else if (interactiveEl) {
        setLabel("")
        setIsHovering(true)
      } else {
        setLabel("")
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY])

  if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) return null
  if (!isVisible) return null

  return (
    <>
      {/* Instant Center Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-indigo pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />

      {/* Spring Follower Outer Ring / Morphing Pill Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] flex items-center justify-center font-mono font-bold tracking-widest text-[9px] uppercase backdrop-blur-sm"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: label ? 74 : isHovering ? 46 : 30,
          height: label ? 28 : isHovering ? 46 : 30,
          borderRadius: label ? "14px" : "50%",
          backgroundColor: label
            ? "rgba(255, 255, 255, 0.92)"
            : isHovering
            ? "rgba(8, 102, 232, 0.08)"
            : "rgba(24, 197, 232, 0.05)",
          borderColor: label
            ? "#0866E8"
            : isHovering
            ? "rgba(8, 102, 232, 0.6)"
            : "rgba(24, 197, 232, 0.4)",
          borderWidth: "1.5px"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-accent-indigo select-none"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
