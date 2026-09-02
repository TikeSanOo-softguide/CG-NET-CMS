import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { serviceContent } from '@/lib/content/service'
import type { SupportedLanguage } from '@/lib/i18n/languages'

interface ServiceCardProps {
  service: (typeof serviceContent.services)[number]
  lang: SupportedLanguage
  delay?: number
  featured?: boolean
}

export function ServiceCard({ service, lang, delay = 0, featured = false }: ServiceCardProps) {
  const { t } = useTranslation()

  return (
    <AnimatedCard delay={delay} variant="rise" className="h-full rounded-xl">
      <Card
        className={`bg-app-card group flex h-full flex-col overflow-hidden border shadow-sm card-glow ${
          featured ? 'lg:flex-row' : ''
        }`}
      >
        {/* Image / Icon */}
        <div
          className={`relative h-40 overflow-hidden bg-muted ${
            featured ? 'lg:h-auto lg:min-h-64 lg:w-2/5 lg:shrink-0' : ''
          }`}
        >
          <div
            className={`absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 ${service.iconBg}`}
          />

          <div className={`absolute inset-0 flex items-center justify-center ${service.iconBg}`}>
            <img src={service.imageUrl} alt="" />
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-1 flex-col ${featured ? 'lg:justify-center lg:px-8 lg:py-8' : ''}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-font-blue">
              {t(service.titleKey, { lng: lang })}
            </CardTitle>

            <CardDescription className=" leading-[1.7]">
              {t(service.descriptionKey, { lng: lang })}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pt-0">
            <ul
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
              aria-label={`${t(service.titleKey, {
                lng: lang,
              })} features`}
            >
              {service.features.map((feature) => {
                const FeatureIcon = feature.icon

                return (
                  <li key={feature.key} className="flex items-start gap-2 text-sm">
                    <FeatureIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-font-blue"
                      aria-hidden="true"
                    />

                    <span>{t(feature.labelKey, { lng: lang })}</span>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </div>
      </Card>
    </AnimatedCard>
  )
}
