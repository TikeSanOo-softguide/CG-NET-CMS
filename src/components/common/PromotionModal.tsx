import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'cgnet-promotion-modal-dismissed-at'

// Show again after 24 hours
const DISMISS_DURATION = 24 * 60 * 60 * 1000

const shouldShowModal = (): boolean => {
  const dismissedAt = localStorage.getItem(STORAGE_KEY)

  // Never dismissed before
  if (!dismissedAt) {
    return true
  }

  const dismissedTime = Number(dismissedAt)

  // Invalid localStorage value
  if (Number.isNaN(dismissedTime)) {
    localStorage.removeItem(STORAGE_KEY)
    return true
  }

  // Show again after 24 hours
  if (Date.now() - dismissedTime >= DISMISS_DURATION) {
    localStorage.removeItem(STORAGE_KEY)
    return true
  }

  return false
}

export default function PromotionModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Don't show if dismissed within the last 24 hours
    if (!shouldShowModal()) {
      return
    }

    // Show modal after 1 second
    const timer = window.setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)

    // Save dismissal time
    localStorage.setItem(STORAGE_KEY, Date.now().toString())

    // Wait for closing animation
    window.setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 300)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
        transition-opacity duration-300
        ${isClosing ? 'opacity-0' : 'opacity-100'}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          relative
          w-[90vw]
          sm:w-[70vw]
          md:w-[60vw]
          max-w-[800px]
          overflow-hidden
          rounded-xl
          bg-white
          shadow-2xl
          transition-transform duration-300
          ${isClosing ? 'scale-95' : 'scale-100'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close promotion"
          className="
            absolute
            right-3
            top-3
            z-10
            flex h-9 w-9
            items-center justify-center
            rounded-full
            bg-black/50
            text-white
            backdrop-blur-sm
            transition
            hover:bg-black/70
          "
        >
          <X size={18} />
        </button>

        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop"
          alt="Promotion"
          className="
            block
            w-full
            h-[400px]
            sm:h-[260px]
            md:h-auto
            md:aspect-[16/7]
            object-cover
          "
        />
      </div>
    </div>
  )
}