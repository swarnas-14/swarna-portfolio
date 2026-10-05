import { useState } from "react"
import { Plus, Trash2, Star, Layers, ExternalLink } from "lucide-react"
import { Github } from "../../components/ui/Icons"

export default function ProjectsEditor({ projects, onUpdate }) {
  const [selectedId, setSelectedId] = useState(projects[0]?.id || 1)
  const activeProj = projects.find(p => p.id === selectedId) || projects[0]

  const updateActive = (updater) => {
    const updated = projects.map(p => (p.id === activeProj?.id ? updater(p) : p))
    onUpdate(updated)
  }

  const addProject = () => {
    const newId = Date.now()
    const newProj = {
      id: newId,
      title: "New Project",
      description: "[ADD PROJECT DESCRIPTION]",
      problem: "[ADD PROBLEM STATEMENT]",
      solution: "[ADD SOLUTION DESCRIPTION]",
      architecture: "[ADD ARCHITECTURE]",
      techStack: ["Java", "Spring Boot", "MySQL"],
      features: ["[ADD FEATURE 1]", "[ADD FEATURE 2]"],
      githubUrl: "",
      liveUrl: "",
      image: "/images/projects/project-1.jpg",
      featured: false,
      category: "Backend"
    }
    onUpdate([...projects, newProj])
    setSelectedId(newId)
  }

  const deleteProj = (id) => {
    if (projects.length <= 1) {
      alert("Maintain at least one project.")
      return
    }
    const filtered = projects.filter(p => p.id !== id)
    onUpdate(filtered)
    setSelectedId(filtered[0]?.id || 1)
  }

  if (!activeProj) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Projects & Case Studies</h2>
          <p className="text-xs text-text-muted mt-1">Configure featured architectures, problem statements, and code repositories.</p>
        </div>
        <button onClick={addProject} className="btn-primary text-xs flex items-center gap-1.5">
          <Plus size={14} /> Add Project
        </button>
      </div>

      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#1e1e2e]">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              selectedId === p.id
                ? "bg-accent-indigo text-white"
                : "bg-[#12121c] text-text-secondary border border-[#1e1e2e]"
            }`}
          >
            {p.featured && <Star size={12} className="fill-amber-300 text-amber-300" />}
            <span>{p.title}</span>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1e2e]">
          <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider font-semibold">
            Project Details
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const updated = projects.map(p => ({ ...p, featured: p.id === activeProj.id }))
                onUpdate(updated)
              }}
              className={`text-xs font-mono px-3 py-1 rounded-lg flex items-center gap-1.5 ${
                activeProj.featured
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : "bg-[#12121c] text-text-muted hover:text-amber-300"
              }`}
            >
              <Star size={12} className={activeProj.featured ? "fill-amber-300" : ""} />
              {activeProj.featured ? "Featured Case Study" : "Set as Featured"}
            </button>
            <button
              onClick={() => deleteProj(activeProj.id)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Title</label>
            <input
              type="text"
              value={activeProj.title}
              onChange={e => updateActive(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Category</label>
            <input
              type="text"
              value={activeProj.category}
              onChange={e => updateActive(p => ({ ...p, category: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Overview</label>
          <textarea
            rows={2}
            value={activeProj.description}
            onChange={e => updateActive(p => ({ ...p, description: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Problem Addressed</label>
            <textarea
              rows={2}
              value={activeProj.problem}
              onChange={e => updateActive(p => ({ ...p, problem: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Engineered Solution</label>
            <textarea
              rows={2}
              value={activeProj.solution}
              onChange={e => updateActive(p => ({ ...p, solution: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">System Architecture Breakdown</label>
          <textarea
            rows={2}
            value={activeProj.architecture}
            onChange={e => updateActive(p => ({ ...p, architecture: e.target.value }))}
            className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">GitHub URL</label>
            <input
              type="text"
              value={activeProj.githubUrl}
              onChange={e => updateActive(p => ({ ...p, githubUrl: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Live Demo URL</label>
            <input
              type="text"
              value={activeProj.liveUrl}
              onChange={e => updateActive(p => ({ ...p, liveUrl: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}