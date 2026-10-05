import { Plus, Trash2, Award } from "lucide-react"

export default function LeadershipEditor({ leadership, onUpdate }) {
  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      organization: "[ADD ORGANIZATION / CLUB NAME]",
      position: "[ADD POSITION]",
      duration: "2024 - Present",
      description: "[ADD DESCRIPTION]",
      achievements: ["[ADD INITIATIVE 1]"]
    }
    onUpdate([...leadership, newEntry])
  }

  const removeEntry = (id) => {
    onUpdate(leadership.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Leadership & Community</h2>
          <p className="text-xs text-text-muted mt-1">Manage technical leadership, community initiatives, and club activities.</p>
        </div>
        <button onClick={addEntry} className="btn-primary text-xs flex items-center gap-1.5">
          <Plus size={14} /> Add Role
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {leadership.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent-indigo">{item.duration}</span>
              <button onClick={() => removeEntry(item.id)} className="text-text-muted hover:text-rose-400 p-1">
                <Trash2 size={13} />
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Role / Position</label>
              <input
                type="text"
                value={item.position}
                onChange={e => {
                  const copy = [...leadership]
                  copy[idx].position = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Organization</label>
              <input
                type="text"
                value={item.organization}
                onChange={e => {
                  const copy = [...leadership]
                  copy[idx].organization = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Description</label>
              <textarea
                rows={2}
                value={item.description}
                onChange={e => {
                  const copy = [...leadership]
                  copy[idx].description = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}