import { motion } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import { Server, Cpu, BrainCircuit, Sparkles, ArrowRight } from "lucide-react"

const tracks = [
  {
    icon: Server,
    title: "Advanced Backend & Distributed Systems",
    color: "#6366f1",
    status: "Active Exploration",
    topics: [
      "Microservices Architecture & API Gateway patterns",
      "Spring Security OAuth2 / JWT authentication flows",
      "Event-Driven Architecture with Apache Kafka",
      "Redis Distributed Caching & Rate Limiting strategies"
    ]
  },
  {
    icon: Cpu,
    title: "Applied AI & Intelligent Workflows",
    color: "#22d3ee",
    status: "In Progress",
    topics: [
      "Multimodal Satellite Image Retrieval & Vector Embeddings",
      "Semantic Search & NLP-based Data Querying",
      "Deep Learning Pipelines with PyTorch & Scikit-Learn",
      "Automated Feature Extraction & Geospatial Provenance"
    ]
  },
  {
    icon: BrainCircuit,
    title: "System Design & Competitive DSA",
    color: "#a78bfa",
    status: "Continuous Growth",
    topics: [
      "Low-Level & High-Level Object-Oriented System Design",
      "Advanced Dynamic Programming on Trees & Graphs",
      "Database Partitioning, Sharding & Read-Replicas",
      "Concurrency & Thread Safety in Java"
    ]
  }
]

export default function Learning() {
  return (
    <section id="learning" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Continuous Evolution"
          title={"Currently Exploring &\nDeepening Mastery"}
          subtitle="Engineering is a craft of perpetual learning. Here are the paradigms I am actively investigating."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {tracks.map((track, i) => {
            const Icon = track.icon
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-base p-6 flex flex-col justify-between group hover:border-accent-indigo/50 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${track.color}15`, color: track.color, border: `1px solid ${track.color}30` }}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {track.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-text-primary mb-4 group-hover:text-accent-cyan transition-colors">
                    {track.title}
                  </h3>

                  <ul className="space-y-3">
                    {track.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo mt-1.5 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-text-muted font-mono">
                  <span>Target: SDE Ready</span>
                  <span className="text-accent-indigo flex items-center gap-1">
                    5th Sem Focus <Sparkles size={12} />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
