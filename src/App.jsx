import CustomCursor from "./components/ui/CustomCursor"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Journey from "./components/Journey"
import TechStack from "./components/TechStack"
import Projects from "./components/Projects"
import Hackathons from "./components/Hackathons"
import Achievements from "./components/Achievements"
import Certifications from "./components/Certifications"
import DSA from "./components/DSA"
import Learning from "./components/Learning"
import Resume from "./components/Resume"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-indigo/30 selection:text-white">
      {/* Custom dynamic interactive cursor */}
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
        <Hackathons />
        <Achievements />
        <Certifications />
        <DSA />
        <Learning />
        <Resume />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
