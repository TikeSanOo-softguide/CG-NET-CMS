import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'cgnet-app-download-card-dismissed-at'

// Show again after 7 days
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000

const ANDROID_DOWNLOAD_URL =
  'https://play.google.com/store/apps/details?id=YOUR_APP_ID'

const IOS_DOWNLOAD_URL =
  'https://apps.apple.com/app/YOUR_APP_ID'

type DeviceType = 'android' | 'ios' | 'desktop'

const getDeviceType = (): DeviceType => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (/android/.test(userAgent)) {
    return 'android'
  }

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios'
  }

  return 'desktop'
}

const shouldShowCard = (): boolean => {
  const dismissedAt = localStorage.getItem(STORAGE_KEY)

  // User has never closed the card
  if (!dismissedAt) {
    return true
  }

  const dismissedTime = Number(dismissedAt)

  // Invalid localStorage data
  if (Number.isNaN(dismissedTime)) {
    localStorage.removeItem(STORAGE_KEY)
    return true
  }

  const now = Date.now()
  const isExpired = now - dismissedTime >= DISMISS_DURATION

  // 7 days passed → show again
  if (isExpired) {
    localStorage.removeItem(STORAGE_KEY)
    return true
  }

  return false
}

export default function AppDownloadCard() {
  const { t } = useTranslation()

  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [device, setDevice] = useState<DeviceType>('desktop')

  useEffect(() => {
    setDevice(getDeviceType())
    if (!shouldShowCard()) {
      return
    }

    // Show card after 3 seconds
    const timer = window.setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    window.setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  const handleDownload = () => {
    if (device === 'android') {
      window.location.href = ANDROID_DOWNLOAD_URL
      return
    }

    if (device === 'ios') {
      window.location.href = IOS_DOWNLOAD_URL
      return
    }
    window.open(ANDROID_DOWNLOAD_URL, '_blank', 'noopener,noreferrer')
  }

  if (!isVisible) {
    return null
  }

  const buttonText =
    device === 'android'
      ? t('downloadCard.downloadAndroid')
      : device === 'ios'
        ? t('downloadCard.downloadIOS')
        : t('downloadCard.downloadApp')

  return (
    <div
      className={`
        fixed left-1/2 top-3 z-[9999]
        w-[calc(100%-24px)] max-w-md
        -translate-x-1/2
        transition-all duration-300 ease-out
        ${
          isClosing
            ? '-translate-y-8 opacity-0'
            : 'translate-y-0 opacity-100'
        }
      `}
    >
      <div
        className="
          relative overflow-hidden
          rounded-2xl
          border border-white/50
          bg-background/95
          p-4
          shadow-2xl
          backdrop-blur-xl
          dark:border-white/10
        "
      >
        <div className="flex items-start gap-3">
          {/* Download Icon */}
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-full
              bg-font-hover
              text-app-primary
            "
          >
            <Download className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 pr-6">
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              {t('downloadCard.title')}
            </h3>

            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              {t('downloadCard.description')}
            </p>

            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="
                mt-3 inline-flex
                items-center justify-center gap-2
                rounded-full
                bg-app-primary
                px-5 py-2
                text-xs font-semibold text-white
                shadow-md
                transition-all duration-200
                hover:scale-[1.03]
                hover:opacity-90
                active:scale-95
                sm:text-sm
              "
            >
              <Download className="h-4 w-4" />

              {buttonText}
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label={t('downloadCard.close')}
            className="
              absolute right-3 top-3
              flex h-8 w-8
              items-center justify-center
              rounded-full
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}