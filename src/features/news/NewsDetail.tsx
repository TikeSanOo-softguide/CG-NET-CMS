import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { useNewsBySlug } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { cn, getLocalized, formatDate, getDateLocale } from '@/lib/utils'
import { normalizeLanguage } from '@/lib/i18n'
import { newsDescClass, newsTitleClass, typeNewsChip } from '@/lib/typography'
import { EmptyState } from '@/components/common/EmptyState'
import { useState } from 'react'
import { ShareButton } from '@/components/common/ShareButton'

export default function NewsDetailPage() {
  const { slug = '' } = useParams()
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
  const { data: article, isLoading, isError } = useNewsBySlug(slug)
  const [imageError, setImageError] = useState(false)
  usePageTitle(article ? getLocalized(article.title, lang) : t('news.detailPageTitle'))

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

  if (isError || !article) {
    return (
      <SectionWrapper className="bg-muted/40">
        <EmptyState
          title={t('news.noNews')}
          description={t('news.noNewsDesc')}
          action={
            <Button variant="outline">
              <Link to="/news">{t('common.goBack')}</Link>
            </Button>
          }
        />
      </SectionWrapper>
    )
  }

  return (
    <main>
      <SectionWrapper className="bg-muted/40">
        <div className="max-w-3xl mx-auto">
          <article>
            <header className="mb-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className={typeNewsChip}>
                  {article.category
                    ? getLocalized(article.category.name, lang)
                    : t('common.noData')}
                </span>
                <Button variant="ghost" asChild className="gap-2 text-caption">
                  <Link to="/news">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('common.goBack')}
                  </Link>
                </Button>
              </div>
              <h1 className={cn(newsTitleClass(lang), 'block')}>
                {getLocalized(article.title, lang)}
              </h1>

              <div className="flex flex-wrap gap-4 py-2 text-caption text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <time dateTime={article.created_at}>
                    {formatDate(article.created_at, getDateLocale(lang))}
                  </time>
                </span>
              </div>
            </header>

            {article.image_url && !imageError && (
              <div className="mb-6 w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src={`${STORAGE_URL}/${article.image_url}`}
                  alt={getLocalized(article.title, lang)}
                  className="block h-auto w-full object-contain"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            <Separator className="mb-6" />
            <div className="max-w-none space-y-4">
              {getLocalized(article.description, lang)
                .split(/\r?\n\r?\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index} className={newsDescClass(lang)}>
                    {paragraph}
                  </p>
                ))}
            </div>
          </article>
          <ShareButton
            title={article ? getLocalized(article.title, lang) : document.title}
            text={t('news.checkOutThisArticle')}
            buttonText={t('news.shareArticle')}
          />
        </div>
      </SectionWrapper>
    </main>
  )
}
