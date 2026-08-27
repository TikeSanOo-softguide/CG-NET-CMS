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

  return (
    <AnimatedCard delay={delay} variant="rise" className="rounded-2xl h-full">
      <Card
        className={cn(
          'group flex flex-col overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl  bg-app-card',
          compact ? 'h-[360px]' : 'h-full'
        )}
      >
        {/* 1. Top Image Header */}
        <div
          className={cn(
            'block overflow-hidden bg-font-muted relative',
            compact ? 'h-[140px]' : 'h-48'
          )}
        >
          <img
            src={promotion.imageUrl}
            alt={t('promotions.title')}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* 2. Title Section */}
        <CardHeader className="pb-3 pt-4 px-5">
          <CardTitle className="text-base font-bold leading-snug text-font-black h-[3rem] flex items-center">
            <Link
              to={`/promotion/${promotion.slug}`}
              className="hover:text-font-blue   transition-colors line-clamp-2"
            >
              {getLocalized(promotion.title, lang)}
            </Link>
          </CardTitle>
        </CardHeader>

        {/* Divider Line */}
        <div className="px-5">
          <div className="h-[1px] w-full  bg-border/60" />
        </div>

        {/* 3. Metadata Content Rows (Periode Promo / Details) */}
        <CardContent className="flex-1 py-3 px-5 space-y-2 text-xs ">
          <div className="flex items-center justify-between">
            <span className="font-medium text-font-muted">{t('promotions.periodLabel')}</span>
            <span className="text-font-black font-medium text-right">
              {formatDate(promotion.startDate, getDateLocale(lang))} -{' '}
              {formatDate(promotion.endDate, getDateLocale(lang))}
            </span>
          </div>
        </CardContent>

        <CardFooter className="pt-3 pb-5 px-5 flex items-center justify-end gap-3">
          {/* 2. View Detail Button with Hover Effect */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 gap-1 px-2 text-font-blue hover:text-font-blue"
          >
            <Link to={`/promotion/${promotion.slug}`} className="flex items-center gap-1.5">
              <span>{t('promotions.viewDetail')}</span>

              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  )
}
