import { Plus, Trash2, Award, ShieldCheck, Save, RefreshCw } from "lucide-react"
import EditorActionBar from "./EditorActionBar"

export default function CertificationsEditor({ certifications, onUpdate, onSave, isSaving }) {
  const addCert = () => {
    const newId = Date.now()
    const item = {
      id: newId,
      title: "New Certification",
      organization: "Issuing Organization",
      date: "2026",
      credentialId: "",
      verificationUrl: "",
      image: "/images/certifications/cert-1.jpg",
      description: "Certification in core engineering competencies."
    }
    onUpdate([...certifications, item])
  }

  const removeCert = (id) => {
    onUpdate(certifications.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Certifications & Accreditations</h2>
          <p className="text-xs text-text-muted mt-1">Manage verified credentials, certificate images, and issuer links.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addCert} className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3">
            <Plus size={14} /> Add Certificate
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4 font-semibold"
          >
            {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
            {isSaving ? "Saving..." : "Save Certifications"}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, idx) => (
          <div key={cert.id} className="p-5 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent-cyan flex items-center gap-1">
                <Award size={14} /> Certificate #{idx + 1}
              </span>
              <button
                onClick={() => removeCert(cert.id)}
                className="text-text-muted hover:text-rose-400 p-1"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Certification Name</label>
              <input
                type="text"
                value={cert.title}
                onChange={e => {
                  const copy = [...certifications]
                  copy[idx].title = e.target.value
                  onUpdate(copy)
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Issuer / Organization</label>
                <input
                  type="text"
                  value={cert.organization}
                  onChange={e => {
                    const copy = [...certifications]
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
                  value={cert.date}
                  onChange={e => {
                    const copy = [...certifications]
                    copy[idx].date = e.target.value
                    onUpdate(copy)
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. UC-12345"
                  value={cert.credentialId || ""}
                  onChange={e => {
                    const copy = [...certifications]
                    copy[idx].credentialId = e.target.value
                    onUpdate(copy)
                  }}
                  className="w-full px-3 py-1 rounded bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Verification URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={cert.verificationUrl || ""}
                  onChange={e => {
                    const copy = [...certifications]
                    copy[idx].verificationUrl = e.target.value
                    onUpdate(copy)
                  }}
                  className="w-full px-3 py-1 rounded bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <EditorActionBar
          onSave={onSave}
          isSaving={isSaving}
          label="Save Certifications"
          helperText="Updates your certifications, credential IDs and issuer links"
        />
      </div>
    </div>
  )
}