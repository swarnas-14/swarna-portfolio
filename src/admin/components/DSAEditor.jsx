import { Flame, ExternalLink } from "lucide-react"
import EditorActionBar from "./EditorActionBar"

export default function DSAEditor({ dsaStats, onUpdate, onSave, isSaving }) {
  return (
    <div className="p-8 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-xl text-white">DSA & Problem Solving Scorecard</h2>
          <p className="text-xs text-text-muted mt-0.5">Manage LeetCode metrics and algorithmic topic indicators.</p>
        </div>
        <span className="badge flex items-center gap-1"><Flame size={12} className="text-amber-400" /> LeetCode</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">LeetCode Solved Count</label>
          <input
            type="text"
            value={dsaStats?.solvedCount || "100+"}
            onChange={e => onUpdate({ ...dsaStats, solvedCount: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-sm font-bold text-accent-indigo focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">LeetCode Profile URL</label>
          <input
            type="text"
            placeholder="https://leetcode.com/u/..."
            value={dsaStats?.profileUrl || ""}
            onChange={e => onUpdate({ ...dsaStats, profileUrl: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      <EditorActionBar
        onSave={onSave}
        isSaving={isSaving}
        label="Save DSA Stats"
        helperText="Updates your LeetCode problem counter and profile URL on the portfolio"
      />
    </div>
  )
}