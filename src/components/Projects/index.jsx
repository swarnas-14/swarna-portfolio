import { useState } from "react"
import { motion } from "framer-motion"
import { projects } from "../../data/projects"
import SectionHeader from "../ui/SectionHeader"
import ProjectModal from "../ui/ProjectModal"
import { ExternalLink, ArrowRight, Layers, Terminal } from "lucide-react"
import { Github } from "../ui/Icons"
import { isRealValue } from "../../utils/hasContent"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const realProjects = projects.filter(p => isRealValue(p.title))

  // Hide section if no real projects
  if (realProjects.length === 0) return null

  const featured = realProjects.find(p => p.featured) || realProjects[0]
  const otherProjects = realProjects.filter(p => p.id !== featured?.id)

  const openProject = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Portfolio Highlights"
          title={"Things I've Built &\nEngineered"}
          subtitle="Real systems focused on scalability, data pipelines, and architectural clarity."
        />

        {/* Featured Project Case Study Card */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 card-base p-8 lg:p-12 relative overflow-hidden border-border/80 group hover:border-accent-indigo/60 transition-all duration-300"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="badge">Featured Case Study</span>
                  <span className="text-xs uppercase font-mono text-accent-cyan tracking-wider">
                    {featured.category}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-text-primary group-hover:text-accent-cyan transition-colors">
                  {featured.title}
                </h3>

                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {featured.description}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-text-muted">
                    Core Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featured.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-mono px-3 py-1 rounded-md bg-bg-secondary text-accent-purple border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => openProject(featured)}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    Explore Case Study <ArrowRight size={16} />
                  </button>
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm flex items-center gap-2"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* Visual Presentation Area */}
              <div className="lg:col-span-5">
                <div
                  onClick={() => openProject(featured)}
                  className="aspect-video lg:aspect-square w-full rounded-2xl bg-bg-secondary border border-border/60 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden cursor-pointer hover:border-accent-indigo/60 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-accent-indigo mb-4 glow-indigo">
                    <Layers size={32} />
                  </div>
                  <div className="font-display font-semibold text-text-primary text-lg mb-1">
                    {featured.title}
                  </div>
                  <p className="text-text-muted text-xs max-w-xs">
                    Click to view detailed architecture, engineering challenges, and solutions.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-accent-indigo">
                    <Terminal size={12} /> View Interactive Breakdown
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-base p-6 flex flex-col justify-between group hover:border-accent-indigo/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge">{project.category}</span>
                  <div className="flex items-center gap-2 text-text-muted">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary transition-colors"
                        title="GitHub Repo"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h4>

                <p className="text-text-secondary text-xs leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-bg-secondary text-text-muted border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => openProject(project)}
                  className="w-full py-2.5 px-4 rounded-lg glass text-xs font-semibold text-text-primary hover:border-accent-indigo/50 flex items-center justify-center gap-2 transition-colors"
                >
                  Inspect Architecture <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}