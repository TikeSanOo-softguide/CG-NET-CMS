import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { normalizeLanguage } from '@/lib/i18n'
import { usePromotionBySlug } from '@/hooks/usePromotion'
import { formatDate, getDateLocale, getLocalized } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'

export default function PromotionDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  const { data: promotion, isLoading, isError } = usePromotionBySlug(slug ?? '')
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`

  if (isLoading) {
    return (
      <SectionWrapper>
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-3" />
        <Skeleton className="h-5 w-1/2 mb-6" />
        <div className="space-y-3 max-w-3xl">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </SectionWrapper>
    )
  }

  if (isError || !promotion) {
    return (
      <SectionWrapper className="bg-muted/40">
        <EmptyState
          title={t('promotions.noPromotion')}
          description={t('promotions.noPromotionDesc')}
          action={
            <Button variant="outline">
              <Link to="/promotion">{t('common.goBack')}</Link>
            </Button>
          }
        />
      </SectionWrapper>
    )
  }

  return (
    <main className="bg-gradient-to-b from-background via-muted/30 to-background  sm:pt-6 md:pt-14 pb-10 sm:pb-14">
      <SectionWrapper className="py-0 bg-muted/40">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 py-3 sm:py-0">
              {/* Date Badge */}
              <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-3 pt-2 pb-1.5 sm:py-1.5 rounded-full bg-font-blue/10 text-primary text-[11px] sm:text-xs font-medium border border-font-blue/20 max-w-full text-center sm:text-left">
                {(() => {
                  const hasStart =
                    promotion.startDate &&
                    typeof promotion.startDate === 'string' &&
                    promotion.startDate.trim() !== ''
                  const hasEnd =
                    promotion.endDate &&
                    typeof promotion.endDate === 'string' &&
                    promotion.endDate.trim() !== ''

                  if (hasStart && hasEnd) {
                    return (
                      <>
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span className="break-words">
                          {formatDate(promotion.startDate, getDateLocale(lang))} —{' '}
                          {formatDate(promotion.endDate, getDateLocale(lang))}
                        </span>
                      </>
                    )
                  }

                  if ((!hasStart && !hasEnd) || (hasStart && !hasEnd)) {
                    return (
                      <span className="inline-flex items-center gap-1.5 font-semibold text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Active
                      </span>
                    )
                  }

                  if (!hasStart && hasEnd) {
                    return (
                      <>
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span className="break-words">
                          Expires: {formatDate(promotion.endDate, getDateLocale(lang))}
                        </span>
                      </>
                    )
                  }

                  return null
                })()}
              </div>

              {/* Back Button */}
              <Button
                asChild
                variant="ghost"
                className="group gap-2 text-font-muted hover:text-font-black hover:bg-muted/60 transition-all duration-200"
              >
                <Link to="/promotion">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>{t('common.goBack')}</span>
                </Link>
              </Button>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-font-black leading-[1.6] sm:leading-[1.6]  block">
              {getLocalized(promotion.title, lang)}
            </h1>
          </div>

          {/* Banner Image with modern shadow and zoom on hover */}
          <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-lg shadow-black/5 aspect-[16/10] sm:aspect-[16/9] w-full transition-all duration-300 hover:shadow-xl hover:border-primary/30">
            {promotion.imageUrl ? (
              <img
                src={
                  promotion.imageUrl.startsWith('http')
                    ? promotion.imageUrl
                    : `${STORAGE_URL}/${promotion.imageUrl}`
                }
                alt={getLocalized(promotion.title, lang)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-muted" aria-label={t('common.noData')} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
          </div>

          {/* Description Card */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-font-muted leading-relaxed">
            <p className="pb-12 sm:pb-16 text-sm sm:text-base whitespace-pre-line">
              {getLocalized(promotion.description, lang)}
            </p>{' '}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
