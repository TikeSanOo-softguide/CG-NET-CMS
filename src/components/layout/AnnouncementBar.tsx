import { useTranslation } from 'react-i18next'

export function AnnouncementBar() {
  const { t } = useTranslation()
  const message = t('announcement.serviceInterruption')
  const copies = [0, 1, 2, 3]

  return (
    <div
      className="bg-[#004AC6] text-white"
      role="status"
      aria-live="polite"
    >
      <div className="marquee h-10 flex items-center">
        <div className="marquee-track">
          <div className="flex shrink-0 items-center">
            {copies.map((i) => (
              <span key={`a-${i}`} className="px-8 text-xs sm:text-sm font-medium whitespace-nowrap">
                {message}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {copies.map((i) => (
              <span key={`b-${i}`} className="px-8 text-xs sm:text-sm font-medium whitespace-nowrap">
                {message}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
