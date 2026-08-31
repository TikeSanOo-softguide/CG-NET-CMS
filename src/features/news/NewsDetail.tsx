import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { useNewsBySlug } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, formatDate, getDateLocale } from '@/lib/utils'
import { normalizeLanguage } from '@/lib/i18n'

export default function NewsDetailPage() {
  const { slug = '' } = useParams()
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useNewsBySlug(slug)

  usePageTitle(article ? getLocalized(article.title, lang) : t('news.detailPageTitle'))

  if (isLoading) {
    return (
      <SectionWrapper>
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-3" />
        <Skeleton className="h-5 w-1/2 mb-6" />
        <div className="space-y-3 max-w-3xl">
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
        </div>
      </SectionWrapper>
    )
  }

  if (isError || !article) return <ErrorMessage onRetry={() => void refetch()} />

  return (
    <main>
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">     
          <article>
            <header className="mb-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <Badge variant="secondary">
                  {getLocalized(article.category.name, lang)}
                </Badge>

                <Button variant="ghost" asChild className="gap-2">
                  <Link to="/news">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    {t('common.goBack')}
                  </Link>
                </Button>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-font-black leading-[1.6] sm:leading-[1.6] block">
                {getLocalized(article.title, lang)}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground py-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={article.created_at}>
                    {formatDate(article.created_at, getDateLocale(lang))}
                  </time>
                </span>
              </div>
            </header>

            <div className="card-media rounded-xl overflow-hidden mb-6 h-52 sm:h-72">
              <img
                src={`${STORAGE_URL}/${article.image_url}`}
                alt={getLocalized(article.title, lang)}
                className="h-full w-full object-cover"
              />
            </div>

            <Separator className="mb-6" />
            <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
              {getLocalized(article.description, lang)
                .split(/\r?\n\r?\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index} className="leading-7">
                    {paragraph}
                  </p>
                ))}
            </div>
          </article>
        </div>
      </SectionWrapper>
    </main>
  )
}
