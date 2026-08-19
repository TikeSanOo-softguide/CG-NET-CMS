import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocalized, getLocalizedArray, formatCurrency } from '@/lib/utils'
import type { Package } from '@/types'
import type { SupportedLanguage } from '@/lib/i18n/languages'

interface PackageCardProps {
  pkg: Package
  lang: SupportedLanguage
  delay?: number
}

export function PackageCard({ pkg, lang }: PackageCardProps) {
  const { t } = useTranslation()
  const features = getLocalizedArray(pkg.features, lang).slice(0, 4)

  return (
    <Card
      className={[
        'group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[12px] border bg-card shadow-sm',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.02] hover:shadow-lg hover:border-primary/40',
        pkg.isPopular ? 'border-primary/50' : 'border-border/80',
      ].join(' ')}
    >
      <div className="card-media relative h-44 overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={getLocalized(pkg.title, lang)}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <Badge variant="secondary" className="absolute left-3 top-3 bg-white/90 text-foreground">
          {getLocalized(pkg.categoryLabel, lang)}
        </Badge>
        {pkg.isPopular && (
          <Badge className="absolute right-3 top-3">{t('common.popular')}</Badge>
        )}
        <p className="absolute bottom-3 left-3 text-lg font-bold text-white drop-shadow">
          {pkg.speed}
        </p>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg leading-snug">
          {getLocalized(pkg.title, lang)}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {getLocalized(pkg.description, lang)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-0">
        <p className="mb-4 text-2xl font-bold text-primary">
          {formatCurrency(pkg.price)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            {t('packages.perMonth')}
          </span>
        </p>

        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
              <span className="line-clamp-2">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <Button asChild className="w-full gap-2 rounded-[12px]" variant={pkg.isPopular ? 'default' : 'outline'}>
            <Link to={`/packages/${pkg.slug}`}>
              {getLocalized(pkg.cta, lang)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
