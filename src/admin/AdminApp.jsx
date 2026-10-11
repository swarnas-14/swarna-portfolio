import { useState, useEffect } from "react"
import {
  Trophy, User, Info, Cpu, Layers, Award, Flame, GraduationCap,
  Users, Share2, FileText, Save, CheckCircle2, RefreshCw, Eye,
  ShieldCheck, Download, AlertCircle, Sparkles, LogOut, Milestone,
  Image as ImageIcon
} from "lucide-react"

// Initial datasets
import { profile as initialProfile } from "../data/profile"
import { hackathons as initialHackathons } from "../data/hackathons"
import { projects as initialProjects } from "../data/projects"
import { achievements as initialAchievements } from "../data/achievements"
import { certifications as initialCertifications } from "../data/certifications"
import { techCategories as initialTechCategories } from "../data/techStack"
import { education as initialEducation } from "../data/education"
import { leadership as initialLeadership } from "../data/leadership"
import { socialLinks as initialSocial } from "../data/social"
import { timeline as initialTimeline } from "../data/timeline"
import { aboutStats as initialAboutStats } from "../data/aboutStats"
import { dsaStats as initialDsaStats } from "../data/dsa"

// Editors & Modals
import HackathonWinsManager from "./components/HackathonWinsManager"
import ProfileEditor from "./components/ProfileEditor"
import AboutEditor from "./components/AboutEditor"
import SkillsEditor from "./components/SkillsEditor"
import ProjectsEditor from "./components/ProjectsEditor"
import AchievementsEditor from "./components/AchievementsEditor"
import CertificationsEditor from "./components/CertificationsEditor"
import DSAEditor from "./components/DSAEditor"
import EducationEditor from "./components/EducationEditor"
import LeadershipEditor from "./components/LeadershipEditor"
import SocialEditor from "./components/SocialEditor"
import ResumeEditor from "./components/ResumeEditor"
import TimelineEditor from "./components/TimelineEditor"
import MediaManager from "./components/MediaManager"
import BuildCheckModal from "./components/BuildCheckModal"
import ExportBackupModal from "./components/ExportBackupModal"
import AdminLogin from "./components/AdminLogin"

const TABS = [
  { id: "hackathon-wins", label: "Hackathons (Photos)", icon: Trophy, featured: true },
  { id: "profile", label: "Profile", icon: User },
  { id: "about", label: "About & Stats", icon: Info },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "certifications", label: "Certifications", icon: ShieldCheck },
  { id: "dsa", label: "DSA & LeetCode", icon: Flame },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "timeline", label: "Journey / Timeline", icon: Milestone },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "social", label: "Social Links", icon: Share2 },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "media", label: "Media / Images", icon: ImageIcon }
]

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("swarna_admin_authenticated") === "true"
  })

  const [activeTab, setActiveTab] = useState("hackathon-wins")
  const [saveStatus, setSaveStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [toast, setToast] = useState(null)
  const [auditOpen, setAuditOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  // Local state for all datasets (with localStorage recovery if present)
  const [profile, setProfile] = useState(initialProfile)
  const [hackathons, setHackathons] = useState(initialHackathons)
  const [projects, setProjects] = useState(initialProjects)
  const [achievements, setAchievements] = useState(initialAchievements)
  const [certifications, setCertifications] = useState(initialCertifications)
  const [techCategories, setTechCategories] = useState(initialTechCategories)
  const [education, setEducation] = useState(initialEducation)
  const [leadership, setLeadership] = useState(initialLeadership)
  const [socialLinks, setSocialLinks] = useState(initialSocial)
  const [timeline, setTimeline] = useState(initialTimeline)
  const [resumeUrl, setResumeUrl] = useState(initialProfile.resumeUrl || "[ADD RESUME URL / FILE]")
  const [dsaStats, setDsaStats] = useState(initialDsaStats || { solvedCount: "100+", profileUrl: "[ADD LEETCODE URL]" })
  const [aboutStats, setAboutStats] = useState(initialAboutStats || [
    { value: "100+", label: "LeetCode Problems", sub: "Algorithms & Data Structures" },
    { value: "5+", label: "Projects Built", sub: "Full-Stack & Backend Systems" },
    { value: "3+", label: "Hackathons", sub: "Competitions & SIH 2026" },
    { value: "15+", label: "Technologies", sub: "Languages, Frameworks & Tools" },
    { value: "5th", label: "Semester", sub: "B.Tech Computer Science & Eng." }
  ])

  const handleLogout = () => {
    sessionStorage.removeItem("swarna_admin_authenticated")
    setIsAuthenticated(false)
  }

  // Helper to save a single data file and verify HTTP response
  const saveFileOnDisk = async (filename, content) => {
    const res = await fetch("/__admin_api/save_file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, content })
    })
    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status} when saving ${filename}`)
    }
    const data = await res.json()
    if (!data.success) {
      throw new Error(data.error || `Failed to write ${filename}`)
    }
    return data
  }

  // Save all modified datasets directly to disk via local dev server
  const handleSaveAll = async () => {
    setIsSaving(true)
    setSaveStatus("Saving...")
    setToast({
      type: "saving",
      title: "Saving Portfolio Data",
      message: "Writing changes to local src/data files..."
    })

    const filesToSave = [
      {
        filename: "hackathons.js",
        content: `export const hackathons = ${JSON.stringify(hackathons, null, 2)}\n`
      },
      {
        filename: "projects.js",
        content: `export const projects = ${JSON.stringify(
          projects.map(p => ({
            ...p,
            // Normalize: always save as techStack (never as technologies)
            techStack: p.techStack || p.technologies || [],
            technologies: undefined
          })),
          null, 2
        )}\n`
      },
      {
        filename: "achievements.js",
        content: `export const achievements = ${JSON.stringify(achievements, null, 2)}\nexport const achievementCategories = ["All", "Hackathon", "Competitive Programming", "Academic", "Award", "Certification", "Events"]\n`
      },
      {
        filename: "certifications.js",
        content: `export const certifications = ${JSON.stringify(certifications, null, 2)}\n`
      },
      {
        filename: "profile.js",
        content: `export const profile = ${JSON.stringify({ ...profile, resumeUrl }, null, 2)}\n`
      },
      {
        filename: "techStack.js",
        content: `export const techCategories = ${JSON.stringify(techCategories, null, 2)}\nexport const allTechs = techCategories.flatMap(cat => cat.techs)\nexport const techNodes = ["Java", "Python", "Spring Boot", "MySQL", "MongoDB", "Redis", "Docker", "Kafka", "React", "Git", "AI/ML", "REST API", "NumPy", "Pandas", "DSA", "Algorithms", "Security", "JavaScript", "Hibernate", "CSS"]\n`
      },
      {
        filename: "education.js",
        content: `export const education = ${JSON.stringify(education, null, 2)}\n`
      },
      {
        filename: "leadership.js",
        content: `export const leadership = ${JSON.stringify(leadership, null, 2)}\n`
      },
      {
        filename: "social.js",
        content: `export const socialLinks = ${JSON.stringify(socialLinks, null, 2)}\n`
      },
      {
        filename: "timeline.js",
        content: `export const timeline = ${JSON.stringify(timeline, null, 2)}\n`
      },
      {
        filename: "aboutStats.js",
        content: `export const aboutStats = ${JSON.stringify(aboutStats, null, 2)}\n`
      },
      {
        filename: "dsa.js",
        content: `export const dsaStats = ${JSON.stringify(dsaStats, null, 2)}\n`
      }
    ]

    // Block accidental page close/reload while saving is in progress
    const unloadGuard = (e) => { e.preventDefault(); e.returnValue = "" }
    window.addEventListener("beforeunload", unloadGuard)

    try {
      // 1. Attempt rapid single-request bulk save endpoint
      let batchSuccess = false
      try {
        const batchRes = await fetch("/__admin_api/save_all", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files: filesToSave })
        })
        if (batchRes.ok) {
          const batchData = await batchRes.json()
          if (batchData.success) {
            batchSuccess = true
          }
        }
      } catch (e) {
        console.warn("save_all endpoint unavailable, falling back to parallel save_file", e)
      }

      // 2. Parallel individual file fallback if save_all was not handled
      if (!batchSuccess) {
        await Promise.all(
          filesToSave.map(f => saveFileOnDisk(f.filename, f.content))
        )
      }

      // 3. Cache latest state into localStorage for instant reload safety
      try {
        localStorage.setItem("swarna_portfolio_data", JSON.stringify({
          profile: { ...profile, resumeUrl },
          hackathons,
          projects,
          achievements,
          certifications,
          techCategories,
          education,
          leadership,
          socialLinks,
          timeline,
          aboutStats,
          dsaStats
        }))
      } catch (e) {
        console.warn("LocalStorage caching error:", e)
      }

      setJustSaved(true)
      setSaveStatus("✓ Saved to src/data!")
      setToast({
        type: "success",
        title: "All Changes Saved!",
        message: "Successfully saved to src/data! Portfolio is up to date.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      })

      setTimeout(() => setJustSaved(false), 3000)
      setTimeout(() => setSaveStatus(""), 5000)
      setTimeout(() => setToast(prev => prev?.type === "success" ? null : prev), 6000)
    } catch (err) {
      console.error("Save error:", err)
      const isNetworkErr = !err.message || err.message.includes("fetch") || err.message.includes("NetworkError")
      const friendlyMsg = isNetworkErr
        ? "Cannot reach the dev server API. Make sure you are running 'npm run dev' and reload the page."
        : err.message || "Failed to write data files to disk."
      setSaveStatus("❌ Save failed")
      setToast({
        type: "error",
        title: "Save Failed",
        message: friendlyMsg
      })
    } finally {
      setIsSaving(false)
      window.removeEventListener("beforeunload", unloadGuard)
    }
  }

  const allDataPayload = {
    profile: { ...profile, resumeUrl },
    hackathons,
    projects,
    achievements,
    certifications,
    techCategories,
    education,
    leadership,
    socialLinks,
    timeline,
    aboutStats,
    dsaStats
  }

  const handleImportAll = (imported) => {
    if (imported.profile) setProfile(imported.profile)
    if (imported.hackathons) setHackathons(imported.hackathons)
    if (imported.projects) setProjects(imported.projects)
    if (imported.achievements) setAchievements(imported.achievements)
    if (imported.certifications) setCertifications(imported.certifications)
    if (imported.techCategories) setTechCategories(imported.techCategories)
    if (imported.education) setEducation(imported.education)
    if (imported.leadership) setLeadership(imported.leadership)
    if (imported.socialLinks) setSocialLinks(imported.socialLinks)
    if (imported.timeline) setTimeline(imported.timeline)
  }

  // If not authenticated, show local convenience login screen
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-[#f1f5f9] flex flex-col font-sans">
      {/* Top Console Bar */}
      <header className="sticky top-0 z-50 bg-[#0d0d14]/90 backdrop-blur-xl border-b border-[#1e1e2e] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Local Status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-indigo to-accent-cyan flex items-center justify-center font-display font-bold text-xs text-white">
              SS
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white flex items-center gap-2">
                Portfolio Studio
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">
                  Local-Only
                </span>
              </div>
              <div className="text-[10px] text-text-muted font-mono">
                Development Environment · Zero Backend
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.open("/", "_blank")}
              className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
              title="Preview public portfolio"
            >
              <Eye size={13} /> Preview Portfolio
            </button>

            <button
              onClick={() => setAuditOpen(true)}
              className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3 hidden sm:flex"
              title="Run data integrity check"
            >
              <ShieldCheck size={13} /> Build Audit
            </button>

            <button
              onClick={() => setExportOpen(true)}
              className="btn-secondary text-xs flex items-center gap-1.5 py-1.5 px-3"
              title="Export portfolio data backup"
            >
              <Download size={13} /> Backup / Export
            </button>

            {saveStatus && (
              <span className={`text-xs font-mono flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                saveStatus.includes("Saved")
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : saveStatus.includes("failed") || saveStatus.includes("❌")
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  : "bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20 animate-pulse"
              }`}>
                {saveStatus.includes("Saved") ? <CheckCircle2 size={13} /> : saveStatus.includes("failed") || saveStatus.includes("❌") ? <AlertCircle size={13} /> : <RefreshCw size={13} className="animate-spin" />}
                {saveStatus}
              </span>
            )}

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className={`text-xs flex items-center gap-1.5 py-1.5 px-4 font-semibold rounded-xl transition-all shadow-md cursor-pointer ${
                justSaved
                  ? "bg-emerald-600 text-white shadow-emerald-500/30 scale-105"
                  : isSaving
                  ? "bg-accent-indigo/70 text-white cursor-not-allowed"
                  : "btn-primary hover:scale-105 active:scale-95"
              }`}
            >
              {isSaving ? <RefreshCw size={13} className="animate-spin" /> : justSaved ? <CheckCircle2 size={13} /> : <Save size={13} />}
              {isSaving ? "Saving..." : justSaved ? "Saved!" : "Save Changes"}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-text-muted hover:text-rose-400 hover:border-rose-500/30 transition-colors"
              title="Log out of local session"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 grid lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-1.5 sticky top-24">
          <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted px-3 mb-2 font-semibold">
            Management Sections
          </div>
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all duration-200 ${
                  isActive
                    ? "bg-accent-indigo text-white shadow-lg shadow-accent-indigo/20 font-semibold"
                    : "text-text-secondary hover:text-white hover:bg-[#12121c]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} className={isActive ? "text-white" : tab.featured ? "text-amber-400" : "text-text-muted"} />
                  <span>{tab.label}</span>
                </div>
                {tab.featured && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                    Hot
                  </span>
                )}
              </button>
            )
          })}

          <div className="mt-8 p-4 rounded-xl bg-[#0d0d14] border border-[#1e1e2e] space-y-2 text-[11px] text-text-muted">
            <div className="font-semibold text-text-secondary flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" /> Local Development Tooling
            </div>
            <p>
              This studio runs strictly in local development. When deployed on Vercel/production, this admin interface is excluded from the public portfolio.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 min-h-[600px]">
          {activeTab === "hackathon-wins" && (
            <HackathonWinsManager
              hackathons={hackathons}
              onUpdate={setHackathons}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "profile" && (
            <ProfileEditor
              profile={profile}
              onUpdate={setProfile}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "about" && (
            <AboutEditor
              stats={aboutStats}
              onUpdateStats={setAboutStats}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "skills" && (
            <SkillsEditor
              techCategories={techCategories}
              onUpdate={setTechCategories}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsEditor
              projects={projects}
              onUpdate={setProjects}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "achievements" && (
            <AchievementsEditor
              achievements={achievements}
              onUpdate={setAchievements}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "certifications" && (
            <CertificationsEditor
              certifications={certifications}
              onUpdate={setCertifications}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "dsa" && (
            <DSAEditor
              dsaStats={dsaStats}
              onUpdate={setDsaStats}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "education" && (
            <EducationEditor
              education={education}
              onUpdate={setEducation}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "timeline" && (
            <TimelineEditor
              timeline={timeline}
              onUpdate={setTimeline}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "leadership" && (
            <LeadershipEditor
              leadership={leadership}
              onUpdate={setLeadership}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "social" && (
            <SocialEditor
              socialLinks={socialLinks}
              onUpdate={setSocialLinks}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "resume" && (
            <ResumeEditor
              resumeUrl={resumeUrl}
              onUpdate={setResumeUrl}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === "media" && (
            <MediaManager />
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-md w-full p-4 rounded-2xl bg-[#0f0f18]/95 backdrop-blur-xl border border-[#2a2a3e] shadow-2xl shadow-black/80 flex items-start gap-3 animate-fade-in">
          {toast.type === "saving" && (
            <div className="w-8 h-8 rounded-xl bg-accent-indigo/20 border border-accent-indigo/40 text-accent-indigo flex items-center justify-center shrink-0 mt-0.5">
              <RefreshCw size={16} className="animate-spin" />
            </div>
          )}
          {toast.type === "success" && (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
          )}
          {toast.type === "error" && (
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle size={16} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-xs text-white flex items-center justify-between">
              <span>{toast.title || (toast.type === "saving" ? "Saving Data..." : toast.type === "success" ? "Changes Saved!" : "Save Failed")}</span>
              {toast.timestamp && <span className="text-[10px] font-mono text-text-muted">{toast.timestamp}</span>}
            </div>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed break-words">
              {toast.message}
            </p>
            {toast.type === "success" && (
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={() => window.open("/", "_blank")}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <Eye size={12} /> Preview Portfolio
                </button>
              </div>
            )}
            {toast.type === "error" && (
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={handleSaveAll}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={12} /> Retry Now
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modals */}
      <BuildCheckModal
        isOpen={auditOpen}
        onClose={() => setAuditOpen(false)}
        data={allDataPayload}
      />

      <ExportBackupModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        data={allDataPayload}
        onImport={handleImportAll}
      />
    </div>
  )
}