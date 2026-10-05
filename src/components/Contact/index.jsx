import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import SectionHeader from "../ui/SectionHeader"
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react"
import { Github, Linkedin } from "../ui/Icons"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject}`)
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    )
    window.location.href = `mailto:[ADD EMAIL]?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 6000)
    reset()
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Initiate Contact"
          title={"Let's Build Something\nExceptional"}
          subtitle="Open for internships, hackathon collaborations, and serious software engineering opportunities."
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
              <a
                href="mailto:[ADD EMAIL]"
                className="card-base p-4 flex items-center gap-4 group hover:border-accent-indigo/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-accent-indigo group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase tracking-wider">Direct Email</div>
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                    [ADD EMAIL]
                  </div>
                </div>
              </a>

              <a
                href="[ADD GITHUB URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-4 flex items-center gap-4 group hover:border-accent-indigo/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase tracking-wider">GitHub Profile</div>
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                    [ADD GITHUB URL]
                  </div>
                </div>
              </a>

              <a
                href="[ADD LINKEDIN URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-4 flex items-center gap-4 group hover:border-accent-indigo/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase tracking-wider">LinkedIn Network</div>
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                    [ADD LINKEDIN URL]
                  </div>
                </div>
              </a>

              <div className="card-base p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-emerald-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase tracking-wider">Location</div>
                  <div className="text-sm font-medium text-text-primary">India</div>
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
              className="glass p-8 sm:p-10 rounded-3xl border border-border glow-indigo space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Turing"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo transition-all"
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-400 mt-1 block">{errors.name.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo transition-all"
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-400 mt-1 block">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="Internship opportunity / Hackathon inquiry"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo transition-all"
                />
                {errors.subject && (
                  <span className="text-xs text-rose-400 mt-1 block">{errors.subject.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                  Detailed Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Share details about the role, project architecture, or collaboration..."
                  {...register("message", { required: "Message is required", minLength: { value: 15, message: "Please provide a bit more detail (min 15 chars)" } })}
                  className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo transition-all resize-none"
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 mt-1 block">{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
              >
                Send Direct Message <Send size={16} />
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs"
                >
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>Preparing your email client with your message payload. Thank you!</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}