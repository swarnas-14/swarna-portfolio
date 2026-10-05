import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const cursor = el?.closest("[data-cursor]")
      setLabel(cursor?.getAttribute("data-cursor") || "")
      const interactive = el?.closest("a,button,[role=button]")
      setIsHovering(!!interactive || !!cursor)
    }

    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }
      raf.current = requestAnimationFrame(lerp)
    }
    raf.current = requestAnimationFrame(lerp)

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none will-change-transform"
        style={{ transition: "none" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgba(99,102,241,0.9)" : "rgba(99,102,241,0.5)"}`,
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
          backdropFilter: isHovering ? "blur(2px)" : "none",
        }}
      >
        {label && (
          <span style={{ fontSize: 9, fontWeight: 600, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {label}
          </span>
        )}
      </div>
    </>
  )
}
