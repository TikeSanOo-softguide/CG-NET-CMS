import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import { SearchBar } from '@/components/common/SearchBar'
import { CommonFilter } from '@/components/common/CommonFilter'
import { newsFilterOptions } from '@/lib/content/new'
import Pagination from '@/components/common/pagination'

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
  const [filter, setFilter] = useState('all')

  usePageTitle(t('news.pageTitle'))

  const { data: news, isLoading, isError, refetch } = useNews(page, PAGE_SIZE)
  const totalPages = news ? Math.ceil(news.total / PAGE_SIZE) : 1
  return (
    <main>
      <PageHeader title={t('news.title')} subtitle={t('news.subtitle')} />

      <SectionWrapper>
        <div className="max-w-6xl w-full mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-center gap-0">
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {news && news.data.length === 0 && (
          <EmptyState title={t('news.noNews')} description={t('news.noNewsDesc')} />
        )}

        {news && news.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {news.data.map((article, i) => (
                <NewsCard key={article.id} article={article} lang={lang} delay={i * 80} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} setPage={setPage} t={t} />
          </>
        )}
      </SectionWrapper>
    </main>
  )
}
