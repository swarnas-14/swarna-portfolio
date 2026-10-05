import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react"

export default function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose()
    if (e.key === "ArrowLeft") onPrev()
    if (e.key === "ArrowRight") onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleKey])

  const current = images?.[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-text-muted text-sm font-mono">
            {currentIndex + 1} / {images?.length}
          </div>

          {/* Prev */}
          {images?.length > 1 && (
            <button
              className="absolute left-6 w-12 h-12 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); onPrev() }}
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            className="max-w-5xl max-h-[80vh] px-20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {current?.src ? (
              <img
                src={current.src}
                alt={current.alt || ""}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
            ) : (
              <div className="w-96 h-64 glass rounded-xl flex flex-col items-center justify-center gap-3 text-text-muted">
                <ImageOff size={32} />
                <span className="text-sm">Image coming soon</span>
              </div>
            )}
            {(current?.title || current?.description) && (
              <div className="mt-4 text-center">
                {current?.title && <p className="text-text-primary font-semibold">{current.title}</p>}
                {current?.description && <p className="text-text-muted text-sm mt-1">{current.description}</p>}
              </div>
            )}
          </motion.div>

          {/* Next */}
          {images?.length > 1 && (
            <button
              className="absolute right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); onNext() }}
            >
              <ChevronRight size={20} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
