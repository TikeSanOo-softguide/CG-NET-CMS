import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { useServices } from '@/hooks/useServices'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'

function ServiceSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-2">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
      </CardContent>
    </Card>
  )
}

export default function ServicesPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  usePageTitle(t('services.pageTitle'))

  const { data: services, isLoading, isError, refetch } = useServices()

  return (
    <main>
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />

      <SectionWrapper>
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <ServiceSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {services && services.length === 0 && <EmptyState />}

        {services && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} lang={lang} delay={i * 80} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </main>
  )
}
