import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { PackageCard } from '@/components/cards/PackageCard'
import { usePackages } from '@/hooks/usePackages'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'
import CommonTab from '@/components/common/CommonTab'

const FILTERS = [
  { value: 'mm-broadband', labelKey: 'services.mmBroadband.title' },
  { value: 'cg-broadband', labelKey: 'services.cgBroadband.title' },
  { value: 'cg-net-broadband', labelKey: 'services.cgNetBroadband.title' },
  { value: 'iptv-service', labelKey: 'services.iptv.title' },
] 

function PackageSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-7 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export default function PackagesPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
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
        <CommonTab
          filters={FILTERS}
          activeValue={activeFilter}
          onValueChange={handleFilterChange}
        />

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} lang={lang} delay={i * 90} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </main>
  )
}
