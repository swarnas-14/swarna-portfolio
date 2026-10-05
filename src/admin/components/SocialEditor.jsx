import { Mail, Globe } from "lucide-react"
import { Github, Linkedin } from "../../components/ui/Icons"

export default function SocialEditor({ socialLinks, onUpdate }) {
  const update = (key, val) => onUpdate({ ...socialLinks, [key]: val })

  return (
    <div className="p-8 rounded-2xl bg-[#0d0d14] border border-[#1e1e2e] space-y-6">
      <div className="pb-4 border-b border-[#1e1e2e]">
        <h2 className="font-display font-bold text-xl text-white">Social & Professional Channels</h2>
        <p className="text-xs text-text-muted mt-0.5">Manage external links for navbar, footer, contact form, and profile references.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5 flex items-center gap-1.5">
            <Mail size={13} className="text-accent-indigo" /> Email Address
          </label>
          <input
            type="email"
            value={socialLinks.email || ""}
            onChange={e => update("email", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5 flex items-center gap-1.5">
            <Github size={13} className="text-accent-cyan" /> GitHub Profile URL
          </label>
          <input
            type="text"
            value={socialLinks.github || ""}
            onChange={e => update("github", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5 flex items-center gap-1.5">
            <Linkedin size={13} className="text-accent-purple" /> LinkedIn Profile URL
          </label>
          <input
            type="text"
            value={socialLinks.linkedin || ""}
            onChange={e => update("linkedin", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-text-muted uppercase mb-1.5 flex items-center gap-1.5">
            <Globe size={13} className="text-emerald-400" /> LeetCode Profile URL
          </label>
          <input
            type="text"
            value={socialLinks.leetcode || ""}
            onChange={e => update("leetcode", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#12121c] border border-[#1e1e2e] text-xs text-white focus:outline-none focus:border-accent-indigo"
          />
        </div>
      </div>
    </div>
  )
}