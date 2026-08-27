import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { PromotionCard } from '@/components/cards/PromotionCard'
import { usePromotion } from '@/hooks/usePromotion'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'
import { SearchBar } from '@/components/common/SearchBar'
import { CommonFilter } from '@/components/common/CommonFilter'
import { newsFilterOptions } from '@/lib/content/new'

const PAGE_SIZE = 6

function PromotionSkeleton() {
  return (
    <Card className="overflow-hidden border-border/60 rounded-[24px]">
      <Skeleton className="h-44 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-5 w-1/3 mb-2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-4 w-1/3" />
      </CardFooter>
    </Card>
  )
}

export default function PromotionPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  const [page, setPage] = useState(1)

  usePageTitle(t('promotions.pageTitle'))

  const { data, isLoading, isError, refetch } = usePromotion(page, PAGE_SIZE)

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1
  const [filter, setFilter] = useState('all')

  return (
    <main>
      <PageHeader title={t('promotions.title')} subtitle={t('promotions.subtitle')} />

      <SectionWrapper>
        <div className="max-w-6xl mx-auto w-full mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center gap-2 sm:gap-3">
              <div className="w-full sm:max-w-[600px]">
                <SearchBar />
              </div>

              {/* Filter Icon Button (Dropdown Menu) */}
              <CommonFilter options={newsFilterOptions} value={filter} onChange={setFilter} />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <PromotionSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {data && data.data.length === 0 && (
          <EmptyState
            title={t('promotion.noPromotions')}
            description={t('promotion.noPromotionsDesc')}
          />
        )}

        {data && data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
              {data.data.map((promotion, i) => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  lang={lang}
                  delay={i * 80}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Promotion pagination"
                className="flex items-center justify-center gap-2 flex-wrap"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label={t('common.previous')}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{t('common.previous')}</span>
                </Button>
                <span className="text-sm text-muted-foreground px-1">
                  {t('common.page')} {page} {t('common.of')} {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label={t('common.next')}
                >
                  <span className="hidden sm:inline">{t('common.next')}</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </nav>
            )}
          </>
        )}
      </SectionWrapper>
    </main>
  )
}
