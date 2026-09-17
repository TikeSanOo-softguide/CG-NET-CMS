import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SiFacebook, SiWechat, SiTelegram, SiViber, SiTiktok } from 'react-icons/si'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { useContact } from '@/hooks/useContact'
import { createPortal } from 'react-dom'

const QUICK_LINKS = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/services', labelKey: 'nav.services' },
  { to: '/packages?category=mm-broadband', labelKey: 'nav.packages' },
  { to: '/promotion', labelKey: 'nav.promotion' },
  { to: '/news', labelKey: 'nav.news' },
  { to: '/about', labelKey: 'nav.about' },
]

const SUPPORT_LINKS = [
  { to: '/app-guide', labelKey: 'nav.appGuide' },
  { to: '/available-location', labelKey: 'footer.availableLocation' },
  { to: '/contact-us', labelKey: 'nav.contact' },
  { to: '/privacy-policy', labelKey: 'footer.privacyPolicy' },
  { to: '/app-guide#faq', labelKey: 'appGuide.faqs' },
  { to: '/app-guide#detail-step', labelKey: 'appGuide.detailStep' },
  { to: '/about#brand-guideline', labelKey: 'footer.brandGuideLine' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const [showWechatQR, setShowWechatQR] = useState(false)
  const { data: contacts } = useContact()

  return (
    <>
      <footer className="relative bg-app-footer text-slate-300" id="footer">
        <div className="absolute -top-[1px] left-0 z-0 w-full overflow-hidden" aria-hidden="true">
          <svg
            className="block h-[65px] w-full"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z"
              className="fill-slate-50 dark:fill-slate-900"
            />
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative z-10 container pt-20 pb-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Quick links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.quickLinks')}
              </h3>

              <ul className="space-y-2">
                {QUICK_LINKS.map(({ to, labelKey }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={() => {
                        if (to === '/') {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          })
                        }
                      }}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.support')}
              </h3>

              <ul className="space-y-2">
                {SUPPORT_LINKS.map(({ to, labelKey }) => (
                  <li key={labelKey}>
                    <Link
                      to={to}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('contact.title')}
              </h3>

              <address className="not-italic space-y-2 text-sm text-slate-400">
                {contacts?.map((contact) => (
                  <p key={contact.id}>{contact.contact_point}</p>
                ))}
              </address>
            </div>
          </div>

          <Separator className="my-5 bg-slate-700" />

          <div className="flex flex-col items-center justify-between gap-2 pb-[env(safe-area-inset-bottom)] text-center text-xs text-slate-500 sm:flex-row sm:text-left sm:text-sm">
            <p>{t('footer.copyright', { year })}</p>

            <div className="flex items-center justify-center gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/Chenguangnet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yaung-Ni-Oo Facebook"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <SiFacebook className="h-5 w-5" aria-hidden="true" />
              </a>

              {/* WeChat */}
              <button
                type="button"
                onClick={() => setShowWechatQR(true)}
                aria-label="Yaung-Ni-Oo WeChat"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <SiWechat className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Telegram */}
              <a
                href="https://t.me/mlchenguang"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yaung-Ni-Oo Telegram"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <SiTelegram className="h-5 w-5" aria-hidden="true" />
              </a>

              {/* Viber */}
              <a
                href="https://invite.viber.com/?g2=AQBGl7W57yWMA1OpCYCHfNKUzmB%2FaVyeSWFlu8QAaPZRNt%2F8Ow%2FGrdAG7jfDY2D%2F&lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yaung-Ni-Oo Viber"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <SiViber className="h-5 w-5" aria-hidden="true" />
              </a>

              {/* Tiktok */}
              <a
                href="https://www.tiktok.com/@yaung.ni.oo.wifi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yaung-Ni-Oo Viber"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <SiTiktok className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showWechatQR &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setShowWechatQR(false)}
          >
            <div
              className="relative max-w-sm rounded-2xl bg-white p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/assets/QR/wechat-QR.png"
                alt="Yaung-Ni-Oo WeChat QR Code"
                className="mx-auto h-64 w-64 object-contain"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
