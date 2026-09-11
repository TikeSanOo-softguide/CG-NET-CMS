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
    <Card className="group flex h-full flex-col overflow-hidden border shadow-sm card-glow">
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

  function getCardClass(rowLength: number, index: number) {
    if (rowLength === 2) {
      if (index === 0) {
        return 'lg:col-start-2 lg:col-span-2'
      }

      return 'lg:col-start-4 lg:col-span-2'
    }

    return 'lg:col-span-2'
  }

  return (
    <main>
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />

      <SectionWrapper spacing="tight" className="bg-muted/40">
        {/* 1. Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
          <div className="space-y-6">
            {Array.from({ length: Math.ceil(services.length / 3) }, (_, rowIndex) => {
              const rowServices = services.slice(rowIndex * 3, rowIndex * 3 + 3)

              return (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6"
                >
                  {rowServices.map((service, i) => (
                    <div key={service.id} className={getCardClass(rowServices.length, i)}>
                      <ServiceCard service={service} lang={lang} delay={(rowIndex * 3 + i) * 80} />
                    </div>
                  ))}
                </div>
              )
            })}
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              t={t}
              disabled={isFetching}
            />
          </div>
        )}
      </SectionWrapper>
    </main>
  )
}
