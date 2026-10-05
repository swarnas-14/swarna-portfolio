import { useState } from "react"
import { Download, Upload, Copy, CheckCircle2, FileJson, X } from "lucide-react"

export default function ExportBackupModal({ isOpen, onClose, data, onImport }) {
  const [copied, setCopied] = useState(false)

  const jsonString = JSON.stringify(data, null, 2)

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vinay-portfolio-data-${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        onImport(parsed)
        alert("Portfolio data imported successfully into local studio!")
        onClose()
      } catch (err) {
        alert(`Failed to parse JSON backup: ${err.message}`)
      }
    }
    reader.readAsText(file)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[#1e1e2e] bg-[#12121c]">
          <div className="flex items-center gap-2">
            <FileJson size={20} className="text-accent-cyan" />
            <h3 className="font-display font-bold text-lg text-white">Export & Backup Portfolio Data</h3>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadJson}
              className="btn-primary p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center"
            >
              <Download size={20} />
              <span className="font-bold text-xs">Export portfolio-data.json</span>
              <span className="text-[10px] text-white/80 font-normal">Complete backup with all hackathon photos & metadata</span>
            </button>

            <label className="btn-secondary p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center cursor-pointer">
              <Upload size={20} />
              <span className="font-bold text-xs">Import JSON Backup</span>
              <span className="text-[10px] text-text-muted font-normal">Restore portfolio state from previously exported file</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-text-muted uppercase">Data Payload Preview</span>
              <button
                onClick={handleCopy}
                className="text-xs font-mono text-accent-indigo hover:text-accent-cyan flex items-center gap-1"
              >
                {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? "Copied to Clipboard!" : "Copy JSON"}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#12121c] border border-[#1e1e2e] font-mono text-[11px] text-text-secondary max-h-48 overflow-auto">
              {jsonString}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}