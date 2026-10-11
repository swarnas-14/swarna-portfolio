import { Mail, ArrowUp } from "lucide-react"
import { Github, Linkedin } from "../ui/Icons"
import { socialLinks } from "../../data/social"

const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const githubHref = (socialLinks.github && !socialLinks.github.includes("[ADD GITHUB"))
    ? socialLinks.github
    : "https://github.com"

  const linkedinHref = (socialLinks.linkedin && !socialLinks.linkedin.includes("[ADD LINKEDIN"))
    ? socialLinks.linkedin
    : "https://linkedin.com"

  const emailHref = (socialLinks.email && !socialLinks.email.includes("[ADD EMAIL"))
    ? `mailto:${socialLinks.email}`
    : "mailto:swarna.sahu@example.com"

  const socials = [
    { icon: Github, label: "GitHub", href: githubHref },
    { icon: Linkedin, label: "LinkedIn", href: linkedinHref },
    { icon: Mail, label: "Email", href: emailHref },
  ]

  return (
    <footer style={{ background: "#FAFAFA", borderTop: "1px solid #D4D4D4" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white shadow-md shadow-accent-indigo/20"
                style={{ background: "linear-gradient(135deg, #0866E8, #7434C5)" }}
              >
                SS
              </div>
              <span className="font-display font-bold text-text-primary text-lg">Swarna Sahu</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              B.Tech CSE | Software Developer | Builder | Learner
            </p>
            <p className="text-text-secondary text-xs mt-3">
              Building elegant software, solving real problems, and continuously growing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary text-sm font-semibold mb-5 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-text-secondary text-sm hover:text-accent-indigo transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-text-primary text-sm font-semibold mb-5 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={label.toUpperCase()}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-secondary transition-all duration-200 hover:text-accent-indigo hover:border-accent-indigo/40"
                  style={{ border: "1px solid #D4D4D4" }}
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-text-secondary text-xs">
              Open to internships, collaborations, and interesting conversations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid #D4D4D4" }}
        >
          <p className="text-text-muted text-sm">
            © 2026 Swarna Sahu. Built with passion and code.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-text-muted hover:text-accent-indigo transition-colors"
            style={{ border: "1px solid #D4D4D4" }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}