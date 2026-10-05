import { useState } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown, Milestone, Code, Brain, Server, Layers, Cpu, Rocket, Award, Tag } from "lucide-react"

const AVAILABLE_ICONS = [
  { id: "Code", label: "Code", Icon: Code },
  { id: "Brain", label: "Brain / Logic", Icon: Brain },
  { id: "Server", label: "Server / Backend", Icon: Server },
  { id: "Layers", label: "Layers / Full-Stack", Icon: Layers },
  { id: "Cpu", label: "CPU / AI / ML", Icon: Cpu },
  { id: "Rocket", label: "Rocket / Launch", Icon: Rocket },
  { id: "Award", label: "Award / Milestone", Icon: Award },
]

export default function TimelineEditor({ timeline, onUpdate }) {
  const [selectedId, setSelectedId] = useState(timeline[0]?.id || 1)
  const [newTechInput, setNewTechInput] = useState("")

  const activeItem = timeline.find(item => item.id === selectedId) || timeline[0]

  const updateActive = (updater) => {
    const updated = timeline.map(item => (item.id === activeItem?.id ? updater(item) : item))
    onUpdate(updated)
  }

  const addTimelineItem = () => {
    const newId = Date.now()
    const newItem = {
      id: newId,
      phase: "New Phase",
      title: "Milestone Title",
      description: "Describe what you learned, architected, or accomplished during this milestone phase.",
      icon: "Code",
      technologies: ["Technology 1", "Technology 2"],
      year: new Date().getFullYear().toString()
    }
    onUpdate([...timeline, newItem])
    setSelectedId(newId)
  }

  const deleteTimelineItem = (id) => {
    if (timeline.length <= 1) {
      alert("Please maintain at least one milestone in the journey.")
      return
    }
    const filtered = timeline.filter(item => item.id !== id)
    onUpdate(filtered)
    setSelectedId(filtered[0]?.id || 1)
  }

  const moveItem = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= timeline.length) return
    const copy = [...timeline]
    const [moved] = copy.splice(index, 1)
    copy.splice(newIndex, 0, moved)
    onUpdate(copy)
  }

  const addTechnology = () => {
    if (!newTechInput.trim()) return
    const current = activeItem.technologies || []
    if (!current.includes(newTechInput.trim())) {
      updateActive(item => ({
        ...item,
        technologies: [...current, newTechInput.trim()]
      }))
    }
    setNewTechInput("")
  }

  const removeTechnology = (techToRemove) => {
    updateActive(item => ({
      ...item,
      technologies: (item.technologies || []).filter(t => t !== techToRemove)
    }))
  }

  const activeIndex = timeline.findIndex(item => item.id === activeItem?.id)

  if (!activeItem) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2.5">
            <Milestone className="text-accent-indigo" size={24} /> Journey & Timeline
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Curate chronological engineering milestones, learning phases, and technical evolution.
          </p>
        </div>
        <button onClick={addTimelineItem} className="btn-primary text-xs flex items-center gap-1.5">
          <Plus size={14} /> Add Milestone
        </button>
      </div>

      {/* Milestone Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#1e1e2e]">
        {timeline.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedId === item.id
                ? "bg-accent-indigo text-white shadow-lg shadow-accent-indigo/20"
                : "bg-[#12121c] text-text-secondary border border-[#1e1e2e] hover:border-[#2e2e42]"
            }`}
          >
            <span className="font-mono text-[10px] opacity-70">#{idx + 1}</span>
            <span>{item.title || "Untitled"}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-text-muted">
              {item.year}
            </span>
          </button>
        ))}
      </div>

      {/* Editor Panel */}
      <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider font-semibold">
              Milestone #{activeIndex + 1}
            </span>
            <span className="text-xs text-text-muted">· {activeItem.phase}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => moveItem(activeIndex, -1)}
              disabled={activeIndex === 0}
              className="p-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="Move earlier in journey"
            >
              <ArrowUp size={14} />
            </button>
            <button
              onClick={() => moveItem(activeIndex, 1)}
              disabled={activeIndex === timeline.length - 1}
              className="p-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="Move later in journey"
            >
              <ArrowDown size={14} />
            </button>
            <button
              onClick={() => deleteTimelineItem(activeItem.id)}
              className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-rose-300 ml-2"
              title="Delete milestone"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {/* Phase Badge */}
          <div>
            <label className="block text-xs font-mono uppercase text-text-muted mb-2">Phase Label</label>
            <input
              type="text"
              value={activeItem.phase || ""}
              onChange={e => updateActive(item => ({ ...item, phase: e.target.value }))}
              placeholder="e.g. Foundation, Backend, AI/ML"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-sm text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase text-text-muted mb-2">Milestone Title</label>
            <input
              type="text"
              value={activeItem.title || ""}
              onChange={e => updateActive(item => ({ ...item, title: e.target.value }))}
              placeholder="e.g. Server-Side Engineering"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-sm text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-mono uppercase text-text-muted mb-2">Year / Timeline</label>
            <input
              type="text"
              value={activeItem.year || ""}
              onChange={e => updateActive(item => ({ ...item, year: e.target.value }))}
              placeholder="e.g. 2024, 2024-2025"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-sm text-white focus:outline-none focus:border-accent-indigo"
            />
          </div>
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-2">Visual Icon Node</label>
          <div className="flex flex-wrap gap-2.5">
            {AVAILABLE_ICONS.map(({ id, label, Icon }) => {
              const isSelected = (activeItem.icon || "Code") === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => updateActive(item => ({ ...item, icon: id }))}
                  className={`px-3 py-2 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    isSelected
                      ? "bg-accent-indigo/20 border-accent-indigo text-accent-cyan"
                      : "bg-[#12121c] border-[#1e1e2e] text-text-muted hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-2">Narrative & Context</label>
          <textarea
            rows={4}
            value={activeItem.description || ""}
            onChange={e => updateActive(item => ({ ...item, description: e.target.value }))}
            placeholder="Share details of challenges tackled, foundational skills developed, or projects built during this phase..."
            className="w-full px-4 py-3 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-sm text-white focus:outline-none focus:border-accent-indigo resize-none"
          />
        </div>

        {/* Technologies Tags */}
        <div>
          <label className="block text-xs font-mono uppercase text-text-muted mb-2">
            Associated Technologies & Key Learnings
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {(activeItem.technologies || []).map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-text-secondary flex items-center gap-1.5"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="text-text-muted hover:text-rose-400 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTechInput}
              onChange={e => setNewTechInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTechnology(); } }}
              placeholder="Type technology (e.g. Spring Boot, Docker, Redis) and press Add"
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-sm text-white focus:outline-none focus:border-accent-indigo"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="btn-secondary text-xs px-4"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
