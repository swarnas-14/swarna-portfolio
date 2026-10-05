import { useState, useRef } from "react"
import {
  Image as ImageIcon, Upload, Copy, Check, Filter, Search,
  FolderOpen, AlertCircle, Sparkles, ExternalLink, RefreshCw
} from "lucide-react"

const CATEGORIES = [
  { id: "all", label: "All Images" },
  { id: "hackathons", label: "Hackathons" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "profile", label: "Profile" }
]

// Built-in starter inventory for demonstration & reference
const DEFAULT_MEDIA_ASSETS = [
  { url: "/images/hackathons/sih-team.jpg", folder: "hackathons", title: "SIH 2026 Team Presentation", date: "2026" },
  { url: "/images/hackathons/sih-certificate.jpg", folder: "hackathons", title: "Smart India Hackathon Certificate", date: "2026" },
  { url: "/images/hackathons/sih-presentation.jpg", folder: "hackathons", title: "Jury Demonstration", date: "2026" },
  { url: "/images/projects/project-1.jpg", folder: "projects", title: "Project 1 Showcase", date: "2025" },
  { url: "/images/projects/project-2.jpg", folder: "projects", title: "Project 2 Showcase", date: "2025" },
  { url: "/images/projects/project-3.jpg", folder: "projects", title: "Project 3 Showcase", date: "2025" },
  { url: "/images/projects/project-4.jpg", folder: "projects", title: "Project 4 Showcase", date: "2026" },
  { url: "/images/achievements/sih-medal.jpg", folder: "achievements", title: "National Finalist Trophy", date: "2026" },
  { url: "/images/certifications/cloud-cert.jpg", folder: "certifications", title: "Cloud / Dev Certificate", date: "2025" }
]

export default function MediaManager() {
  const [activeFolder, setActiveFolder] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedUrl, setCopiedUrl] = useState("")
  const [uploadStatus, setUploadStatus] = useState("")
  const [mediaList, setMediaList] = useState(DEFAULT_MEDIA_ASSETS)
  const fileInputRef = useRef(null)

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(""), 2500)
  }

  const handleUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/svg+xml"]
    if (!validTypes.includes(file.type.toLowerCase())) {
      alert("Please upload a valid image file (JPG, PNG, WEBP, or SVG).")
      return
    }

    const targetFolder = activeFolder === "all" ? "hackathons" : activeFolder
    const sanitizedFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    const reader = new FileReader()
    reader.onload = async () => {
      const base64Data = reader.result
      setUploadStatus(`Saving to public/images/${targetFolder}/...`)

      try {
        const response = await fetch("/__admin_api/save_image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            folder: targetFolder,
            filename: sanitizedFilename,
            base64Data
          })
        })

        const resData = await response.json()
        const finalUrl = resData.success ? resData.url : `/images/${targetFolder}/${sanitizedFilename}`

        const newAsset = {
          url: finalUrl,
          folder: targetFolder,
          title: file.name.replace(/\.[^/.]+$/, ""),
          date: new Date().toLocaleDateString()
        }

        setMediaList(prev => [newAsset, ...prev])
        setUploadStatus("✓ Image saved to local public directory!")
        setTimeout(() => setUploadStatus(""), 3000)
      } catch (err) {
        // Fallback for preview
        const newAsset = {
          url: base64Data,
          folder: targetFolder,
          title: file.name.replace(/\.[^/.]+$/, ""),
          date: new Date().toLocaleDateString()
        }
        setMediaList(prev => [newAsset, ...prev])
        setUploadStatus("Image uploaded (browser preview)")
        setTimeout(() => setUploadStatus(""), 3000)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const filteredMedia = mediaList.filter(item => {
    const matchesFolder = activeFolder === "all" || item.folder === activeFolder
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.url.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesQuery
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e]">
        <div>
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2.5">
            <ImageIcon className="text-accent-indigo" size={24} /> Media & Image Assets
          </h2>
          <p className="text-xs text-text-muted mt-1">
            Browse and manage local portfolio images stored in <code className="text-accent-cyan font-mono">public/images/</code>. Copy paths to use in forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            <Upload size={14} /> Upload New Image
          </button>
        </div>
      </div>

      {uploadStatus && (
        <div className="p-3.5 rounded-xl bg-accent-indigo/10 border border-accent-indigo/30 text-accent-cyan text-xs font-mono flex items-center gap-2">
          <Sparkles size={14} /> {uploadStatus}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFolder(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFolder === cat.id
                  ? "bg-accent-indigo text-white shadow-md shadow-accent-indigo/20 font-semibold"
                  : "bg-[#12121c] text-text-muted border border-[#1e1e2e] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMedia.map((media, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] hover:border-accent-indigo/40 overflow-hidden transition-all duration-200 flex flex-col"
          >
            {/* Image Preview Box */}
            <div className="relative h-44 bg-[#050508] overflow-hidden flex items-center justify-center border-b border-[#1e1e2e]">
              <img
                src={media.url}
                alt={media.title}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.style.display = "none"
                  e.target.parentNode.classList.add("flex-col", "gap-2")
                  const fallback = document.createElement("div")
                  fallback.className = "text-text-muted text-xs font-mono text-center px-4"
                  fallback.innerText = "Image asset placeholder\n" + media.url
                  e.target.parentNode.appendChild(fallback)
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-accent-cyan border border-white/10 uppercase">
                {media.folder}
              </span>
            </div>

            {/* Info and Actions */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-semibold text-xs text-white truncate" title={media.title}>
                  {media.title}
                </h4>
                <p className="font-mono text-[10px] text-text-muted mt-1 truncate" title={media.url}>
                  {media.url}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1e1e2e] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(media.url)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition-colors ${
                    copiedUrl === media.url
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-[#12121c] text-text-secondary hover:text-white border border-[#1e1e2e]"
                  }`}
                >
                  {copiedUrl === media.url ? (
                    <>
                      <Check size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy Path
                    </>
                  )}
                </button>

                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#12121c] text-text-muted hover:text-white border border-[#1e1e2e]"
                  title="Open full image in new tab"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] text-text-muted text-xs">
          No image assets found matching your search. Upload an image to add it to this folder.
        </div>
      )}
    </div>
  )
}
