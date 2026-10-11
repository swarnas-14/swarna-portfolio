import { Save, RefreshCw, CheckCircle2 } from "lucide-react"

export default function EditorActionBar({
  onSave,
  isSaving,
  label = "Save Changes",
  helperText = "Persists changes directly to src/data files"
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#1e1e2e] mt-6">
      <div className="text-xs text-text-muted flex items-center gap-2">
        <CheckCircle2 size={14} className="text-emerald-400/70" />
        <span>{helperText}</span>
      </div>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="btn-primary text-xs flex items-center gap-2 py-2.5 px-6 font-semibold shadow-lg shadow-accent-indigo/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
      >
        {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
        {isSaving ? "Saving Changes..." : label}
      </button>
    </div>
  )
}
