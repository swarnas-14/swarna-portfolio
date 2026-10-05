import { useState } from "react"
import { Plus, Trash2, Trophy, ExternalLink } from "lucide-react"

export default function AchievementsEditor({ achievements, onUpdate }) {
  const addAchievement = () => {
    const newId = Date.now()
    const item = {
      id: newId,
      title: "New Achievement / Milestone",
      organization: "[ADD ISSUING ORGANIZATION]",
      category: "Hackathon",
      date: "2026",
      description: "[ADD DESCRIPTION OF THIS ACHIEVEMENT]",
      images: [],
      verificationUrl: ""
    }
    onUpdate([...achievements, item])
  }

  const removeAchievement = (id) => {
    onUpdate(achievements.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Achievements & Awards</h2>
          <p className="text-xs text-text-muted mt-1">Manage milestone evidence, competition achievements, and academic awards.</p>
        </div>
        <button onClick={addAchievement} className="btn-primary text-xs flex items-center gap-1.5">
          <Plus size={14} /> Add Achievement
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {achievements.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={item.category || "Hackathon"}
                onChange={e => {
                  const copy = [...achievements]
                  copy[idx].category = e.target.value
                  onUpdate(copy)
                }}
                className="px-2 py-0.5 rounded bg-[#12121c] border border-[#1e1e2e] text-[10px] font-mono uppercase text-accent-indigo focus:outline-none"
              />
              <button
                onClick={() => removeAchievement(item.id)}
                className="text-text-muted hover:text-rose-400 p-1"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={e => {
                  const copy = [...achievements]
                  copy[idx].title = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Organization</label>
                <input
                  type="text"
                  value={item.organization}
                  onChange={e => {
                    const copy = [...achievements]
                    copy[idx].organization = e.target.value
                    onUpdate(copy)
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Date</label>
                <input
                  type="text"
                  value={item.date}
                  onChange={e => {
                    const copy = [...achievements]
                    copy[idx].date = e.target.value
                    onUpdate(copy)
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Description</label>
              <textarea
                rows={2}
                value={item.description}
                onChange={e => {
                  const copy = [...achievements]
                  copy[idx].description = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Verification URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={item.verificationUrl || ""}
                onChange={e => {
                  const copy = [...achievements]
                  copy[idx].verificationUrl = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1 rounded bg-[#12121c] border border-[#1e1e2e] text-xs text-text-secondary focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}