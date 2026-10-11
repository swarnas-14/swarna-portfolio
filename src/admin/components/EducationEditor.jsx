import { GraduationCap } from "lucide-react"
import EditorActionBar from "./EditorActionBar"

export default function EducationEditor({ education, onUpdate, onSave, isSaving }) {
  return (
    <div className="p-8 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Education & Academics</h2>
          <p className="text-xs text-text-muted mt-0.5">Degree curriculum, college information, and semester progress.</p>
        </div>
        <span className="badge flex items-center gap-1"><GraduationCap size={12} /> University</span>
      </div>

      {education.map((edu, idx) => (
        <div key={idx} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">College / University</label>
              <input
                type="text"
                value={edu.college}
                onChange={e => {
                  const copy = [...education]
                  copy[idx].college = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">Degree & Branch</label>
              <input
                type="text"
                value={`${edu.degree} - ${edu.branch}`}
                onChange={e => {
                  const copy = [...education]
                  const parts = e.target.value.split("-")
                  copy[idx].degree = parts[0]?.trim() || edu.degree
                  copy[idx].branch = parts[1]?.trim() || edu.branch
                  onUpdate(copy)
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>
          </div>
        </div>
      ))}

      <EditorActionBar
        onSave={onSave}
        isSaving={isSaving}
        label="Save Education"
        helperText="Updates your academic history and university records on the portfolio"
      />
    </div>
  )
}