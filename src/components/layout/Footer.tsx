import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wifi } from 'lucide-react'
import { SiFacebook, SiWechat, SiTelegram, SiViber } from 'react-icons/si'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

const QUICK_LINKS = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/services', labelKey: 'nav.services' },
  { to: '/packages', labelKey: 'nav.packages' },
  { to: '/news', labelKey: 'nav.news' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
]

const SUPPORT_LINKS = [
  { to: '/app-guide', labelKey: 'footer.helpCenter' },
  { to: '/career', labelKey: 'nav.career' },
  { to: '#', labelKey: 'footer.faq' },
  { to: '#', labelKey: 'footer.termsOfService' },
  { to: '#', labelKey: 'footer.privacyPolicy' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const [showWechatQR, setShowWechatQR] = useState(false)

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3" aria-label="CG-NET">
              <Wifi className="h-6 w-6 text-primary" aria-hidden="true" />
              <span>{t('footer.company')}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">{t('footer.tagline')}</p>

            <div className="flex gap-3 mt-4">
              {/* Facebook links */}
              <a
                href="https://www.facebook.com/Chenguangnet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CG-NET Facebook"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <SiFacebook className="h-5 w-5" aria-hidden="true" />
              </a>

              {/* WeChat links */}
              <button
                  type="button"
                  onClick={() => setShowWechatQR(true)}
                  aria-label="CG-NET WeChat"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <SiWechat className="h-5 w-5" aria-hidden="true" />
              </button>

              {showWechatQR && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setShowWechatQR(false)}
                  >
                    <div
                      className="relative  max-w-sm rounded-2xl bg-white p-2 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-center">
                        <img
                          src="/assets/QR/wechat-QR.png"
                          alt="CG-NET WeChat QR Code"
                          className="mx-auto w-64 h-64 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

              {/* Telegram links */}
              <a
                href="https://t.me/mlchenguang"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CG-NET Telegram"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <SiTelegram className="h-5 w-5" aria-hidden="true" />
              </a>

              {/* WeChat links */}
              <a
                href="https://invite.viber.com/?g2=AQBGl7W57yWMA1OpCYCHfNKUzmB%2FaVyeSWFlu8QAaPZRNt%2F8Ow%2FGrdAG7jfDY2D%2F&lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CG-NET Viber"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <SiViber className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ to, labelKey }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {t('footer.support')}
            </h3>
            <ul className="space-y-2">
              {SUPPORT_LINKS.map(({ to, labelKey }) => (
                <li key={labelKey}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {t('contact.title')}
            </h3>
            <address className="not-italic space-y-2 text-sm text-slate-400">
              <p>📞 09 887288882</p>
              <p>📞 09 421823339</p>
              <p>📧 contact@chenguangnetwork.com</p>
              <p>🕘 Mon–Sat: 9:00 AM – 6:00 PM</p>
            </address>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 text-center sm:text-left pb-[env(safe-area-inset-bottom)]">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
