import { useTranslation } from 'react-i18next'
import { Zap, Home, Wifi, Building2, Cloud, Tv } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useServices } from '@/hooks/useServices'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, getLocalizedArray } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

// Map icon string names to components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Home, Wifi, Building2, Cloud, Tv,
}

function ServiceSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-10 rounded-full mb-3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="space-y-2">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
      </CardContent>
    </Card>
  )
}

export default function ServicesPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage
  usePageTitle(t('services.pageTitle'))

  const { data: services, isLoading, isError, refetch } = useServices()

  return (
    <main>
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />

      <SectionWrapper>
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <ServiceSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {services && services.length === 0 && <EmptyState />}

        {services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const IconComp = ICON_MAP[service.icon] ?? Zap
              const features = getLocalizedArray(service.features, lang)

              return (
                <AnimatedCard key={service.id} delay={i * 80} variant="fade-up" className="rounded-lg">
                <Card className="h-full card-shine card-glow border group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <IconComp className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{getLocalized(service.title, lang)}</CardTitle>
                    <CardDescription>{getLocalized(service.description, lang)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2" aria-label={`${getLocalized(service.title, lang)} features`}>
                      {features.map((feature, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 font-bold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                </AnimatedCard>
              )
            })}
          </div>
        )}
      </SectionWrapper>
    </main>
  )
}
