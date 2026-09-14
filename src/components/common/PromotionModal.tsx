import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Banner } from '@/types'
import { useBanners } from '@/hooks/useBanner'

const STORAGE_KEY = 'cgnet-promotion-modal-dismissed-at'

// Show again after 24 hours
const DISMISS_DURATION = 24 * 60 * 60 * 1000

// Auto slide every 5 seconds
const AUTOPLAY_MS = 3000

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

export default function PromotionModal({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`

  const { data: allBanners } = useBanners()

  // Get ALL web_popup banners
  const popupBanners = allBanners?.filter((banner) => banner.type === 'web_popup') ?? []

  /**
   * Get localized image URL
   */
  const getImageUrl = useCallback(
    (slide: Banner) => {
      const imageMap = {
        en: slide.image_url_en,
        zh: slide.image_url_zh,
        my: slide.image_url_my,
      }

      const imagePath = imageMap[lang as keyof typeof imageMap] ?? slide.image_url_en

      return `${STORAGE_URL}/${imagePath}`
    },
    [lang, STORAGE_URL]
  )

  /**
   * Reset current slide when language or banners change
   */
  useEffect(() => {
    setCurrentIndex(0)
  }, [lang, popupBanners.length])

  /**
   * Show modal after 1 second
   */
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

  /**
   * Auto slide
   */
  useEffect(() => {
    // Don't autoplay if modal is closed
    // Don't autoplay if there is only one banner
    if (!isOpen || popupBanners.length <= 1) {
      return
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === popupBanners.length - 1 ? 0 : prev + 1))
    }, AUTOPLAY_MS)

    return () => {
      window.clearInterval(interval)
    }
  }, [isOpen, popupBanners.length])

  /**
   * Close modal
   */
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

  // - there are no popup banners
  if (!isOpen || popupBanners.length === 0) {
    return null
  }

  const currentBanner = popupBanners[currentIndex]

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
      <div className="relative overflow-visible">
        {/* Modal */}
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
          {/* Image */}
          <img
            key={currentBanner.id}
            src={getImageUrl(currentBanner)}
            alt="Promotion"
            className="
              block
              w-full
              h-auto
              aspect-[16/7]
              object-cover
            "
          />
        </div>

        {/* Close Button */}
        <div className="absolute -bottom-14 left-1/2 z-30 -translate-x-1/2">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close promotion"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-neutral-200
              bg-white
              text-neutral-800
              shadow-xl
              transition-transform
              hover:scale-110
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
            "
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
