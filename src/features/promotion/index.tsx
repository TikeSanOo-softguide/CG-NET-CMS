import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import Pagination from '@/components/common/pagination'

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
  const totalPages = data?.meta?.last_page ?? 1

  return (
    <main>
      <PageHeader title={t('promotions.title')} subtitle={t('promotions.subtitle')} />

      <SectionWrapper>
        <div className="max-w-6xl w-full mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center gap-0">
              <div className="w-full sm:max-w-[600px]">
                <SearchBar />
              </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.data.map((promotion, i) => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  lang={lang}
                  delay={i * 80}
                />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} setPage={setPage} t={t} />
          </>
        )}
      </SectionWrapper>
    </main>
  )
}
