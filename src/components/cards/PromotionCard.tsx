import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { cn, formatDate, getDateLocale, getLocalized } from '@/lib/utils'
import type { Promotion } from '@/types/promotion'
import type { SupportedLanguage } from '@/lib/i18n/languages'

interface PromotionCardProps {
  promotion: Promotion
  lang: SupportedLanguage
  delay?: number
  compact?: boolean
}
export function PromotionCard({ promotion, lang, delay = 0, compact = false }: PromotionCardProps) {
  const { t } = useTranslation()
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`

  return (
    <AnimatedCard delay={delay} variant="rise" className="rounded-xl h-full">
      <Card
        className={cn(
          'group flex flex-col overflow-hidden border shadow-sm card-glow rounded-xl bg-app-surface',
          compact ? 'h-[360px]' : 'h-full'
        )}
      >
        {/* 1. Top Image Header */}
        <Link
          to={`/promotion/${promotion.slug}`}
          className={cn('card-media relative block', compact ? 'h-[140px]' : 'h-44')}
        >
          <img
            src={
              promotion.imageUrl.startsWith('http')
                ? promotion.imageUrl
                : `${STORAGE_URL}/${promotion.imageUrl}`
            }
            alt={getLocalized(promotion.title, lang)}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </Link>

        <CardHeader className="pb-2 pt-3">
        <span className="w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-app-primary">
          {t('nav.promotion')}
        </span>
        <CardTitle
          className={cn(
            'leading-[1.7]',
            compact ? 'text-sm' : 'text-base'
          )}
        >
          <Link
            to={`/promotion/${promotion.slug}`}
            className="transition-colors hover:text-primary"
          >
            {getLocalized(promotion.title, lang)}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className={cn('flex-1 pt-0', compact && 'px-4')}>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {t('promotions.periodLabel')}
          </span>

          <span className="text-right font-medium text-font-black">
            {formatDate(promotion.startDate, getDateLocale(lang))} -{' '}
            {formatDate(promotion.endDate, getDateLocale(lang))}
          </span>
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          'relative flex items-center justify-end gap-2 pt-3',
          compact && 'px-4 pb-3'
        )}
      >
        {/* Shorter top border */}
        <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-border" />

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 gap-1 px-2 text-font-blue hover:text-font-blue"
        >
          <Link
            to={`/promotion/${promotion.slug}`}
            className="flex items-center gap-1.5"
          >
            {t('promotions.viewDetail')}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
      </Card>
    </AnimatedCard>
  )
}
