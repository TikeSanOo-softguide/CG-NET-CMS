import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import type { Service } from '@/types/service'

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
    : '/images/service-placeholder.jpg'

  return (
    <AnimatedCard delay={delay} variant="rise" className="h-full rounded-xl">
      <Card
        className={`!bg-app-surface  group flex h-full flex-col overflow-hidden border shadow-sm card-glow ${
          featured ? 'lg:flex-row' : ''
        }`}
      >
        {/* Image / Icon */}
        <div
          className={`relative h-40 overflow-hidden bg-muted ${
            featured ? 'lg:h-auto lg:min-h-64 lg:w-2/5 lg:shrink-0' : ''
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={imageUrl || '/images/service-placeholder.jpg'}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
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
