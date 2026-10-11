import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(8, 102, 232, 0.12)",
  tiltIntensity = 0.035,
  ...props
}) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState("")
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Gyroscopic 3D tilt calculation
    const rotateX = -(y - centerY) * tiltIntensity
    const rotateY = (x - centerX) * tiltIntensity

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowPos({
      x: ((x / rect.width) * 100).toFixed(1),
      y: ((y / rect.height) * 100).toFixed(1)
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d"
      }}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Dynamic Radial Spotlight Glow tracking mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
