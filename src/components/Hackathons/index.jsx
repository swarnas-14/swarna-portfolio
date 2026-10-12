import { useState } from "react"
import { motion } from "framer-motion"
import { hackathons } from "../../data/hackathons"
import SectionHeader from "../ui/SectionHeader"
import Lightbox from "../ui/Lightbox"
import { Trophy, Calendar, MapPin, Users, Eye, Sparkles, ExternalLink } from "lucide-react"
import { Github } from "../ui/Icons"

export default function Hackathons() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const sih = hackathons[0]
  if (!sih) return null

  const photos = sih.photos || []

  const lightboxImages = photos.map((p) => ({
    src: p.url,
    title: sih.name,
    description: p.caption || sih.concept
  }))

  const openLightbox = (idx) => {
    setActivePhotoIndex(idx)
    setLightboxOpen(true)
  }

  return (
    <section id="hackathons" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="National Recognition"
          title={"Hackathons &\nNational Innovations"}
          subtitle="Tackling complex challenges under pressure with functional architectures and winning execution."
        />

        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-base p-6 sm:p-10 relative overflow-hidden border-border bg-white shadow-sm"
          >
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="badge flex items-center gap-1.5">
                    <Trophy size={13} className="text-amber-500" /> National Level
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1">
                    <Sparkles size={12} className="text-emerald-600" /> Winner · 1st Place (₹25,000)
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary">
                  {sih.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-accent-indigo mt-1">
                  {sih.organizer || "Bansal Group of Institutes · In collaboration with HCLTech & IEEE"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary shrink-0">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-accent-indigo" /> {sih.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent-indigo" /> {sih.location || "Bhopal, India"}
                </div>
                {sih.team && (
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-accent-indigo" /> Team {sih.team}
                  </div>
                )}
              </div>
            </div>

            {/* Concept / Description */}
            <div className="my-6 space-y-2">
              <div className="font-display font-bold text-lg text-text-primary">
                {sih.concept}
              </div>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-4xl whitespace-pre-line">
                {sih.description}
              </p>
            </div>

            {/* 2 National Hackathon Photographs Side-by-Side */}
            <div className="grid md:grid-cols-2 gap-6 my-6">
              {photos.map((photo, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => openLightbox(pIdx)}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-bg-secondary cursor-pointer hover:border-accent-indigo/60 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-secondary">
                    <img
                      src={photo.url}
                      alt={photo.caption || `${sih.name} photo`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <Eye size={16} />
                    </div>
                  </div>
                  <div className="p-4 bg-white border-t border-border">
                    <div className="text-xs font-semibold text-text-primary">
                      {photo.caption}
                    </div>
                    <div className="text-[11px] font-mono text-text-secondary mt-0.5">
                      National Level · Vision 2047 Viksit Bharat
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project / Award Links */}
            {(sih.githubUrl || sih.verificationUrl) && (
              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-4">
                {sih.githubUrl && (
                  <a
                    href={sih.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs flex items-center gap-2"
                  >
                    <Github size={14} /> Project Repository
                  </a>
                )}
                {sih.verificationUrl && (
                  <a
                    href={sih.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs flex items-center gap-2"
                  >
                    <ExternalLink size={14} /> View Certificate / Evidence
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Lightbox for Zoomable Image Inspection */}
      <Lightbox
        images={lightboxImages}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setActivePhotoIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />
    </section>
  )
}