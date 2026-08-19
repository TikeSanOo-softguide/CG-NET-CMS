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
import { NewsCard } from '@/components/cards/NewsCard'
import { useNews } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'

const PAGE_SIZE = 6

function NewsSkeleton() {
  return (
    <Card className="overflow-hidden">
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

export default function NewsPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  const [page, setPage] = useState(1)

  usePageTitle(t('news.pageTitle'))

  const { data, isLoading, isError, refetch } = useNews(page, PAGE_SIZE)

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1

  return (
    <main>
      <PageHeader title={t('news.title')} subtitle={t('news.subtitle')} />

      <SectionWrapper>
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <NewsSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {data && data.data.length === 0 && (
          <EmptyState title={t('news.noNews')} description={t('news.noNewsDesc')} />
        )}

        {data && data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.data.map((article, i) => (
                <NewsCard key={article.id} article={article} lang={lang} delay={i * 80} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav aria-label="News pagination" className="flex items-center justify-center gap-2 flex-wrap">
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
