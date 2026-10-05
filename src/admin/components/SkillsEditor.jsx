import { Plus, Trash2, Tag } from "lucide-react"

export default function SkillsEditor({ techCategories, onUpdate }) {
  const addTech = (catIndex) => {
    const copy = [...techCategories]
    copy[catIndex].techs.push({
      name: "New Tech",
      description: "Technology description",
      color: copy[catIndex].color || "#6366f1"
    })
    onUpdate(copy)
  }

  const removeTech = (catIndex, techIndex) => {
    const copy = [...techCategories]
    copy[catIndex].techs.splice(techIndex, 1)
    onUpdate(copy)
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <h2 className="font-display font-bold text-xl text-white">Skills & Technology Arsenal</h2>
        <p className="text-xs text-text-muted mt-1">Manage categorized technical competencies without fake percentage ratings.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {techCategories.map((cat, catIdx) => (
          <div key={cat.id} className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e1e2e]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                <span className="font-display font-bold text-sm text-white">{cat.label}</span>
              </div>
              <button
                onClick={() => addTech(catIdx)}
                className="text-xs text-accent-indigo hover:text-accent-cyan flex items-center gap-1 font-mono"
              >
                <Plus size={13} /> Add Tool
              </button>
            </div>

            <div className="space-y-3">
              {cat.techs.map((tech, techIdx) => (
                <div key={techIdx} className="p-3 rounded-xl bg-[#12121c] border border-[#1e1e2e] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={tech.name}
                      onChange={e => {
                        const copy = [...techCategories]
                        copy[catIdx].techs[techIdx].name = e.target.value
                        onUpdate(copy)
                      }}
                      className="px-2 py-1 rounded bg-[#0d0d14] border border-[#1e1e2e] text-xs font-bold text-white focus:outline-none focus:border-accent-indigo w-1/2"
                    />
                    <button
                      onClick={() => removeTech(catIdx, techIdx)}
                      className="text-text-muted hover:text-rose-400 p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={tech.description}
                    onChange={e => {
                      const copy = [...techCategories]
                      copy[catIdx].techs[techIdx].description = e.target.value
                      onUpdate(copy)
                    }}
                    className="w-full px-2 py-1 rounded bg-[#0d0d14] border border-[#1e1e2e] text-[11px] text-text-secondary focus:outline-none"
                    placeholder="Short description..."
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}