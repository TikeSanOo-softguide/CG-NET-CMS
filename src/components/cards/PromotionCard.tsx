import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { cn, formatDate, getDateLocale, getLocalized } from '@/lib/utils'
import { newsDescClass, newsTitleClass, typeNewsChip } from '@/lib/typography'
import type { Promotion } from '@/types/promotion'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import { useState } from 'react'

interface PromotionCardProps {
  promotion: Promotion
  lang: SupportedLanguage
  delay?: number
  compact?: boolean
}

export function PromotionCard({ promotion, lang, delay = 0, compact = false }: PromotionCardProps) {
  const { t } = useTranslation()
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
  const [imageError, setImageError] = useState(false)

  const imageSrc = promotion.imageUrl
    ? promotion.imageUrl.startsWith('http')
      ? promotion.imageUrl
      : `${STORAGE_URL}/${promotion.imageUrl}`
    : null

  const hasStart = typeof promotion.startDate === 'string' && promotion.startDate.trim() !== ''
  const hasEnd = typeof promotion.endDate === 'string' && promotion.endDate.trim() !== ''

  return (
    <AnimatedCard
      delay={delay}
      variant="rise"
      className="relative h-full min-w-0 max-w-full rounded-[12px]"
    >
      <Card className="group flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-[12px] border border-white shadow-soft !bg-app-surface">
        <Link
          to={`/promotion/${promotion.slug}`}
          className="relative block w-full overflow-hidden bg-muted"
        >
          {imageSrc && !imageError ? (
            <img
              src={imageSrc}
              alt={getLocalized(promotion.title, lang)}
              className="block h-auto w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex aspect-[2.4/1]  w-full items-center justify-center bg-muted">
              <img
                src="/assets/logo/logo-muted.png"
                alt="No image available"
                className="h-16 w-auto object-contain opacity-60"
              />
            </div>
          )}
        </Link>

        <CardHeader className={cn('space-y-2.5 pb-2 pt-4', compact && 'px-4')}>
          <span className={typeNewsChip}>{t('nav.promotion')}</span>
          <CardTitle
            className={cn(
              newsTitleClass(lang),
              'line-clamp-2 overflow-hidden text-ellipsis',
              lang === 'my' ? 'min-h-[3.1em]' : 'min-h-[2.6em]',
              compact && 'text-h4'
            )}
          >
            <Link
              to={`/promotion/${promotion.slug}`}
              className="transition-colors duration-200 hover:text-app-primary"
            >
              {getLocalized(promotion.title, lang)}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className={cn('flex-1 space-y-2 pt-0', compact && 'px-4')}>
          <CardDescription
            className={cn(
              newsDescClass(lang),
              'line-clamp-2',
              lang === 'my' ? 'min-h-[3.4em]' : 'min-h-[3.1em]'
            )}
          >
            {getLocalized(promotion.description, lang)}
          </CardDescription>

          <div className="flex min-h-[1.4em] items-center justify-between gap-2 text-caption tracking-[0.02em]">
            {hasStart && hasEnd ? (
              <span className="font-medium text-font-blue">
                {t('promotions.periodLabel')}{' '}
                {formatDate(promotion.startDate!, getDateLocale(lang))} -{' '}
                {formatDate(promotion.endDate!, getDateLocale(lang))}
              </span>
            ) : (!hasStart && !hasEnd) || (hasStart && !hasEnd) ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                {t('promotions.active')}
              </span>
            ) : !hasStart && hasEnd ? (
              <span className="font-medium text-amber-600">
                {t('promotions.promotionExpires')}{' '}
                {formatDate(promotion.endDate!, getDateLocale(lang))}
              </span>
            ) : null}
          </div>
        </CardContent>

        <CardFooter
          className={cn(
            'relative flex items-center justify-end gap-2 px-6 pb-3 pt-2',
            compact && 'px-4 pb-2.5'
          )}
        >
          <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-border" />

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-6 gap-0.5 px-1.5 text-caption font-medium text-font-blue hover:bg-transparent hover:text-font-blue"
          >
            <Link to={`/promotion/${promotion.slug}`}>
              {t('promotions.viewDetail')}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  )
}
