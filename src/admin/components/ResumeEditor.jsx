import { FileText, Download, ExternalLink } from "lucide-react"
import EditorActionBar from "./EditorActionBar"

export default function ResumeEditor({ resumeUrl, onUpdate, onSave, isSaving }) {
  return (
    <div className="p-8 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
      <div className="pb-4 border-b border-[#1e1e2e]">
        <h2 className="font-display font-bold text-xl text-white">Resume / CV Settings</h2>
        <p className="text-xs text-text-muted mt-0.5">Configure resume PDF file link or URL referenced by hero buttons and resume section.</p>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
          Resume File Path / Direct URL
        </label>
        <input
          type="text"
          placeholder="e.g. /resume.pdf or https://drive.google.com/..."
          value={resumeUrl || ""}
          onChange={e => onUpdate(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
        />
        <p className="text-[11px] text-text-muted mt-2">
          Tip: Place your resume PDF in the <code className="text-accent-cyan">public/</code> folder (e.g. <code className="text-accent-cyan">public/Swarna_Sahu_Resume.pdf</code>) and set the path to <code className="text-accent-indigo">/Swarna_Sahu_Resume.pdf</code>.
        </p>
      </div>

      <EditorActionBar
        onSave={onSave}
        isSaving={isSaving}
        label="Save Resume Link"
        helperText="Updates the resume link across header, hero & resume sections"
      />
    </div>
  )
}