import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { cardDescClass, cardTitleClass } from '@/lib/typography'
import { cn } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import type { Service } from '@/types/service'
import { t } from 'i18next'

interface ServiceCardProps {
  service: Service
  lang: SupportedLanguage
  delay?: number
  featured?: boolean
}

function splitServiceDescription(description: string) {
  const normalized = description.replace(/\r\n/g, '\n').trim()
  if (!normalized) return { intro: '', features: [] as string[] }

  const blocks = normalized.split(/\n{2,}/)
  const intro = blocks[0]?.trim() ?? ''
  const features = blocks
    .slice(1)
    .join('\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return { intro, features }
}

export function ServiceCard({ service, lang, delay = 0, featured = false }: ServiceCardProps) {
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
  const title = service.title[lang] || service.title.en || ''
  const description = service.description[lang] || service.description.en || ''
  const { intro, features } = splitServiceDescription(description)

  const imageUrl = service.image_url
    ? service.image_url.startsWith('http')
      ? service.image_url
      : `${STORAGE_URL}/${service.image_url}`
    : ''

  return (
    <AnimatedCard delay={delay} variant="rise" className="h-full rounded-2xl">
      <Card
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eeeeee] !bg-white shadow-soft card-glow',
          featured && 'lg:flex-row'
        )}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden bg-white',
            featured && 'shrink-0 lg:w-[46%]'
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="block h-auto w-full transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted px-4 text-center text-lg font-medium text-font-muted">
              {t('common.noImage')}
            </div>
          )}
        </div>

        <div
          className={cn(
            'flex flex-1 flex-col px-5 py-5 sm:px-6',
            featured && 'lg:justify-center lg:px-8 lg:py-8'
          )}
        >
          <CardTitle
            className={cardTitleClass(
              lang,
              'text-font-black transition-colors duration-200 group-hover:text-app-primary'
            )}
          >
            {title}
          </CardTitle>

          {features.length > 0 ? (
            <>
              <CardDescription className={cardDescClass(lang, 'mt-3 text-font-muted')}>
                {intro}
              </CardDescription>
              <ul className="mt-3 flex flex-col gap-1">
                {features.map((line, index) => (
                  <li
                    key={`${service.id}-${index}`}
                    className={cn(
                      'rounded-md border border-[#e7ecff] border-l-2 border-l-app-primary bg-gradient-to-r from-[#f3f6ff] to-white px-2 py-1 text-[13px] text-font-secondary',
                      lang === 'my' ? 'leading-[1.55]' : 'leading-snug'
                    )}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <CardDescription
              className={cardDescClass(lang, 'mt-3 whitespace-pre-line text-font-muted')}
            >
              {description}
            </CardDescription>
          )}
        </div>
      </Card>
    </AnimatedCard>
  )
}
