import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { achievements, achievementCategories } from "../../data/achievements"
import SectionHeader from "../ui/SectionHeader"
import Lightbox from "../ui/Lightbox"
import { Trophy, Award, Star, BookOpen, Code2, Calendar, ExternalLink, Image as ImageIcon } from "lucide-react"

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState([])
  const [imageIndex, setImageIndex] = useState(0)

  const filteredAchievements = activeCategory === "All"
    ? achievements
    : achievements.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase())

  const openGallery = (item) => {
    if (item.images && item.images.length > 0) {
      setCurrentImages(item.images.map(img => ({ src: img, title: item.title, description: item.description })))
    } else {
      setCurrentImages([{ src: "", title: item.title, description: "Official documentation or photo evidence coming soon." }])
    }
    setImageIndex(0)
    setLightboxOpen(true)
  }

  return (
    <section id="achievements" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Milestones & Validation"
          title={"Achievements &\nEvidence Gallery"}
          subtitle="Documented participation, hackathon selections, and competitive programming highlights."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
          {achievementCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent-indigo text-white shadow-lg shadow-accent-indigo/25"
                  : "glass text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredAchievements.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="card-base p-6 flex flex-col justify-between group hover:border-accent-indigo/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge">{item.category}</span>
                    <span className="font-mono text-xs text-text-muted flex items-center gap-1">
                      <Calendar size={12} /> {item.date}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-text-primary mb-1 group-hover:text-accent-cyan transition-colors">
                    {item.title}
                  </h4>

                  <div className="text-xs font-mono text-accent-indigo mb-3">
                    {item.organization}
                  </div>

                  <p className="text-text-secondary text-xs leading-relaxed line-clamp-3 mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <button
                    onClick={() => openGallery(item)}
                    className="text-xs font-mono text-accent-indigo hover:text-accent-cyan transition-colors flex items-center gap-1.5"
                  >
                    <ImageIcon size={14} /> View Evidence
                  </button>

                  {item.verificationUrl && item.verificationUrl !== "" && (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1"
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={currentImages}
        currentIndex={imageIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setImageIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1))}
        onNext={() => setImageIndex((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0))}
      />
    </section>
  )
}
