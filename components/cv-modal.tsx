"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CVModal({ isOpen, onClose }: CVModalProps) {
  const [mounted, setMounted] = useState(false)

  // Handle escape key press to close modal
  useEffect(() => {
    setMounted(true)

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-4xl w-full bg-zinc-900 rounded-xl shadow-2xl overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-white"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="overflow-auto max-h-[90vh] p-1">
                <Image
                  src="/umair-cv-image.png"
                  alt="Umair Husain Khan CV"
                  width={1000}
                  height={1414}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                <p className="text-sm text-zinc-400">Umair Husain Khan - CV</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
