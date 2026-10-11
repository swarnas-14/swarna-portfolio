import { useState, useRef } from "react"
import {
  Trophy, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon,
  CheckCircle2, Star, Eye, Upload, AlertCircle, Sparkles, Move,
  Calendar, Users, MapPin, ExternalLink, ShieldCheck, Tag, Save, RefreshCw
} from "lucide-react"
import EditorActionBar from "./EditorActionBar"

const PHOTO_TYPES = [
  { id: "winning-moment", label: "Winning Moment / Trophy" },
  { id: "team", label: "Team Photograph" },
  { id: "stage", label: "Stage / Podium" },
  { id: "presentation", label: "Presentation / Pitch" },
  { id: "certificate", label: "Certificate Scan" },
  { id: "project", label: "Project Demo Screenshot" }
]

export default function HackathonWinsManager({ hackathons, onUpdate, onSave, isSaving }) {
  const [selectedId, setSelectedId] = useState(hackathons[0]?.id || "")
  const [activePhotoIndex, setActivePhotoIndex] = useState(null)
  const [previewModalImg, setPreviewModalImg] = useState(null)
  const fileInputRef = useRef(null)
  const [uploadStatus, setUploadStatus] = useState("")

  const activeWin = hackathons.find(h => h.id === selectedId) || hackathons[0]

  const updateActiveWin = (updater) => {
    const updated = hackathons.map(h => (h.id === activeWin?.id ? updater(h) : h))
    onUpdate(updated)
  }

  // Add new photo via file upload or local path
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if (!validTypes.includes(file.type.toLowerCase())) {
      alert("Invalid format! Please select a JPG, JPEG, PNG, or WEBP image.")
      return
    }

    const reader = new FileReader()
    reader.onload = async () => {
      const base64Data = reader.result
      const sanitizedName = `${activeWin.id}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

      // Attempt direct local save via local Vite dev server
      try {
        setUploadStatus("Saving to public/images/hackathons/...")
        const res = await fetch("/__admin_api/save_image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "hackathons", filename: sanitizedName, base64Data })
        })
        const data = await res.json()
        const photoUrl = data.success ? data.url : base64Data

        const newPhoto = {
          url: photoUrl,
          caption: file.name.replace(/\.[^/.]+$/, ""),
          type: "team"
        }

        updateActiveWin(h => {
          const currentPhotos = h.photos || []
          return {
            ...h,
            coverPhoto: h.coverPhoto || photoUrl,
            photos: [...currentPhotos, newPhoto]
          }
        })
        setUploadStatus("Photo added successfully!")
        setTimeout(() => setUploadStatus(""), 3000)
      } catch (err) {
        // Fallback: store base64 data for preview
        const newPhoto = {
          url: base64Data,
          caption: file.name.replace(/\.[^/.]+$/, ""),
          type: "team"
        }
        updateActiveWin(h => ({
          ...h,
          coverPhoto: h.coverPhoto || base64Data,
          photos: [...(h.photos || []), newPhoto]
        }))
        setUploadStatus("Photo added (preview mode)")
        setTimeout(() => setUploadStatus(""), 3000)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  // Photo reordering
  const movePhoto = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= (activeWin.photos?.length || 0)) return
    updateActiveWin(h => {
      const copy = [...(h.photos || [])]
      const [moved] = copy.splice(fromIdx, 1)
      copy.splice(toIdx, 0, moved)
      return { ...h, photos: copy }
    })
  }

  // Remove photo
  const removePhoto = (idx) => {
    updateActiveWin(h => {
      const copy = [...(h.photos || [])]
      const [removed] = copy.splice(idx, 1)
      const newCover = h.coverPhoto === removed?.url ? copy[0]?.url || "" : h.coverPhoto
      return { ...h, photos: copy, coverPhoto: newCover }
    })
  }

  // Set Cover Photo
  const setCover = (url) => {
    updateActiveWin(h => ({ ...h, coverPhoto: url }))
  }

  // Add new Hackathon Win entry
  const addNewWin = () => {
    const newId = `hackathon-${Date.now().toString().slice(-4)}`
    const newEntry = {
      id: newId,
      name: "New Hackathon Win",
      shortName: "Hackathon",
      problemStatement: "[ADD PROBLEM STATEMENT]",
      concept: "[ADD WINNING CONCEPT / SYSTEM]",
      description: "[ADD DESCRIPTION OF THE SOLUTION]",
      role: "[ADD YOUR ROLE]",
      team: "[ADD TEAM MEMBERS]",
      teamSize: "4",
      technologies: ["Java", "Spring Boot", "React"],
      implementedFeatures: ["[ADD FEATURE 1]", "[ADD FEATURE 2]"],
      plannedFeatures: ["[ADD FUTURE SCOPE]"],
      achievement: "1st Place Winner",
      position: "Winner",
      date: "2026",
      location: "India",
      githubUrl: "",
      verificationUrl: "",
      coverPhoto: "",
      photos: []
    }
    onUpdate([...hackathons, newEntry])
    setSelectedId(newId)
  }

  // Delete Win entry
  const deleteWin = (id) => {
    if (hackathons.length <= 1) {
      alert("At least one hackathon record should be maintained.")
      return
    }
    if (confirm("Are you sure you want to delete this hackathon record?")) {
      const filtered = hackathons.filter(h => h.id !== id)
      onUpdate(filtered)
      setSelectedId(filtered[0]?.id || "")
    }
  }

  if (!activeWin) return null

  return (
    <div className="space-y-8">
      {/* Header & Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-indigo font-semibold">
            <Trophy size={14} className="text-amber-400" /> Dedicated Manager
          </div>
          <h2 className="font-display font-bold text-2xl text-white mt-1">
            Hackathon Wins & Photo Evidence Manager
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Manage multiple win photos, team moments, certificates, stage photos, and project verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={addNewWin}
            className="btn-secondary text-xs flex items-center gap-2 py-2 px-3"
          >
            <Plus size={14} /> Add Hackathon Win
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="btn-primary text-xs flex items-center gap-2 py-2 px-4 font-semibold"
          >
            {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? "Saving..." : "Save Hackathons"}
          </button>
        </div>
      </div>

      {/* Wins Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#1e1e2e]">
        {hackathons.map(h => (
          <button
            key={h.id}
            onClick={() => setSelectedId(h.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
              selectedId === h.id
                ? "bg-accent-indigo text-white shadow-lg shadow-accent-indigo/25"
                : "bg-[#12121c] text-text-secondary hover:text-white border border-[#1e1e2e]"
            }`}
          >
            <Trophy size={13} className={selectedId === h.id ? "text-amber-300" : "text-text-muted"} />
            <span>{h.shortName || h.name}</span>
            {h.photos?.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-accent-cyan font-mono">
                {h.photos.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Edit Surface */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Win Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e1e2e]">
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider font-semibold">
                Event Metadata & Results
              </span>
              <button
                onClick={() => deleteWin(activeWin.id)}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                title="Delete this hackathon entry"
              >
                <Trash2 size={13} /> Delete Entry
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Hackathon / Event Name
                </label>
                <input
                  type="text"
                  value={activeWin.name || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, name: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Winning Position / Result
                </label>
                <input
                  type="text"
                  placeholder="e.g. Winner / 1st Runner Up / Grand Finalist"
                  value={activeWin.position || activeWin.achievement || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, position: e.target.value, achievement: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Date / Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2026 / Oct 2026"
                  value={activeWin.date || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, date: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Team Name
                </label>
                <input
                  type="text"
                  value={activeWin.team || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, team: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Your Role
                </label>
                <input
                  type="text"
                  value={activeWin.role || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, role: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                Problem Statement / Code
              </label>
              <input
                type="text"
                placeholder="e.g. Problem Statement 26227"
                value={activeWin.problemStatement || ""}
                onChange={e => updateActiveWin(h => ({ ...h, problemStatement: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                Winning Concept / Solution Title
              </label>
              <input
                type="text"
                value={activeWin.concept || ""}
                onChange={e => updateActiveWin(h => ({ ...h, concept: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                Solution Description
              </label>
              <textarea
                rows={3}
                value={activeWin.description || ""}
                onChange={e => updateActiveWin(h => ({ ...h, description: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  value={activeWin.githubUrl || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, githubUrl: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5">
                  Verification / Result Link
                </label>
                <input
                  type="text"
                  placeholder="Official certificate / result link"
                  value={activeWin.verificationUrl || ""}
                  onChange={e => updateActiveWin(h => ({ ...h, verificationUrl: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Photo Manager */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e1e2e]">
              <div>
                <span className="font-mono text-xs text-accent-indigo uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <ImageIcon size={14} /> Multi-Photo Evidence Gallery
                </span>
                <div className="text-[10px] text-text-muted">
                  {(activeWin.photos?.length || 0)} photos attached
                </div>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3"
              >
                <Upload size={13} /> Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {uploadStatus && (
              <div className="p-2.5 rounded-xl bg-accent-indigo/10 border border-accent-indigo/30 text-accent-cyan text-xs font-mono">
                {uploadStatus}
              </div>
            )}

            {/* Photos List */}
            {(!activeWin.photos || activeWin.photos.length === 0) ? (
              <div className="p-8 rounded-xl bg-[#12121c] border border-dashed border-[#1e1e2e] text-center space-y-3">
                <ImageIcon size={28} className="mx-auto text-text-muted" />
                <div className="text-xs text-text-muted">No photos added to this hackathon win yet.</div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary text-xs inline-flex items-center gap-1.5"
                >
                  <Plus size={13} /> Select First Photo
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {activeWin.photos.map((photo, idx) => {
                  const isCover = activeWin.coverPhoto === photo.url
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl bg-[#12121c] border transition-all ${
                        isCover ? "border-amber-400/60 shadow-md shadow-amber-400/10" : "border-[#1e1e2e] hover:border-accent-indigo/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Thumbnail */}
                        <div
                          onClick={() => setPreviewModalImg(photo)}
                          className="w-16 h-16 rounded-lg bg-[#0d0d14] border border-[#1e1e2e] overflow-hidden shrink-0 cursor-pointer relative group/thumb"
                        >
                          {photo.url ? (
                            <img src={photo.url} alt={photo.caption || ""} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted">
                              <ImageIcon size={16} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Eye size={14} />
                          </div>
                        </div>

                        {/* Photo Meta */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              placeholder="Photo caption / description..."
                              value={photo.caption || ""}
                              onChange={e => {
                                const newCaption = e.target.value
                                updateActiveWin(h => {
                                  const copy = [...(h.photos || [])]
                                  copy[idx] = { ...copy[idx], caption: newCaption }
                                  return { ...h, photos: copy }
                                })
                              }}
                              className="w-full px-2 py-1 rounded bg-[#0d0d14] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
                            />
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <select
                              value={photo.type || "team"}
                              onChange={e => {
                                const newType = e.target.value
                                updateActiveWin(h => {
                                  const copy = [...(h.photos || [])]
                                  copy[idx] = { ...copy[idx], type: newType }
                                  return { ...h, photos: copy }
                                })
                              }}
                              className="px-2 py-1 rounded bg-[#0d0d14] border border-[#1e1e2e] text-[11px] text-text-secondary focus:outline-none"
                            >
                              {PHOTO_TYPES.map(pt => (
                                <option key={pt.id} value={pt.id}>{pt.label}</option>
                              ))}
                            </select>

                            <button
                              onClick={() => setCover(photo.url)}
                              className={`text-[11px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                                isCover ? "bg-amber-400/20 text-amber-300 border border-amber-400/40" : "text-text-muted hover:text-amber-300"
                              }`}
                              title="Set as featured / cover photo"
                            >
                              <Star size={11} className={isCover ? "fill-amber-300 text-amber-300" : ""} />
                              {isCover ? "Cover" : "Set Cover"}
                            </button>
                          </div>
                        </div>

                        {/* Controls: Move Up/Down & Delete */}
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            disabled={idx === 0}
                            onClick={() => movePhoto(idx, idx - 1)}
                            className="p-1 rounded bg-[#0d0d14] text-text-muted hover:text-white disabled:opacity-30"
                            title="Move photo up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            disabled={idx === (activeWin.photos.length - 1)}
                            onClick={() => movePhoto(idx, idx + 1)}
                            className="p-1 rounded bg-[#0d0d14] text-text-muted hover:text-white disabled:opacity-30"
                            title="Move photo down"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            onClick={() => removePhoto(idx)}
                            className="p-1 rounded bg-[#0d0d14] text-rose-400 hover:text-rose-300"
                            title="Remove photo"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <EditorActionBar
          onSave={onSave}
          isSaving={isSaving}
          label="Save Hackathons"
          helperText="Saves hackathon wins, photos, links, and evidence directly to disk"
        />
      </div>

      {/* Lightbox Preview Modal */}
      {previewModalImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewModalImg(null)}
        >
          <div className="max-w-3xl max-h-[80vh] p-4 text-center space-y-3" onClick={e => e.stopPropagation()}>
            <img src={previewModalImg.url} alt="" className="max-w-full max-h-[70vh] object-contain rounded-xl mx-auto shadow-2xl" />
            <div className="text-sm font-medium text-white">{previewModalImg.caption}</div>
            <button
              onClick={() => setPreviewModalImg(null)}
              className="btn-secondary text-xs px-4 py-1.5"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}