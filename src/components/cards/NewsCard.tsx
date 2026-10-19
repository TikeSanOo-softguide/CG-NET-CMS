import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { cn, getLocalized, formatDate, getDateLocale } from '@/lib/utils'
import { newsDescClass, newsTitleClass, typeNewsChip } from '@/lib/typography'
import type { SupportedLanguage } from '@/lib/i18n/languages'
import { NewsArticle } from '@/types/new'
import { useState } from 'react'

interface NewsCardProps {
  article: NewsArticle
  lang: SupportedLanguage
  delay?: number
  compact?: boolean
}

export function NewsCard({ article, lang, delay = 0, compact = false }: NewsCardProps) {
  const { t } = useTranslation()
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`

  const [imageError, setImageError] = useState(false)

  return (
    <AnimatedCard delay={delay} variant="rise" className="h-full min-w-0 max-w-full rounded-[12px]">
      <Card
        className={cn(
          'group flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-[12px] border border-white shadow-soft !bg-app-surface'
        )}
      >
        <Link
          to={`/news/${article.slug}`}
          className="relative block w-full overflow-hidden bg-muted"
        >
          {article.image_url && !imageError ? (
            <img
              src={`${STORAGE_URL}/${article.image_url}`}
              alt={getLocalized(article.title, lang)}
              className="block h-auto w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center bg-muted">
              <img
                src="/assets/logo/logo-muted.png"
                alt="No image available"
                className="h-16 w-auto object-contain opacity-60"
              />
            </div>
          )}
        </Link>

        <CardHeader className={cn('space-y-2.5 pb-2 pt-4', compact && 'px-4')}>
          <span className={typeNewsChip}>
            {article.category ? getLocalized(article.category.name, lang) : t('common.noData')}
          </span>
          <CardTitle
            className={cn(
              newsTitleClass(lang),
              'line-clamp-2 overflow-hidden text-ellipsis',
              lang === 'my' ? 'min-h-[3.1em]' : 'min-h-[2.6em]',
              compact && 'text-h4'
            )}
          >
            <Link
              to={`/news/${article.slug}`}
              className="transition-colors duration-200 hover:text-app-primary"
            >
              {getLocalized(article.title, lang)}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className={cn('flex-1 pt-0', compact && 'px-4')}>
          <CardDescription
            className={cn(
              newsDescClass(lang),
              'line-clamp-2',
              lang === 'my' ? 'min-h-[3.4em]' : 'min-h-[3.1em]'
            )}
          >
            {getLocalized(article.description, lang)}
          </CardDescription>
        </CardContent>

        <CardFooter
          className={cn(
            'relative flex items-center justify-between gap-2 px-6 pb-3 pt-2',
            compact && 'px-4 pb-2.5'
          )}
        >
          <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-border" />

          <span className="text-caption tracking-[0.02em] text-muted-foreground">
            {formatDate(article.created_at, getDateLocale(lang))}
          </span>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-6 gap-0.5 px-1.5 text-caption font-medium text-font-blue hover:bg-transparent hover:text-font-blue"
          >
            <Link to={`/news/${article.slug}`}>
              {t('common.readMore')}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  )
}
