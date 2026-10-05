import { User, CheckCircle2 } from "lucide-react"

export default function ProfileEditor({ profile, onUpdate }) {
  const update = (key, val) => onUpdate({ ...profile, [key]: val })

  return (
    <div className="p-8 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Profile & Identity</h2>
          <p className="text-xs text-text-muted mt-0.5">Primary personal information, degree details, and headline statement.</p>
        </div>
        <span className="badge">Local Data Source</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Full Name</label>
          <input
            type="text"
            value={profile.name || ""}
            onChange={e => update("name", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Degree & Branch</label>
          <input
            type="text"
            value={`${profile.degree || "B.Tech"} - ${profile.branch || "Computer Science and Engineering"}`}
            onChange={e => {
              const parts = e.target.value.split("-")
              update("degree", parts[0]?.trim() || "B.Tech")
              update("branch", parts[1]?.trim() || "Computer Science and Engineering")
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Current Semester</label>
          <input
            type="text"
            value={profile.semester || "5th Semester"}
            onChange={e => update("semester", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Graduation Year</label>
          <input
            type="text"
            value={profile.graduationYear || "2026"}
            onChange={e => update("graduationYear", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Location / Country</label>
          <input
            type="text"
            value={profile.city || "India"}
            onChange={e => update("city", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Dynamic Professional Tagline</label>
        <input
          type="text"
          value={profile.tagline || ""}
          onChange={e => update("tagline", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
        />
      </div>

      <div>
        <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Short Introduction / Bio</label>
        <textarea
          rows={3}
          value={profile.introduction || ""}
          onChange={e => update("introduction", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
        />
      </div>
    </div>
  )
}