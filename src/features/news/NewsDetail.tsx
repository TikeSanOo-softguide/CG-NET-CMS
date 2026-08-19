import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import DOMPurify from 'dompurify'
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

  const { data: article, isLoading, isError, refetch } = useNewsBySlug(slug)

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

  // Sanitize HTML content before injection — never skip this step
  const rawContent = getLocalized(article.content, lang)
  const sanitizedContent = DOMPurify.sanitize(rawContent, {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })

  return (
    <main>
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" asChild className="mb-6 gap-2">
            <Link to="/news">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t('news.backToNews')}
            </Link>
          </Button>

          <article>
            <header className="mb-6">
              <Badge variant="secondary" className="mb-3">
                {getLocalized(article.category, lang)}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {getLocalized(article.title, lang)}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt, getDateLocale(lang))}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" aria-hidden="true" />
                  {getLocalized(article.author, lang)}
                </span>
              </div>

              {article.tags.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap" aria-label="Article tags">
                  <Tag className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <div className="card-media rounded-xl overflow-hidden mb-6 h-52 sm:h-72">
              <img
                src={article.imageUrl}
                alt={getLocalized(article.title, lang)}
                className="h-full w-full object-cover"
              />
            </div>

            <Separator className="mb-6" />

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {getLocalized(article.excerpt, lang)}
            </p>

            {/* Sanitized HTML content */}
            <div
              className="prose prose-slate prose-sm sm:prose-base max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </article>
        </div>
      </SectionWrapper>
    </main>
  )
}
