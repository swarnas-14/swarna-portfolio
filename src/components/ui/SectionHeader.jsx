import { motion } from "framer-motion"

export default function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  const isCenter = align === "center"
  return (
    <motion.div
      className={`mb-16 ${isCenter ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {eyebrow && (
        <span className="inline-block gradient-text font-mono text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          ✦ {eyebrow}
        </span>
      )}
      <h2
        className="font-display font-bold text-text-primary leading-tight mb-4"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {title.split("\n").map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h2>
      {subtitle && (
        <p className={`text-text-muted text-lg leading-relaxed max-w-2xl ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
