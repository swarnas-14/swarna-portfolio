import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, CheckCircle2, Layers } from "lucide-react"
import { Github } from "./Icons"

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    if (isOpen) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-start justify-center overflow-y-auto py-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(250,250,250,0.97)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden my-auto"
            style={{ background: "#FFFFFF", border: "1px solid #D4D4D4" }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-44 flex items-end p-8" style={{ background: "linear-gradient(135deg, #F5F7FF, #FAFAFA)" }}>
              <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 50%, rgba(8,102,232,0.25), transparent 60%)" }} />
              <div className="relative z-10">
                <span className="badge mb-3 inline-block">{project.category}</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">{project.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-xs font-mono text-accent-indigo uppercase tracking-widest mb-2">Overview</h3>
                <p className="text-text-secondary leading-relaxed text-sm">{project.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-bg-card border border-border/60">
                  <h3 className="text-xs font-mono text-accent-cyan uppercase tracking-widest mb-2">Problem Addressed</h3>
                  <p className="text-text-secondary leading-relaxed text-xs">{project.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-bg-card border border-border/60">
                  <h3 className="text-xs font-mono text-accent-purple uppercase tracking-widest mb-2">Engineered Solution</h3>
                  <p className="text-text-secondary leading-relaxed text-xs">{project.solution}</p>
                </div>
              </div>

              {/* Architecture */}
              {project.architecture && (
                <div>
                  <h3 className="text-xs font-mono text-accent-indigo uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers size={14} /> System Architecture
                  </h3>
                  <div className="rounded-xl p-4 text-text-secondary text-xs leading-relaxed" style={{ background: "#F5F7FF", border: "1px solid #D4D4D4" }}>
                    {project.architecture}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-mono text-accent-indigo uppercase tracking-widest mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-bg-secondary text-text-primary border border-border">{t}</span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features?.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono text-accent-indigo uppercase tracking-widest mb-2">Major Functionalities</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary text-xs">
                        <CheckCircle2 size={14} className="text-accent-indigo mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t" style={{ borderColor: "#D4D4D4" }}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 text-xs">
                    <Github size={14} /> Source Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 text-xs">
                    <ExternalLink size={14} /> Live Application
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}