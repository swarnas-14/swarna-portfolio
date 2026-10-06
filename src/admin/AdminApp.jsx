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
    return sessionStorage.getItem("vinay_admin_authenticated") === "true"
  })

  const [activeTab, setActiveTab] = useState("hackathon-wins")
  const [saveStatus, setSaveStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  // Local state for all datasets
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
    sessionStorage.removeItem("vinay_admin_authenticated")
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
    setSaveStatus("Saving changes to local files...")

    try {
      // 1. Save hackathons.js
      await saveFileOnDisk("hackathons.js", `export const hackathons = ${JSON.stringify(hackathons, null, 2)}\n`)

      // 2. Save projects.js
      await saveFileOnDisk("projects.js", `export const projects = ${JSON.stringify(projects, null, 2)}\n`)

      // 3. Save achievements.js
      const achievementsContent = `export const achievements = ${JSON.stringify(achievements, null, 2)}\nexport const achievementCategories = ["All", "Hackathon", "Competitive Programming", "Academic", "Award", "Certification", "Events"]\n`
      await saveFileOnDisk("achievements.js", achievementsContent)

      // 4. Save certifications.js
      await saveFileOnDisk("certifications.js", `export const certifications = ${JSON.stringify(certifications, null, 2)}\n`)

      // 5. Save profile.js
      await saveFileOnDisk("profile.js", `export const profile = ${JSON.stringify({ ...profile, resumeUrl }, null, 2)}\n`)

      // 6. Save techStack.js
      const techStackContent = `export const techCategories = ${JSON.stringify(techCategories, null, 2)}\nexport const allTechs = techCategories.flatMap(cat => cat.techs)\nexport const techNodes = ["Java", "Python", "Spring Boot", "MySQL", "MongoDB", "Redis", "Docker", "Kafka", "React", "Git", "AI/ML", "REST API", "NumPy", "Pandas", "DSA", "Algorithms", "Security", "JavaScript", "Hibernate", "CSS"]\n`
      await saveFileOnDisk("techStack.js", techStackContent)

      // 7. Save education.js, leadership.js, social.js, timeline.js
      await saveFileOnDisk("education.js", `export const education = ${JSON.stringify(education, null, 2)}\n`)
      await saveFileOnDisk("leadership.js", `export const leadership = ${JSON.stringify(leadership, null, 2)}\n`)
      await saveFileOnDisk("social.js", `export const socialLinks = ${JSON.stringify(socialLinks, null, 2)}\n`)
      await saveFileOnDisk("timeline.js", `export const timeline = ${JSON.stringify(timeline, null, 2)}\n`)

      // 8. Save aboutStats.js and dsa.js
      await saveFileOnDisk("aboutStats.js", `export const aboutStats = ${JSON.stringify(aboutStats, null, 2)}\n`)
      await saveFileOnDisk("dsa.js", `export const dsaStats = ${JSON.stringify(dsaStats, null, 2)}\n`)

      setSaveStatus("✓ Saved to src/data! Now commit & push to deploy.")
      setTimeout(() => setSaveStatus(""), 6000)
    } catch (err) {
      console.error("Save error:", err)
      setSaveStatus(`❌ ${err.message}`)
      setTimeout(() => setSaveStatus(""), 6000)
    } finally {
      setIsSaving(false)
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
              VS
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
            {saveStatus && (
              <span className="text-xs font-mono text-emerald-400 animate-fade-in flex items-center gap-1 mr-1">
                <CheckCircle2 size={13} /> {saveStatus}
              </span>
            )}

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

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-4 font-semibold"
            >
              {isSaving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
              {isSaving ? "Saving..." : "Save Changes"}
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
            />
          )}

          {activeTab === "profile" && (
            <ProfileEditor profile={profile} onUpdate={setProfile} />
          )}

          {activeTab === "about" && (
            <AboutEditor stats={aboutStats} onUpdateStats={setAboutStats} />
          )}

          {activeTab === "skills" && (
            <SkillsEditor techCategories={techCategories} onUpdate={setTechCategories} />
          )}

          {activeTab === "projects" && (
            <ProjectsEditor projects={projects} onUpdate={setProjects} />
          )}

          {activeTab === "achievements" && (
            <AchievementsEditor achievements={achievements} onUpdate={setAchievements} />
          )}

          {activeTab === "certifications" && (
            <CertificationsEditor certifications={certifications} onUpdate={setCertifications} />
          )}

          {activeTab === "dsa" && (
            <DSAEditor dsaStats={dsaStats} onUpdate={setDsaStats} />
          )}

          {activeTab === "education" && (
            <EducationEditor education={education} onUpdate={setEducation} />
          )}

          {activeTab === "timeline" && (
            <TimelineEditor timeline={timeline} onUpdate={setTimeline} />
          )}

          {activeTab === "leadership" && (
            <LeadershipEditor leadership={leadership} onUpdate={setLeadership} />
          )}

          {activeTab === "social" && (
            <SocialEditor socialLinks={socialLinks} onUpdate={setSocialLinks} />
          )}

          {activeTab === "resume" && (
            <ResumeEditor resumeUrl={resumeUrl} onUpdate={setResumeUrl} />
          )}

          {activeTab === "media" && (
            <MediaManager />
          )}
        </main>
      </div>

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