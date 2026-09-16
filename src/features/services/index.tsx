import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { useServices } from '@/hooks/useServices'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import Pagination from '@/components/common/pagination'
import { useState } from 'react'

function ServiceSkeleton() {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border shadow-sm card-glow ">
      {/* Image section */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <Skeleton className="mb-3 h-6 w-3/5" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-5">
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </Card>
  )
}

export default function ServicesPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)

  usePageTitle(t('services.pageTitle'))

  const [page, setPage] = useState(1)
  const PAGE_SIZE = 6

  const { data, isLoading, isError, isFetching, refetch } = useServices(page, PAGE_SIZE)
  const services = data?.data || []
  const totalPages = Math.max(1, data?.meta?.last_page ?? 1)

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />

      <SectionWrapper spacing="tight" className="flex-1 bg-muted/40">
        {/* 1. Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        )}

        {/* 2. Error */}
        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {/* 3. No data */}
        {!isLoading && !isError && services.length === 0 && (
          <EmptyState
            title={t('services.noService')}
            description={t('services.noServiceDesc')}
            className="pb-20"
          />
        )}

        {/* 4. Services data */}
        {!isLoading && !isError && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} lang={lang} delay={i * 80} />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              t={t}
              disabled={isFetching}
            />
          </>
        )}
      </SectionWrapper>
    </main>
  )
}
