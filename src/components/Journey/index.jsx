import { motion } from "framer-motion"
import { timeline } from "../../data/timeline"
import SectionHeader from "../ui/SectionHeader"
import { Code, Brain, Server, Layers, Cpu, Rocket } from "lucide-react"
import { hasContent } from "../../utils/hasContent"

const iconMap = {
  Code: Code,
  Brain: Brain,
  Server: Server,
  Layers: Layers,
  Cpu: Cpu,
  Rocket: Rocket
}

export default function Journey() {
  if (!hasContent(timeline)) return null

  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="My Journey"
          title={"Evolution of a\nSoftware Engineer"}
          subtitle="From foundational logic to high-performance architectures and intelligent systems."
        />

        <div className="relative mt-16">
          {/* Central spine line */}
          <div className="timeline-line hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0
              const IconComponent = iconMap[item.icon] || Code

              return (
                <div key={item.id} className="relative flex flex-col md:flex-row items-center">
                  {/* Left Column (Content if Even, empty if Odd on desktop) */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:order-2 md:pl-12"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="card-base p-6 md:p-8 hover:border-accent-indigo/50 transition-all duration-300 relative group"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        <span className="badge">{item.phase}</span>
                        <span className="font-mono text-xs text-text-muted">{item.year}</span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-text-primary mb-3 group-hover:text-accent-cyan transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed mb-5">
                        {item.description}
                      </p>

                      <div className={`flex flex-wrap gap-1.5 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        {item.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded bg-bg-secondary text-text-muted border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full glass border border-accent-indigo text-accent-indigo glow-indigo z-10 bg-bg-primary">
                    <IconComponent size={20} />
                  </div>

                  {/* Empty Right Column for Even items to maintain layout */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:order-2 md:pl-12" : "md:pr-12"} hidden md:block`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
