import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { usePackages } from '@/hooks/usePackages'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, getLocalizedArray, formatCurrency } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

const FILTERS = [
  { value: '', labelKey: 'packages.filterAll' },
  { value: 'home', labelKey: 'packages.filterHome' },
  { value: 'business', labelKey: 'packages.filterBusiness' },
  { value: 'enterprise', labelKey: 'packages.filterEnterprise' },
]

function PackageSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-10 w-1/2" />
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export default function PackagesPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? ''
  const [activeFilter, setActiveFilter] = useState(initialCategory)

  usePageTitle(t('packages.pageTitle'))

  const { data: packages, isLoading, isError, refetch } = usePackages(activeFilter || undefined)

  function handleFilterChange(value: string) {
    setActiveFilter(value)
    if (value) setSearchParams({ category: value })
    else setSearchParams({})
  }

  return (
    <main>
      <PageHeader title={t('packages.title')} subtitle={t('packages.subtitle')} />

      <SectionWrapper>
        {/* Category filter tabs */}
        <div className="mb-8 flex justify-center">
          <Tabs value={activeFilter} onValueChange={handleFilterChange}>
            <TabsList className="flex-wrap h-auto gap-1">
              {FILTERS.map(({ value, labelKey }) => (
                <TabsTrigger key={value} value={value}>
                  {t(labelKey)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <PackageSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {packages && packages.length === 0 && (
          <EmptyState
            title={t('common.noData')}
            description={t('common.emptyStateDesc')}
          />
        )}

        {packages && packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <AnimatedCard key={pkg.id} delay={i * 90} variant="zoom-in" className="rounded-lg">
              <Card
                className={`relative flex flex-col h-full card-shine card-glow ${pkg.isPopular ? 'border-primary ring-2 ring-primary' : 'border'}`}
              >
                {pkg.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {t('common.popular')}
                  </Badge>
                )}
                <CardHeader>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {getLocalized(pkg.categoryLabel, lang)}
                  </div>
                  <CardTitle className="text-xl">{getLocalized(pkg.title, lang)}</CardTitle>
                  <CardDescription>{getLocalized(pkg.description, lang)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-5">
                    <span className="text-4xl font-bold text-primary">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className="text-muted-foreground">{t('packages.perMonth')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                    <div className="bg-muted rounded p-2.5 text-center">
                      <p className="text-muted-foreground text-xs">{t('packages.download')}</p>
                      <p className="font-semibold">{pkg.downloadSpeed} Mbps</p>
                    </div>
                    <div className="bg-muted rounded p-2.5 text-center">
                      <p className="text-muted-foreground text-xs">{t('packages.upload')}</p>
                      <p className="font-semibold">{pkg.uploadSpeed} Mbps</p>
                    </div>
                  </div>

                  <ul className="space-y-2" aria-label={`${getLocalized(pkg.title, lang)} features`}>
                    {getLocalizedArray(pkg.features, lang).map((feature, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={pkg.isPopular ? 'default' : 'outline'}
                  >
                    <Link to={`/packages/${pkg.slug}`}>{getLocalized(pkg.cta, lang)}</Link>
                  </Button>
                </CardFooter>
              </Card>
              </AnimatedCard>
            ))}
          </div>
        )}
      </SectionWrapper>
    </main>
  )
}
