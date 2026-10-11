import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Development-only local admin middleware to save file edits and uploaded images
function localAdminDevPlugin() {
  return {
    name: "local-admin-dev-plugin",
    apply: "serve", // Only active in dev mode, never in production builds
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Batch files saving endpoint for instant single-trip save
        if (req.url === "/__admin_api/save_all" && req.method === "POST") {
          let body = ""
          req.on("data", chunk => { body += chunk })
          req.on("end", () => {
            try {
              const { files } = JSON.parse(body)
              const savedFiles = []
              if (Array.isArray(files)) {
                for (const item of files) {
                  if (item.filename && item.content !== undefined) {
                    const filePath = path.resolve(__dirname, "src/data", item.filename)
                    fs.writeFileSync(filePath, item.content, "utf8")
                    savedFiles.push(item.filename)
                  }
                }
              }
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: true, count: savedFiles.length, files: savedFiles }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
          return
        }

        // Direct local file saving endpoint (Development localhost only)
        if (req.url === "/__admin_api/save_file" && req.method === "POST") {
          let body = ""
          req.on("data", chunk => { body += chunk })
          req.on("end", () => {
            try {
              const { filename, content } = JSON.parse(body)
              const filePath = path.resolve(__dirname, "src/data", filename)
              fs.writeFileSync(filePath, content, "utf8")
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: true, path: filePath }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
          return
        }

        // Direct image upload endpoint for local dev
        if (req.url === "/__admin_api/save_image" && req.method === "POST") {
          let body = ""
          req.on("data", chunk => { body += chunk })
          req.on("end", () => {
            try {
              const { folder, filename, base64Data } = JSON.parse(body)
              const targetDir = path.resolve(__dirname, "public/images", folder || "hackathons")
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true })
              }
              const targetPath = path.join(targetDir, filename)
              const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, "")
              fs.writeFileSync(targetPath, Buffer.from(base64Clean, "base64"))
              const publicUrl = `/images/${folder || "hackathons"}/${filename}`
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ success: true, url: publicUrl }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
          return
        }

        next()
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const accessKey = env.WEB3FORMS_ACCESS_KEY || env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY || ""

  return {
    define: {
      "import.meta.env.WEB3FORMS_ACCESS_KEY": JSON.stringify(accessKey),
      "import.meta.env.VITE_WEB3FORMS_ACCESS_KEY": JSON.stringify(accessKey)
    },
    plugins: [react(), localAdminDevPlugin()],
    server: {
      watch: {
        // Prevent Vite HMR from reloading the page when the admin panel
        // writes data files to src/data — this was causing the "not responding"
        // behaviour (page would reload mid-save, wiping the toast/status).
        ignored: ["**/src/data/**"]
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three", "@react-three/fiber", "@react-three/drei"],
            motion: ["framer-motion"],
            vendor: ["react", "react-dom", "react-hook-form", "clsx", "tailwind-merge"]
          }
        }
      }
    }
  }
})