import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { cn, getLocalized, formatDate, getDateLocale } from '@/lib/utils'
import type { NewsArticle } from '@/types'
import type { SupportedLanguage } from '@/lib/i18n/languages'

interface NewsCardProps {
  article: NewsArticle
  lang: SupportedLanguage
  delay?: number
  compact?: boolean
}

export function NewsCard({ article, lang, delay = 0, compact = false }: NewsCardProps) {
  const { t } = useTranslation()

  return (
    <AnimatedCard delay={delay} variant="rise" className="rounded-[20px] h-full">
      <Card
        className={cn(
          'group flex flex-col overflow-hidden border shadow-sm card-glow rounded-[20px]',
          compact ? 'h-[300px]' : 'h-full'
        )}
      >
        <Link
          to={`/news/${article.slug}`}
          className={cn('card-media relative block', compact ? 'h-[150px]' : 'h-44')}
        >
          <img
            src={article.imageUrl}
            alt={getLocalized(article.title, lang)}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3" variant="secondary">
            {getLocalized(article.category, lang)}
          </Badge>
        </Link>

        <CardHeader className={cn('pb-2', compact && 'px-4 pt-3')}>
          <CardTitle className={cn('leading-snug line-clamp-2', compact ? 'text-sm' : 'text-base')}>
            <Link to={`/news/${article.slug}`} className="hover:text-primary transition-colors">
              {getLocalized(article.title, lang)}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className={cn('flex-1 pt-0', compact && 'px-4')}>
          <CardDescription className={cn(compact ? 'line-clamp-2 text-xs' : 'line-clamp-3')}>
            {getLocalized(article.excerpt, lang)}
          </CardDescription>
        </CardContent>

        <CardFooter className={cn('flex items-center justify-between gap-2 pt-0', compact && 'px-4 pb-3')}>
          <span className="text-xs text-muted-foreground">
            {formatDate(article.publishedAt, getDateLocale(lang))}
          </span>
          <Button variant="ghost" size="sm" asChild className="h-8 gap-1 px-2 text-primary hover:text-primary">
            <Link to={`/news/${article.slug}`}>
              {t('common.readMore')}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  )
}
