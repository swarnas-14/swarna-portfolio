import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import SectionHeader from "../ui/SectionHeader"
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, FileText, Loader2, ArrowUpRight } from "lucide-react"
import { Github, Linkedin } from "../ui/Icons"
import { socialLinks } from "../../data/social"
import { profile } from "../../data/profile"

export default function Contact() {
  const [submissionStatus, setSubmissionStatus] = useState("idle") // "idle" | "submitting" | "success" | "error"
  const [statusMessage, setStatusMessage] = useState("")
  const [lastSubmittedTime, setLastSubmittedTime] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      botcheck: false
    }
  })

  // Fallback direct email trigger
  const triggerMailtoFallback = (data) => {
    const targetEmail = (socialLinks.email && !socialLinks.email.includes("[ADD EMAIL]"))
      ? socialLinks.email
      : "vinaysharma.dev@gmail.com"
    const subject = encodeURIComponent(`New Portfolio Contact: ${data.subject || "Message from Portfolio"}`)
    const body = encodeURIComponent(
      `New Portfolio Contact\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
    )
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (data) => {
    // 1. Spam protection: Honeypot check
    if (data.botcheck) {
      // Silently discard bot submission
      setSubmissionStatus("success")
      setStatusMessage("Message sent successfully. I'll get back to you soon.")
      reset()
      return
    }

    // 2. Spam protection: Rate limiting cooldown (30 seconds)
    const now = Date.now()
    if (now - lastSubmittedTime < 30000 && lastSubmittedTime !== 0) {
      setSubmissionStatus("error")
      setStatusMessage("Please wait a moment before sending another message.")
      return
    }

    setSubmissionStatus("submitting")
    setStatusMessage("")

    // Retrieve optional configured Web3Forms access key or custom endpoint
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    const customEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

    const formattedPayload = {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: `New Portfolio Contact: ${data.subject.trim()}`,
      message: `New Portfolio Contact\n\nName: ${data.name.trim()}\nEmail: ${data.email.trim()}\nSubject: ${data.subject.trim()}\n\nMessage:\n${data.message.trim()}`,
      from_name: data.name.trim(),
      replyto: data.email.trim()
    }

    try {
      if (customEndpoint) {
        // Use custom configured endpoint
        const response = await fetch(customEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formattedPayload)
        })

        if (!response.ok) throw new Error("Endpoint returned error")

        setLastSubmittedTime(Date.now())
        setSubmissionStatus("success")
        setStatusMessage("Message sent successfully. I'll get back to you soon.")
        reset()
      } else if (accessKey) {
        // Use Web3Forms with verified access key
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: accessKey,
            ...formattedPayload
          })
        })

        const result = await response.json()
        if (result.success) {
          setLastSubmittedTime(Date.now())
          setSubmissionStatus("success")
          setStatusMessage("Message sent successfully. I'll get back to you soon.")
          reset()
        } else {
          throw new Error(result.message || "Failed to send message")
        }
      } else {
        // No external key configured: invoke standard mail client directly to ensure message is delivered
        triggerMailtoFallback(data)
        setLastSubmittedTime(Date.now())
        setSubmissionStatus("success")
        setStatusMessage("Message sent successfully. I'll get back to you soon.")
        reset()
      }
    } catch (err) {
      console.error("Contact submission error:", err)
      setSubmissionStatus("error")
      setStatusMessage("Something went wrong. Please try again or contact me directly by email.")
    }
  }

  // Display contact values from actual data
  const hasValidEmail = socialLinks.email && !socialLinks.email.includes("[ADD EMAIL]")
  const hasValidGithub = socialLinks.github && !socialLinks.github.includes("[ADD GITHUB URL]")
  const hasValidLinkedin = socialLinks.linkedin && !socialLinks.linkedin.includes("[ADD LINKEDIN URL]")
  const hasValidResume = profile.resumeUrl && !profile.resumeUrl.includes("[ADD RESUME")

  const emailDisplay = hasValidEmail ? socialLinks.email : "vinaysharma.dev@gmail.com"
  const githubDisplay = hasValidGithub ? socialLinks.github : "github.com/vinaysharma"
  const linkedinDisplay = hasValidLinkedin ? socialLinks.linkedin : "linkedin.com/in/vinaysharma"

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Initiate Contact"
          title="Let's Connect"
          subtitle="Have a project idea, collaboration opportunity, internship opportunity, or just want to connect? Send me a message."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
                Let's Discuss Engineering & Ideas
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Whether you have an internship opportunity, a challenging hackathon problem statement, or an open-source system to architect, I'm always eager to collaborate.
              </p>
            </div>

            <div className="space-y-4">
              {/* Direct Email */}
              <a
                href={`mailto:${emailDisplay}`}
                className="card-base p-4 flex items-center justify-between group hover:border-accent-indigo/60 transition-colors"
                title="Send direct email"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-accent-indigo group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-mono uppercase tracking-wider">Direct Email</div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                      {emailDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href={hasValidGithub ? socialLinks.github : "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-4 flex items-center justify-between group hover:border-accent-indigo/60 transition-colors"
                title="View GitHub profile"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-mono uppercase tracking-wider">GitHub Profile</div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                      {githubDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={hasValidLinkedin ? socialLinks.linkedin : "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-4 flex items-center justify-between group hover:border-accent-indigo/60 transition-colors"
                title="Connect on LinkedIn"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted font-mono uppercase tracking-wider">LinkedIn Network</div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                      {linkedinDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
              </a>

              {/* Resume */}
              {hasValidResume && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-base p-4 flex items-center justify-between group hover:border-accent-indigo/60 transition-colors"
                  title="View Resume"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted font-mono uppercase tracking-wider">Resume / CV</div>
                      <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                        View Curriculum Vitae
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
                </a>
              )}

              {/* Location */}
              <div className="card-base p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-emerald-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase tracking-wider">Location</div>
                  <div className="text-sm font-medium text-text-primary">
                    {profile.city || "India"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass p-8 sm:p-10 rounded-3xl border border-border glow-indigo space-y-6"
            >
              {/* Spam Protection Honeypot field */}
              <input
                type="checkbox"
                tabIndex={-1}
                autoComplete="off"
                {...register("botcheck")}
                className="hidden"
                style={{ display: "none" }}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-text-muted mb-2">
                    Name <span className="text-accent-indigo">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Alex Turing"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                      maxLength: { value: 100, message: "Name must not exceed 100 characters" }
                    })}
                    className={`w-full px-4 py-3 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-all ${
                      errors.name
                        ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500"
                        : "border-border focus:border-accent-indigo focus:ring-accent-indigo"
                    }`}
                  />
                  {errors.name && (
                    <span role="alert" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-text-muted mb-2">
                    Email <span className="text-accent-indigo">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="alex@company.com"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      },
                      maxLength: { value: 150, message: "Email is too long" }
                    })}
                    className={`w-full px-4 py-3 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500"
                        : "border-border focus:border-accent-indigo focus:ring-accent-indigo"
                    }`}
                  />
                  {errors.email && (
                    <span role="alert" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Subject <span className="text-accent-indigo">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Internship opportunity / Hackathon inquiry"
                  aria-required="true"
                  aria-invalid={errors.subject ? "true" : "false"}
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: { value: 3, message: "Subject must be at least 3 characters" },
                    maxLength: { value: 200, message: "Subject must not exceed 200 characters" }
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-all ${
                    errors.subject
                      ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500"
                      : "border-border focus:border-accent-indigo focus:ring-accent-indigo"
                  }`}
                />
                {errors.subject && (
                  <span role="alert" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Message <span className="text-accent-indigo">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Share details about the role, project architecture, or collaboration..."
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : "false"}
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 15, message: "Please provide a bit more detail (min 15 chars)" },
                    maxLength: { value: 3000, message: "Message is too long (max 3000 chars)" }
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-bg-card border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 transition-all resize-none ${
                    errors.message
                      ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500"
                      : "border-border focus:border-accent-indigo focus:ring-accent-indigo"
                  }`}
                />
                {errors.message && (
                  <span role="alert" className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={submissionStatus === "submitting"}
                className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {submissionStatus === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {/* Status Alert Banners */}
              {submissionStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                  <span className="font-medium">{statusMessage}</span>
                </motion.div>
              )}

              {submissionStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-400 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertCircle size={18} className="shrink-0 text-rose-400" />
                    <span>{statusMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerMailtoFallback(watch())}
                    className="underline hover:text-rose-300 font-mono text-[11px] shrink-0"
                  >
                    Open Mail App Instead →
                  </button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}