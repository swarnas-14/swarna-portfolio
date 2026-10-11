import { Sparkles } from "lucide-react"
import EditorActionBar from "./EditorActionBar"

export default function AboutEditor({ stats, onUpdateStats, onSave, isSaving }) {
  return (
    <div className="p-8 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-xl text-white">About & Verified Track Record</h2>
          <p className="text-xs text-text-muted mt-0.5">Manage key metric counters and personal engineering narrative.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Metrics Scorecard</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((st, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#12121c] border border-[#1e1e2e] space-y-2">
              <label className="block text-[11px] font-mono text-text-muted uppercase">{st.label}</label>
              <input
                type="text"
                value={st.value || ""}
                onChange={e => {
                  const copy = [...stats]
                  copy[i] = { ...copy[i], value: e.target.value }
                  onUpdateStats(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#0d0d14] border border-[#1e1e2e] text-sm text-accent-indigo font-bold focus:outline-none focus:border-accent-indigo"
              />
              <input
                type="text"
                value={st.sub || ""}
                onChange={e => {
                  const copy = [...stats]
                  copy[i] = { ...copy[i], sub: e.target.value }
                  onUpdateStats(copy)
                }}
                className="w-full px-3 py-1 rounded bg-[#0d0d14] border border-[#1e1e2e] text-[11px] text-text-muted focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <EditorActionBar
        onSave={onSave}
        isSaving={isSaving}
        label="Save About Stats"
        helperText="Updates your numbers and metrics scorecard on the portfolio"
      />
    </div>
  )
}