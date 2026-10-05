import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { techCategories } from "../../data/techStack"
import SectionHeader from "../ui/SectionHeader"
import { Sparkles, Terminal } from "lucide-react"

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("all")
  const [hoveredTech, setHoveredTech] = useState(null)

  const allCategories = [{ id: "all", label: "All Technologies" }, ...techCategories]

  const filteredTechs = activeTab === "all"
    ? techCategories.flatMap(c => c.techs.map(t => ({ ...t, categoryLabel: c.label })))
    : (techCategories.find(c => c.id === activeTab)?.techs || []).map(t => ({
        ...t,
        categoryLabel: techCategories.find(c => c.id === activeTab)?.label
      }))

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Technical Repertoire"
          title={"Technologies &\nEngineering Toolkit"}
          subtitle="A comprehensive ecosystem of languages, frameworks, storage, and developer tooling."
        />

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === cat.id
                  ? "bg-accent-indigo text-white shadow-lg shadow-accent-indigo/25"
                  : "glass text-text-secondary hover:text-text-primary hover:border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredTechs.map((tech, index) => (
              <motion.div
                layout
                key={tech.name + index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className="card-base p-5 flex flex-col justify-between group hover:border-accent-indigo/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full ring-2 ring-offset-2 ring-offset-bg-card"
                        style={{ backgroundColor: tech.color || "#6366f1", ringColor: tech.color || "#6366f1" }}
                      />
                      <span className="font-display font-bold text-text-primary text-base">
                        {tech.name}
                      </span>
                    </div>
                    {tech.categoryLabel && (
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-secondary text-text-muted border border-border/50">
                        {tech.categoryLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-[11px] text-text-muted">
                  <span className="flex items-center gap-1 font-mono">
                    <Terminal size={12} className="text-accent-cyan" /> Core Stack
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 text-accent-indigo transition-opacity flex items-center gap-0.5 font-medium">
                    Verified <Sparkles size={10} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tech Ecosystem Interactive Visual Map */}
        <div className="mt-16 glass rounded-2xl p-8 border border-border relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display font-bold text-xl text-text-primary">
                Integrated Skill Architecture
              </h3>
              <p className="text-text-muted text-sm mt-1">
                Hover over nodes to explore ecosystem integration across domains.
              </p>
            </div>
            <span className="badge">No Fabricated Ratings · Practical Experience</span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {techCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 rounded-xl bg-bg-card border border-border/60 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="font-mono text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: category.color }}
                  >
                    {category.label}
                  </div>
                  <div className="space-y-1.5">
                    {category.techs.map((t) => (
                      <div
                        key={t.name}
                        className={`text-xs py-1 px-2 rounded transition-colors ${
                          hoveredTech === t.name
                            ? "bg-accent-indigo/20 text-text-primary font-medium"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {t.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
