import { useState, useEffect, lazy, Suspense } from "react"
import Lenis from "lenis"
import CustomCursor from "./components/ui/CustomCursor"
import Loader from "./components/ui/Loader"
import GlobalParticleField from "./components/ui/GlobalParticleField"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Journey from "./components/Journey"
import TechStack from "./components/TechStack"
import Projects from "./components/Projects"
import Certifications from "./components/Certifications"
import DSA from "./components/DSA"
import Learning from "./components/Learning"
import Resume from "./components/Resume"
import Hackathons from "./components/Hackathons"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { ShieldAlert, ArrowLeft, Loader2 } from "lucide-react"

// Lazy-load AdminApp so it is completely excluded from the public portfolio bundle
const AdminApp = lazy(() => import("./admin/AdminApp"))

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname)
    window.addEventListener("popstate", handleLocationChange)
    return () => window.removeEventListener("popstate", handleLocationChange)
  }, [])

  // Kinetic Smooth Scroll Animation (Lenis) with mathematical inertia decay formula
  useEffect(() => {
    if (currentPath.startsWith("/admin")) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [currentPath])

  const isAdminRoute = currentPath.startsWith("/admin")
  const isLocalEnvironment =
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"

  // ── Admin Route Handling ──────────────────────────────────────────
  if (isAdminRoute) {
    // If accessed on a public production deployment, block access to keep local tooling secure
    if (!isLocalEnvironment) {
      return (
        <div className="min-h-screen bg-[#050508] text-[#f1f5f9] flex items-center justify-center p-6 text-center">
          <div className="glass p-10 rounded-3xl border border-[#1e1e2e] max-w-md w-full space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <ShieldAlert size={24} />
            </div>
            <h1 className="font-display font-bold text-2xl text-white">404 — Access Restricted</h1>
            <p className="text-text-muted text-xs leading-relaxed">
              Portfolio Studio is an isolated local-only development tool. It is not accessible on the public production website.
            </p>
            <div className="pt-2">
              <a
                href="/"
                className="btn-primary text-xs inline-flex items-center gap-2 py-2 px-5"
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      )
    }

    // In local development, render lazy-loaded Admin Console
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#08080c] text-white flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-accent-indigo" size={32} />
            <span className="text-xs font-mono text-text-muted">Loading Portfolio Studio...</span>
          </div>
        }
      >
        <AdminApp />
      </Suspense>
    )
  }

  // ── Public Portfolio ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-indigo/20 selection:text-text-primary relative">
      {/* Cinematic Kernel Bootloader Sequence */}
      <Loader />

      {/* Global 3D Particle Field Background */}
      <GlobalParticleField />

      {/* Custom dynamic interactive spring cursor */}
      <CustomCursor />

      {/* Persistent glass navigation */}
      <Navbar />

      {/* Main flow */}
      <main className="relative z-10 overflow-hidden">
        <Hero />
        <About />
        <Journey />
        <TechStack />
        <Projects />
        <Certifications />
        <DSA />
        <Learning />
        <Resume />
        <Hackathons />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
