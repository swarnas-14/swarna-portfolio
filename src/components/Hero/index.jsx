import { useRef, useState, useEffect, Suspense, Component } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import { ArrowDown, FileText, ChevronRight } from "lucide-react"
import * as THREE from "three"

// ── Error Boundary ──────────────────────────────────────────────────────────
class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return (
      <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">
        <div className="text-center">
          <div className="text-4xl mb-2">⬡</div>
          <p>3D unavailable</p>
        </div>
      </div>
    )
    return this.props.children
  }
}

// ── Tech Node Labels ─────────────────────────────────────────────────────────
const TECH_NODES = [
  { label: "Java",      pos: [1.8, 0.5, 0],    color: "#f89820" },
  { label: "Python",    pos: [-1.6, 1.0, 0.5],  color: "#3776ab" },
  { label: "Spring",    pos: [0.8, 1.8, -0.5],  color: "#6db33f" },
  { label: "MySQL",     pos: [-0.9, -1.5, 0.3], color: "#4479a1" },
  { label: "MongoDB",   pos: [2.0, -0.8, 0.2],  color: "#47a248" },
  { label: "Redis",     pos: [-2.1, 0.1, -0.4], color: "#dc382d" },
  { label: "Docker",    pos: [0.3, -2.0, 0.6],  color: "#2496ed" },
  { label: "Kafka",     pos: [1.2, -1.2, -0.8], color: "#a78bfa" },
  { label: "React",     pos: [-1.3, -0.8, 1.0], color: "#61dafb" },
  { label: "Git",       pos: [-0.4, 2.0, -0.3], color: "#f05032" },
  { label: "AI/ML",     pos: [1.5, 1.2, 0.9],   color: "#34d399" },
  { label: "REST",      pos: [-1.8, 1.5, -0.6], color: "#22d3ee" },
  { label: "NumPy",     pos: [0.6, -1.6, -1.0], color: "#013243" },
  { label: "Pandas",    pos: [-0.7, 0.9, 1.5],  color: "#150458" },
  { label: "DSA",       pos: [2.2, 0.2, -0.7],  color: "#6366f1" },
  { label: "Security",  pos: [-2.0, -1.2, 0.8], color: "#f472b6" },
  { label: "Hibernate", pos: [1.0, 0.0, -1.8],  color: "#59666c" },
  { label: "JS",        pos: [-0.2, -0.5, 2.0], color: "#f7df1e" },
  { label: "Swagger",   pos: [1.8, -1.8, 0.5],  color: "#85ea2d" },
  { label: "Cloud",     pos: [-1.5, -0.2, -1.5],color: "#60a5fa" },
]

const CONNECTIONS = [
  [0,2],[0,3],[0,14],[0,16],[1,10],[1,12],[1,13],[2,3],[2,16],[3,4],
  [4,5],[5,8],[6,7],[7,14],[8,11],[9,0],[10,12],[11,1],[15,5],[17,8]
]

function Node({ position, color, label }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3
      mesh.current.rotation.y = state.clock.elapsedTime * 0.4
      const s = hovered ? 1.5 : 1
      mesh.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1)
    }
  })
  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.5 : 0.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

function ConnectionLine({ from, to }) {
  const ref = useRef()
  const start = new THREE.Vector3(...from)
  const end = new THREE.Vector3(...to)
  const points = [start, end]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#1e1e4e" transparent opacity={0.5} />
    </line>
  )
}

function Particles() {
  const ref = useRef()
  const count = 200
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#6366f1" transparent opacity={0.6} />
    </points>
  )
}

function SceneCamera({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

function NodeNetwork({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#22d3ee" intensity={1.5} />
      <SceneCamera mouse={mouse} />
      <Particles />
      {TECH_NODES.map((node, i) => (
        <Node key={i} position={node.pos} color={node.color} label={node.label} />
      ))}
      {CONNECTIONS.map(([a, b], i) => (
        <ConnectionLine key={i} from={TECH_NODES[a].pos} to={TECH_NODES[b].pos} />
      ))}
    </>
  )
}

// ── Animation Variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// ── Hero Component ───────────────────────────────────────────────────────────
export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="home" className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-8 blur-3xl" style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* ─ Left: Text ─ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Internships · India
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1 className="font-display font-black leading-none tracking-tighter" style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}>
              <span className="block text-text-primary">VINAY</span>
              <span className="block gradient-text">SHARMA</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={item} className="text-text-muted font-mono text-sm tracking-widest uppercase">
            B.Tech Computer Science & Engineering · 5th Semester
          </motion.p>

          {/* Tagline */}
          <motion.p variants={item} className="text-text-secondary text-xl leading-relaxed max-w-lg">
            I build <span className="text-text-primary font-medium">scalable software</span>, intelligent systems, and{" "}
            <span className="text-text-primary font-medium">interactive digital experiences</span>.
          </motion.p>

          {/* Bio */}
          <motion.p variants={item} className="text-text-muted text-base leading-relaxed max-w-lg">
            Computer Science undergraduate focused on software development, backend engineering, problem solving,
            and emerging technologies. I continuously learn, build projects, participate in hackathons, and turn
            ideas into practical systems.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <button onClick={scrollToProjects} className="btn-primary" data-cursor="EXPLORE">
              Explore My Work <ArrowDown size={16} />
            </button>
            <a href="[ADD RESUME URL]" target="_blank" rel="noopener noreferrer" className="btn-secondary" data-cursor="RESUME">
              <FileText size={16} /> View Resume
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-6 pt-2">
            {[
              { value: "100+", label: "LeetCode" },
              { value: "[X]", label: "Projects" },
              { value: "[X]", label: "Hackathons" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-8 bg-border" />}
                <div>
                  <div className="font-display font-bold text-text-primary text-lg gradient-text">{stat.value}</div>
                  <div className="text-text-muted text-xs uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ─ Right: 3D Scene ─ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          className="relative w-full aspect-square lg:aspect-auto lg:h-[600px]"
        >
          <CanvasErrorBoundary>
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 5], fov: 60 }}
              style={{ background: "transparent" }}
            >
              <Suspense fallback={null}>
                <NodeNetwork mouse={mouse} />
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>

          {/* Decorative ring */}
          <div
            className="absolute inset-4 rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(99,102,241,0.1)", animation: "spin 30s linear infinite" }}
          />
          <div
            className="absolute inset-12 rounded-full pointer-events-none"
            style={{ border: "1px dashed rgba(34,211,238,0.08)", animation: "spin 20s linear infinite reverse" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-text-muted text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(99,102,241,0.4)" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "#6366f1" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
