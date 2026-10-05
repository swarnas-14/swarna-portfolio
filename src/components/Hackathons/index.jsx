import { useState } from "react"
import { motion } from "framer-motion"
import { hackathons } from "../../data/hackathons"
import SectionHeader from "../ui/SectionHeader"
import Lightbox from "../ui/Lightbox"
import { Trophy, CheckCircle2, Clock, GitBranch, Users, Calendar, MapPin, Images, Eye, ExternalLink } from "lucide-react"
import { isRealValue } from "../../utils/hasContent"

export default function Hackathons() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState([])
  const [photoIndex, setPhotoIndex] = useState(0)

  const realHackathons = hackathons.filter(h => isRealValue(h.name))

  // Hide section if no real hackathons
  if (realHackathons.length === 0) return null

  const sih = realHackathons.find(h => h.id === "hackathon-001" || h.id === 1) || realHackathons[0]
  const otherHackathons = realHackathons.filter(h => h.id !== sih?.id)

  const openGallery = (hackathon, startIndex = 0) => {
    const rawPhotos = hackathon.photos && hackathon.photos.length > 0
      ? hackathon.photos
      : (hackathon.images || []).map(img => (typeof img === "string" ? { url: img, caption: `${hackathon.name} photo` } : img))

    if (rawPhotos.length > 0) {
      setLightboxImages(rawPhotos.map(p => ({
        src: p.url || p,
        alt: p.caption || hackathon.name,
        title: hackathon.name,
        description: p.caption || `${hackathon.concept} • ${hackathon.date}`
      })))
    } else {
      setLightboxImages([{
        src: "",
        alt: hackathon.name,
        title: hackathon.name,
        description: "Official event and team photographs coming soon."
      }])
    }
    setPhotoIndex(startIndex)
    setLightboxOpen(true)
  }

  return (
    <section id="hackathons" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Competitive Engineering"
          title={"Hackathons &\nNational Innovations"}
          subtitle="Tackling complex problem statements under pressure with functional architectures."
        />

        {/* SIH 2026 Mega Showcase */}
        {sih && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="card-base p-8 lg:p-12 mb-16 relative overflow-hidden border-accent-indigo/40 glow-indigo"
          >
            {/* Header / Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="badge flex items-center gap-1.5">
                    <Trophy size={14} className="text-amber-400" /> {sih.name}
                  </span>
                  <span className="font-mono text-xs text-accent-cyan px-2.5 py-1 rounded bg-accent-cyan/10 border border-accent-cyan/20">
                    {sih.problemStatement}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl md:text-3xl text-text-primary">
                  {sih.concept}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} /> {sih.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} /> {sih.team}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="my-8">
              <p className="text-text-secondary leading-relaxed text-sm md:text-base max-w-4xl">
                {sih.description}
              </p>
            </div>

            {/* Implemented vs Planned Grid */}
            <div className="grid md:grid-cols-2 gap-8 my-8">
              {/* Implemented Features */}
              <div className="p-6 rounded-2xl bg-bg-secondary border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-display font-bold text-base">
                  <CheckCircle2 size={18} /> Implemented Capabilities
                </div>
                <ul className="space-y-2.5">
                  {sih.implementedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Planned / Future Scope */}
              <div className="p-6 rounded-2xl bg-bg-secondary border border-amber-500/20">
                <div className="flex items-center gap-2 mb-4 text-amber-400 font-display font-bold text-base">
                  <Clock size={18} /> Planned / Future Roadmap
                </div>
                <ul className="space-y-2.5">
                  {sih.plannedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Multi-Photo Evidence Gallery Strip */}
            {sih.photos && sih.photos.length > 0 && (
              <div className="my-8 pt-6 border-t border-border/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Images size={14} className="text-accent-cyan" /> Event Photographs & Evidence ({sih.photos.length} photos)
                  </span>
                  <button
                    onClick={() => openGallery(sih, 0)}
                    className="text-xs text-accent-indigo hover:text-accent-cyan transition-colors flex items-center gap-1 font-mono"
                  >
                    <Eye size={13} /> View Fullscreen Gallery
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {sih.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      onClick={() => openGallery(sih, pIdx)}
                      className="group/photo relative aspect-video rounded-xl bg-bg-secondary border border-border overflow-hidden cursor-pointer hover:border-accent-indigo/60 transition-all duration-200"
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-bg-card to-bg-secondary">
                        <Images size={20} className="text-accent-indigo mb-1 group-hover/photo:scale-110 transition-transform" />
                        <span className="text-[11px] font-medium text-text-primary line-clamp-1">{photo.caption || `Photo ${pIdx + 1}`}</span>
                        {photo.type && (
                          <span className="text-[9px] uppercase font-mono text-accent-cyan mt-0.5">{photo.type}</span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-accent-indigo/10 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye size={16} className="text-white drop-shadow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hackathon Progression Pipeline */}
            {sih.timeline && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="text-xs font-mono uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                  <GitBranch size={14} className="text-accent-indigo" /> Solution Lifecycle Pipeline
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {sih.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-bg-card border border-border/80 flex flex-col justify-between"
                    >
                      <div className="font-mono text-[10px] text-accent-indigo font-bold mb-1">
                        0{idx + 1}
                      </div>
                      <div className="font-display font-semibold text-xs text-text-primary mb-1">
                        {step.step}
                      </div>
                      <div className="text-[10px] text-text-muted leading-tight">
                        {step.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Other Hackathons */}
        {otherHackathons.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {otherHackathons.map((hackathon) => (
              <div key={hackathon.id} className="card-base p-6 border-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge">{hackathon.shortName || hackathon.name}</span>
                    <span className="text-xs font-mono text-text-muted">{hackathon.date}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-text-primary mb-2">
                    {hackathon.concept || hackathon.name}
                  </h4>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">
                    {hackathon.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hackathon.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-bg-secondary text-text-muted border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <button
                    onClick={() => openGallery(hackathon)}
                    className="text-xs font-mono text-accent-indigo hover:text-accent-cyan transition-colors flex items-center gap-1.5"
                  >
                    <Images size={13} /> View Win Photos
                  </button>
                  {hackathon.githubUrl && hackathon.githubUrl !== "[ADD GITHUB URL]" && (
                    <a
                      href={hackathon.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1"
                    >
                      Repo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={photoIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setPhotoIndex(prev => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setPhotoIndex(prev => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />
    </section>
  )
}