import { motion } from "framer-motion"
import SectionHeader from "../ui/SectionHeader"
import { Code2, ExternalLink, CheckCircle2, Flame, ArrowUpRight, Cpu } from "lucide-react"
import { dsaStats } from "../../data/dsa"

const dsaTopics = [
  { name: "Arrays & Strings", status: "Active Practice", count: "30+" },
  { name: "Hash Maps & Sets", status: "Active Practice", count: "15+" },
  { name: "Two Pointers & Sliding Window", status: "Active Practice", count: "15+" },
  { name: "Linked Lists", status: "Mastered", count: "10+" },
  { name: "Stacks & Queues", status: "Mastered", count: "10+" },
  { name: "Binary Trees & BST", status: "Active Practice", count: "15+" },
  { name: "Graphs (BFS / DFS)", status: "In Progress", count: "8+" },
  { name: "Dynamic Programming", status: "In Progress", count: "10+" },
  { name: "Recursion & Backtracking", status: "Active Practice", count: "10+" },
  { name: "Binary Search", status: "Mastered", count: "12+" },
  { name: "Bit Manipulation", status: "In Progress", count: "5+" },
  { name: "Greedy Algorithms", status: "In Progress", count: "8+" }
]

export default function DSA() {
  return (
    <section id="dsa" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Algorithmic Prowess"
          title={"Data Structures &\nProblem Solving"}
          subtitle="Systematic practice on LeetCode sharpening analytical complexity and problem reduction."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start mt-12">
          {/* LeetCode Scorecard */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl border border-border glow-indigo relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Flame size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-text-primary">LeetCode Profile</h3>
                    <div className="text-xs text-text-muted font-mono">Continuous Problem Solving</div>
                  </div>
                </div>
                <span className="badge">Verified</span>
              </div>

              <div className="my-8 text-center">
                <div className="font-display font-black text-6xl gradient-text mb-2">
                  {dsaStats.solvedCount || "100+"}
                </div>
                <div className="text-text-secondary text-sm font-medium">
                  Problems Solved & Analyzed
                </div>
                <div className="text-text-muted text-xs mt-1">
                  Focusing on optimal Time (O(n), O(log n)) and Space complexities
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center text-xs text-text-secondary">
                  <span>Target Competency</span>
                  <span className="text-accent-cyan font-mono">SDE Problem Solving</span>
                </div>
                <div className="flex justify-between items-center text-xs text-text-secondary">
                  <span>Languages Used</span>
                  <span className="text-text-primary font-mono font-medium">Java · Python</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <a
                  href={dsaStats.profileUrl && dsaStats.profileUrl !== "[ADD LEETCODE URL]" ? dsaStats.profileUrl : "https://leetcode.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-xs flex items-center justify-center gap-2"
                >
                  Visit LeetCode Profile <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* DSA Topic Mastery Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-3.5">
              {dsaTopics.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="card-base p-4 flex items-center justify-between group hover:border-accent-indigo/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent-indigo group-hover:bg-accent-cyan transition-colors" />
                    <div>
                      <div className="font-display font-semibold text-xs text-text-primary group-hover:text-accent-indigo transition-colors">
                        {topic.name}
                      </div>
                      <div className="text-[11px] text-text-secondary">
                        {topic.status}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-bg-secondary text-text-secondary font-medium border border-border">
                    {topic.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
