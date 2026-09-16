import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import type { Service } from '@/types/service'
import { t } from 'i18next'

interface ServiceCardProps {
  service: Service
  lang: SupportedLanguage
  delay?: number
  featured?: boolean
}

export function ServiceCard({ service, lang, delay = 0, featured = false }: ServiceCardProps) {
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
  const title = service.title[lang] || service.title.en || ''
  const description = service.description[lang] || service.description.en || ''

  const imageUrl = service.image_url
    ? service.image_url.startsWith('http')
      ? service.image_url
      : `${STORAGE_URL}/${service.image_url}`
    : ''

  return (
    <AnimatedCard delay={delay} variant="rise" className="h-full rounded-xl">
      <Card
        className={`!bg-app-surface group flex h-full flex-col overflow-hidden border shadow-sm card-glow ${
          featured ? 'lg:flex-row' : ''
        }`}
      >
        {/* Image / Icon */}
        <div
          className={`relative overflow-hidden w-full aspect-[4/1.7]  bg-muted flex items-center justify-center`}
        >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}

            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          )  : (
            <div className="flex items-center justify-center w-full h-full bg-muted text-font-muted text-lg font-medium">
              {t('common.noImage')}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`flex flex-1 flex-col ${featured ? 'lg:justify-center lg:px-8 lg:py-8' : ''}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-font-blue">{title}</CardTitle>

            <CardDescription className="whitespace-pre-line leading-[1.7]">
              {description}
            </CardDescription>
          </CardHeader>
        </div>
      </Card>
    </AnimatedCard>
  )
}
