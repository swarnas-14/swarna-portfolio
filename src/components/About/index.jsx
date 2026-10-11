import { motion } from "framer-motion"
import { Code2, Brain, Cpu, Trophy, BookOpen, Rocket } from "lucide-react"
import SectionHeader from "../ui/SectionHeader"
import { aboutStats } from "../../data/aboutStats"
import GlowCard from "../ui/GlowCard"

const interests = [
  {
    icon: Code2,
    title: "Backend Development",
    desc: "Architecting resilient APIs, microservices, and database layers with Java & Spring Boot.",
    color: "#0866E8"
  },
  {
    icon: Brain,
    title: "Problem Solving & DSA",
    desc: "Refining algorithmic thinking and efficiency through continuous competitive coding on LeetCode.",
    color: "#18C5E8"
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    desc: "Exploring data analytics, numerical computation, and machine learning models in Python.",
    color: "#7434C5"
  },
  {
    icon: Trophy,
    title: "Hackathons & Innovation",
    desc: "Building high-impact, real-world solutions under tight timeframes in collaborative environments.",
    color: "#10B981"
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Staying curious with cutting-edge tools, system architecture patterns, and emerging technologies.",
    color: "#0866E8"
  },
  {
    icon: Rocket,
    title: "Product-Oriented Mindset",
    desc: "Transforming engineering requirements into scalable, practical, end-user-ready applications.",
    color: "#D96CE8"
  }
]

export default function About() {
  const stats = aboutStats
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Who I Am"
          title={"Engineering Software with\nPurpose and Precision"}
          subtitle="A passionate Computer Science student turning core principles into robust applications."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Bio & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-text-secondary leading-relaxed text-base md:text-lg"
            >
              <p>
                I am a 5th-semester <span className="text-text-primary font-semibold">B.Tech Computer Science & Engineering</span> student
                in India with a strong focus on software engineering, server-side development, and applied intelligent systems.
              </p>
              <p>
                My journey centers around developing scalable backends, mastering data structures & algorithms, and bridging practical software engineering with data-driven AI capabilities.
                I approach every challenge with an analytical mindset — whether it's optimizing database queries, architecting distributed workflows, or engineering offline-capable systems for national hackathons.
              </p>
            </motion.div>

            {/* Interest cards grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {interests.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="h-full"
                  >
                    <GlowCard
                      className="card-base p-5 h-full group relative overflow-hidden"
                      glowColor={`${item.color}25`}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display font-semibold text-text-primary text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </GlowCard>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl relative overflow-hidden border border-border glow-indigo"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <span className="font-mono text-xs text-accent-indigo uppercase tracking-widest font-semibold">
                  Key Metrics
                </span>
                <span className="text-xs text-text-muted font-mono">Real Track Record</span>
              </div>

              <div className="space-y-6">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div>
                      <div className="text-text-primary font-medium text-sm group-hover:text-accent-cyan transition-colors">
                        {stat.label}
                      </div>
                      <div className="text-text-muted text-xs">{stat.sub}</div>
                    </div>
                    <div className="font-display font-bold text-2xl md:text-3xl gradient-text">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 text-xs text-text-muted text-center font-mono">
                Verified data point placeholders ready for update
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
