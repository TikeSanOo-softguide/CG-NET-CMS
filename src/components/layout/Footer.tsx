import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wifi, Facebook, Youtube } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

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

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3" aria-label="CG-NET">
              <Wifi className="h-6 w-6 text-primary" aria-hidden="true" />
              <span>{t('footer.company')}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">{t('footer.tagline')}</p>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com/cgnet.mm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CG-NET Facebook"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@cgnet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CG-NET YouTube"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
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
              <p>📞 +95 1 234 5678</p>
              <p>📧 support@cgnet.com.mm</p>
              <p>🕘 Mon–Sat: 9:00 AM – 6:00 PM</p>
            </address>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>{t('footer.copyright', { year })}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  )
}
