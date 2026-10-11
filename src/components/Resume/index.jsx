import { motion } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import { FileText, Download, ExternalLink, GraduationCap, Briefcase, Code, Award } from "lucide-react"
import { profile } from "../../data/profile"
import { isRealValue } from "../../utils/hasContent"

const resumeUrl = isRealValue(profile.resumeUrl) ? profile.resumeUrl : null

export default function Resume() {
  return (
    <section id="resume" className="section-padding relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Credentials & CV"
          title={"Curriculum Vitae &\nProfessional Resume"}
          subtitle="Comprehensive summary of academics, core competencies, and practical engineering endeavors."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 sm:p-12 rounded-3xl border border-border glow-indigo relative overflow-hidden mt-12"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-border">
            <div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary">
                Swarna Sahu
              </h3>
              <p className="text-text-secondary text-sm mt-1">
                B.Tech Computer Science & Engineering · India
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {resumeUrl ? (
                <>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs flex items-center gap-2"
                  >
                    <Download size={14} /> Download PDF
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs flex items-center gap-2"
                  >
                    <ExternalLink size={14} /> View Fullscreen
                  </a>
                </>
              ) : (
                <span className="text-xs text-text-muted font-mono px-3 py-1.5 rounded-lg border border-border bg-bg-card">
                  Resume link not yet configured
                </span>
              )}
            </div>
          </div>

          {/* Key CV Sections Breakdown */}
          <div className="grid sm:grid-cols-2 gap-8 my-8">
            {/* Education */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-accent-indigo font-display font-semibold text-sm">
                <GraduationCap size={16} /> Education
              </div>
              <div className="card-base p-4 border-border/60">
                <div className="font-display font-bold text-text-primary text-sm">
                  B.Tech in Computer Science & Engineering
                </div>
                <div className="text-xs text-text-secondary font-medium mt-0.5">5th Semester · India</div>
                <div className="text-xs text-text-secondary mt-2">
                  Focus: Software Architecture, Algorithms, Database Systems, Computer Networks & AI.
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-accent-purple font-display font-semibold text-sm">
                <Code size={16} /> Core Technical Pillars
              </div>
              <div className="card-base p-4 border-border/60">
                <div className="font-display font-bold text-text-primary text-sm">
                  Backend & Distributed Computing
                </div>
                <div className="text-xs text-text-secondary font-medium mt-0.5">Java · Spring Boot · MySQL · Redis</div>
                <div className="text-xs text-text-secondary mt-2">
                  REST APIs, microservice patterns, relational modeling, and caching architectures.
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted font-mono">
            <span>{resumeUrl ? profile.college || "Resume Available" : "Add resume URL in the Admin Panel → Profile section"}</span>
            <span className="text-accent-indigo">Updated for 2026 Opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
