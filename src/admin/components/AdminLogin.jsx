import { useState } from "react"
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Eye, EyeOff } from "lucide-react"

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Configurable local development credentials from Vite environment variables
  const configuredEmail = (import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com").toLowerCase().trim()
  const configuredPassword = (import.meta.env.VITE_ADMIN_PASSWORD || "YOUR_LOCAL_ADMIN_PASSWORD").trim()

  // Convenience fallback if user tests with default developer credentials
  const isDefaultDevAllowed = (enteredEmail, enteredPass) => {
    const e = enteredEmail.toLowerCase().trim()
    const p = enteredPass.trim()
    return (
      (e === configuredEmail && p === configuredPassword) ||
      (e === "admin@example.com" && p === "YOUR_LOCAL_ADMIN_PASSWORD") ||
      (e === "admin@vinay.dev" && p === "admin123")
    )
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    setTimeout(() => {
      if (isDefaultDevAllowed(email, password)) {
        sessionStorage.setItem("vinay_admin_authenticated", "true")
        onLoginSuccess()
      } else {
        setErrorMessage("Invalid email or password.")
      }
      setIsSubmitting(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#050508] text-[#f1f5f9] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-indigo/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent-indigo to-accent-cyan text-white font-display font-black text-xl shadow-lg shadow-accent-indigo/25 mb-4">
            VS
          </div>
          <h1 className="font-display font-bold text-2xl text-white tracking-tight">
            Portfolio Studio
          </h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Local Development Management Console
          </p>
        </div>

        {/* Login Card */}
        <div className="glass p-8 rounded-3xl border border-[#1e1e2e] shadow-2xl relative">
          {/* Security Gate Notice */}
          <div className="p-3.5 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
            <Shield size={16} className="shrink-0 mt-0.5 text-amber-400" />
            <div className="leading-relaxed">
              <strong className="font-semibold block text-amber-200">Local Access Gate</strong>
              This console is restricted to local development only. Authentication acts as a local convenience gate and is never deployed to production.
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0d14] border border-[#1e1e2e] text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono uppercase text-text-muted mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#0d0d14] border border-[#1e1e2e] text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Unlock Admin Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>


        </div>

        {/* Exit back to public portfolio */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-text-muted hover:text-accent-indigo transition-colors"
          >
            ← Return to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
