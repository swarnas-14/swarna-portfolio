import { useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, FileText } from "lucide-react"
import { profile } from "../../data/profile"
import { projects } from "../../data/projects"
import { hackathons } from "../../data/hackathons"
import { dsaStats } from "../../data/dsa"
import { isRealValue } from "../../utils/hasContent"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }
  })
}

export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })

  const nameParts = (profile.name || "Swarna Sahu").split(" ")
  const firstName = (nameParts[0] || "SWARNA").toUpperCase()
  const lastName = (nameParts.slice(1).join(" ") || "SAHU").toUpperCase()

  useEffect(() => {
    const link = document.createElement("link")
    link.rel  = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap"
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FFFFFF 0%,#FAFAFA 50%,#F5F7FF 100%)" }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle,#0866E8,transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle,#18C5E8,transparent)" }} />
        <div className="absolute top-3/4 left-1/4 w-48 h-48 rounded-full opacity-08 blur-3xl"
          style={{ background: "radial-gradient(circle,#7434C5,transparent)" }} />
      </div>

      {/* ── Subtle grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,102,232,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(8,102,232,.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

      {/* ── Content wrapper ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 min-h-screen flex items-center">

        {/* ══ Two-column grid ══ */}
        <div className="relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text content ── */}
          <div className="space-y-7 lg:pr-8">

            {/* Availability badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#059669" }}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {profile.availableForInternships
                  ? `Available for Opportunities · ${profile.city || "India"}`
                  : profile.city || "India"}
              </span>
            </motion.div>

            {/* Degree line */}
            <motion.p custom={0.15} variants={fadeUp} initial="hidden" animate="visible"
              className="text-accent-indigo font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase">
              {[profile.degree, profile.branch, profile.semester].filter(isRealValue).join(" · ")
                || "Computer Science & Engineering"}
            </motion.p>

            {/* Main Headline */}
            <motion.h1 custom={0.25} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-text-primary tracking-tight leading-[1.12]">
              Building elegant solutions to{" "}
              <span className="gradient-text">complex problems.</span>
            </motion.h1>

            {/* Introduction */}
            <motion.p custom={0.35} variants={fadeUp} initial="hidden" animate="visible"
              className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg">
              {profile.introduction ||
                "Computer Science undergraduate passionate about building clean, impactful software across the full stack."}
            </motion.p>

            {/* CTA buttons */}
            <motion.div custom={0.45} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-4">
              <button onClick={scrollToProjects} className="btn-primary" data-cursor="EXPLORE">
                Explore My Work <ArrowDown size={16} />
              </button>
              {isRealValue(profile.resumeUrl) ? (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary" data-cursor="RESUME">
                  <FileText size={16} /> View Resume
                </a>
              ) : (
                <a href="#contact" className="btn-secondary" data-cursor="CONTACT">
                  <FileText size={16} /> Get In Touch
                </a>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div custom={0.55} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-6 pt-2">
              {[
                { value: dsaStats?.solvedCount || "100+", label: "LeetCode" },
                { value: `${projects.length}+`,           label: "Projects"  },
                { value: `${hackathons.length}+`,         label: "Hackathons"}
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-8 bg-border" />}
                  <div>
                    <div className="font-display font-bold text-text-primary text-xl gradient-text">{stat.value}</div>
                    <div className="text-text-secondary text-xs uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Portrait with Oversized Name Behind ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">

              {/* ══ OVERSIZED NAME ══ */}
              <div
                className="relative select-none z-10 text-center whitespace-nowrap py-14 px-8"
                aria-hidden="true"
              >
                <div style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(4.5rem, 10vw, 10rem)",
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: "-0.02em",
                  color: "rgba(16,24,45,0.07)",
                  textShadow: "none"
                }}>
                  {firstName}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "clamp(4.5rem, 10vw, 10rem)",
                  fontWeight: 900,
                  lineHeight: 0.88,
                  letterSpacing: "0.15em",
                  background: "linear-gradient(90deg,#0866E8 0%,#7434C5 50%,#D96CE8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 35px rgba(8,102,232,.25))"
                }}>
                  {lastName}
                </div>
              </div>

              {/* "Hello, I'm" handwritten label */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -5 }}
                animate={{ opacity: 1, x: 0,  rotate: -8 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.7 }}
                className="absolute -top-8 left-2 z-20 pointer-events-none"
                style={{
                  fontFamily: "'Dancing Script',cursive",
                  fontSize: "clamp(1rem,2.5vw,1.4rem)",
                  color: "#0866E8",
                  textShadow: "0 0 20px rgba(8,102,232,.3)",
                  whiteSpace: "nowrap"
                }}
              >
                Hello, I'm
              </motion.div>

              {/* Decorative glow ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute -inset-4 rounded-2xl pointer-events-none"
                style={{
                  border: "1px solid rgba(8,102,232,.15)",
                  background: "linear-gradient(135deg,rgba(8,102,232,.04),rgba(116,52,197,.04))"
                }}
              />

              {/* Corner accent dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full z-20"
                style={{ background: "linear-gradient(135deg,#0866E8,#18C5E8)" }} />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full z-20"
                style={{ background: "linear-gradient(135deg,#7434C5,#D96CE8)" }} />

              {/* Floating: role badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute -right-5 top-1/3 z-20 hidden lg:block"
              >
                <div className="px-3 py-2 rounded-xl text-xs font-mono font-semibold"
                  style={{
                    background:"rgba(255,255,255,.95)",
                    border:"1px solid rgba(8,102,232,.3)",
                    color:"#0866E8",
                    backdropFilter:"blur(12px)",
                    boxShadow:"0 8px 24px rgba(8,102,232,.12)"
                  }}>
                  Full-Stack Dev 🚀
                </div>
              </motion.div>

              {/* Floating: location badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="absolute -left-5 bottom-1/4 z-20 hidden lg:block"
              >
                <div className="px-3 py-2 rounded-xl text-xs font-mono font-semibold"
                  style={{
                    background:"rgba(255,255,255,.95)",
                    border:"1px solid rgba(116,52,197,.3)",
                    color:"#7434C5",
                    backdropFilter:"blur(12px)",
                    boxShadow:"0 8px 24px rgba(116,52,197,.12)"
                  }}>
                  📍 {profile.city || "Bhopal, India"}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-text-muted text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(8,102,232,.4)" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "#0866E8" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Reduced-motion override */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration:.01ms!important; transition-duration:.01ms!important; }
        }
      `}</style>
    </section>
  )
}
