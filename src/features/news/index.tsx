import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useNews } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, formatDate } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

const PAGE_SIZE = 6

function NewsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-1/3 mb-2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-4 w-1/3" />
      </CardFooter>
    </Card>
  )
}

export default function NewsPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage
  const [page, setPage] = useState(1)

  usePageTitle(t('news.pageTitle'))

  const { data, isLoading, isError, refetch } = useNews(page, PAGE_SIZE)

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1

  return (
    <main>
      <PageHeader title={t('news.title')} subtitle={t('news.subtitle')} />

      <SectionWrapper>
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <NewsSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {data && data.data.length === 0 && (
          <EmptyState title={t('news.noNews')} description={t('news.noNewsDesc')} />
        )}

        {data && data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.data.map((article, i) => (
                <AnimatedCard key={article.id} delay={i * 80} variant="fade-up" className="rounded-lg">
                <Card className="flex flex-col h-full card-shine card-glow border">
                  <CardHeader className="flex-1">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">
                      {getLocalized(article.category, lang)}
                    </Badge>
                    <CardTitle className="text-base leading-snug line-clamp-2">
                      {getLocalized(article.title, lang)}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {getLocalized(article.excerpt, lang)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between pt-0">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.publishedAt, lang === 'my' ? 'my-MM' : 'en-US')}
                    </span>
                    <Button variant="link" size="sm" asChild className="p-0 h-auto gap-1">
                      <Link to={`/news/${article.slug}`}>
                        {t('common.readMore')}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                </AnimatedCard>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="News pagination" className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label={t('common.previous')}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  {t('common.previous')}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {t('common.page')} {page} {t('common.of')} {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label={t('common.next')}
                >
                  {t('common.next')}
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
