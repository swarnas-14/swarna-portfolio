import { useState } from "react"
import { motion } from "framer-motion"
import { certifications } from "../../data/certifications"
import SectionHeader from "../ui/SectionHeader"
import Lightbox from "../ui/Lightbox"
import { Award, ExternalLink, Eye, ShieldCheck } from "lucide-react"
import { isRealValue } from "../../utils/hasContent"

export default function Certifications() {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedCertIndex, setSelectedCertIndex] = useState(0)

  // Only show certifications that have real (non-placeholder) titles
  const realCertifications = certifications.filter(c => isRealValue(c.title))

  // Hide entire section if no real certifications exist
  if (realCertifications.length === 0) return null

  const openCert = (index) => {
    setSelectedCertIndex(index)
    setViewerOpen(true)
  }

  const lightboxImages = realCertifications.map(c => ({
    src: c.image,
    title: c.title,
    description: `${c.organization} • ${c.date} ${c.credentialId ? `(ID: ${c.credentialId})` : ""}`
  }))

  return (
    <section id="certifications" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Verified Credentials"
          title={"Technical Certifications &\nAccreditations"}
          subtitle="Specialized certifications verifying proficiency in core engineering domains."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {realCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-base p-6 flex flex-col justify-between group hover:border-accent-indigo/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center text-accent-indigo">
                    <Award size={20} />
                  </div>
                  <span className="font-mono text-xs text-text-muted">{cert.date}</span>
                </div>

                <h4 className="font-display font-bold text-lg text-text-primary mb-1 group-hover:text-accent-indigo transition-colors">
                  {cert.title}
                </h4>

                <div className="text-xs font-medium text-accent-indigo mb-3">
                  {cert.organization}
                </div>

                <p className="text-text-secondary text-xs leading-relaxed line-clamp-3 mb-4">
                  {cert.description}
                </p>
              </div>

              <div>
                {cert.credentialId && cert.credentialId !== "" && (
                  <div className="text-[11px] font-mono text-text-muted mb-4 truncate">
                    ID: {cert.credentialId}
                  </div>
                )}

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <button
                    onClick={() => openCert(index)}
                    className="text-xs font-mono text-text-primary hover:text-accent-indigo transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <Eye size={14} /> Inspect Certificate
                  </button>

                  {cert.verificationUrl && cert.verificationUrl !== "" && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-indigo hover:text-accent-purple font-medium flex items-center gap-1"
                    >
                      <ShieldCheck size={14} /> Verify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={viewerOpen}
        images={lightboxImages}
        currentIndex={selectedCertIndex}
        onClose={() => setViewerOpen(false)}
        onPrev={() => setSelectedCertIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setSelectedCertIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />
    </section>
  )
}
