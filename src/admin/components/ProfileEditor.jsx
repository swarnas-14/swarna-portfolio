import { User, CheckCircle2 } from "lucide-react"
import EditorActionBar from "./EditorActionBar"

export default function ProfileEditor({ profile, onUpdate, onSave, isSaving }) {
  const update = (key, val) => {
    const updated = { ...profile, [key]: val }
    if (key === "city") updated.location = val
    if (key === "location") updated.city = val
    if (key === "availableForInternships") updated.availability = val
    if (key === "availability") updated.availableForInternships = val
    onUpdate(updated)
  }

  const handleNameChange = (nameVal) => {
    const parts = nameVal.trim().split(" ")
    const first = parts[0] || ""
    const last = parts.slice(1).join(" ") || ""
    onUpdate({
      ...profile,
      name: nameVal,
      firstName: first,
      lastName: last
    })
  }

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
            onChange={e => handleNameChange(e.target.value)}
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
              const deg = parts[0]?.trim() || "B.Tech"
              const br = parts[1]?.trim() || "Computer Science and Engineering"
              onUpdate({ ...profile, degree: deg, branch: br })
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">College / University</label>
          <input
            type="text"
            placeholder="e.g. Bansal Institute of Science and Technology"
            value={profile.college || ""}
            onChange={e => update("college", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">CGPA</label>
          <input
            type="text"
            placeholder="e.g. 8.5/10"
            value={profile.cgpa || ""}
            onChange={e => update("cgpa", e.target.value)}
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
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Location / City</label>
          <input
            type="text"
            value={profile.city || profile.location || "India"}
            onChange={e => update("city", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Contact Email</label>
          <input
            type="email"
            placeholder="e.g. swarna@example.com"
            value={profile.email || ""}
            onChange={e => update("email", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Contact Phone</label>
          <input
            type="tel"
            placeholder="e.g. +91 9876543210"
            value={profile.phone || ""}
            onChange={e => update("phone", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Rotating Titles (comma-separated)</label>
        <input
          type="text"
          placeholder="Software Developer, Full-Stack Developer, Problem Solver"
          value={Array.isArray(profile.titles) ? profile.titles.join(", ") : (profile.titles || "")}
          onChange={e => update("titles", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <input
          type="checkbox"
          id="internships"
          checked={profile.availableForInternships ?? profile.availability ?? true}
          onChange={e => update("availableForInternships", e.target.checked)}
          className="rounded border-[#1e1e2e] bg-[#12121c] text-accent-indigo focus:ring-0"
        />
        <label htmlFor="internships" className="text-xs text-text-secondary select-none cursor-pointer">
          Show "Available for Opportunities / Internships" badge on portfolio
        </label>
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

      <EditorActionBar
        onSave={onSave}
        isSaving={isSaving}
        label="Save Profile Changes"
        helperText="Updates your name, bio, college & identity on the portfolio"
      />
    </div>
  )
}