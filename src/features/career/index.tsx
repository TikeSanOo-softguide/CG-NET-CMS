import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Clock, ArrowRight, DollarSign, TrendingUp, Heart, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper, SectionHeading } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { EmptyState } from '@/components/common/EmptyState'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useCareers } from '@/hooks/useCareers'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, formatDate, getDateLocale } from '@/lib/utils'
import { normalizeLanguage } from '@/lib/i18n'

const BENEFITS = [
  { icon: DollarSign, titleKey: 'career.benefit1', descKey: 'career.benefit1Desc', color: 'text-green-500' },
  { icon: TrendingUp, titleKey: 'career.benefit2', descKey: 'career.benefit2Desc', color: 'text-blue-500' },
  { icon: Heart, titleKey: 'career.benefit3', descKey: 'career.benefit3Desc', color: 'text-red-500' },
  { icon: Users, titleKey: 'career.benefit4', descKey: 'career.benefit4Desc', color: 'text-purple-500' },
]

function CareerSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5 mt-2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-32" />
      </CardFooter>
    </Card>
  )
}

export default function CareerPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)

  usePageTitle(t('career.pageTitle'))

  const { data: careers, isLoading, isError, refetch } = useCareers()

  return (
    <main>
      <PageHeader title={t('career.title')} subtitle={t('career.subtitle')} />

      {/* Why Join */}
      <SectionWrapper className="bg-muted/40">
        <SectionHeading title={t('career.whyJoin')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(({ icon: Icon, titleKey, descKey, color }, i) => (
            <AnimatedCard key={titleKey} delay={i * 90} variant="fade-up" className="rounded-lg">
            <Card className="text-center h-full card-shine card-glow border">
              <CardHeader className="pb-2">
                <div className={`mx-auto mb-3 ${color}`} aria-hidden="true">
                  <Icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-base">{t(titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{t(descKey)}</CardDescription>
              </CardContent>
            </Card>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Open Positions */}
      <SectionWrapper>
        <SectionHeading title={t('career.openPositions')} centered={false} />

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <CareerSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {careers && careers.length === 0 && (
          <EmptyState
            title={t('career.noPositions')}
            description={t('career.noPositionsDesc')}
          />
        )}

        {careers && careers.length > 0 && (
          <div className="space-y-4">
            {careers.map((career, i) => (
              <AnimatedCard key={career.id} delay={i * 70} variant="fade-left" className="rounded-lg">
              <Card className="card-shine card-glow border">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">{getLocalized(career.title, lang)}</CardTitle>
                      <CardDescription className="mt-1">
                        {getLocalized(career.department, lang)}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{getLocalized(career.type, lang)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {getLocalized(career.description, lang)}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {getLocalized(career.location, lang)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {formatDate(career.publishedAt, getDateLocale(lang))}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full sm:w-auto gap-2">
                    <Link to={`/career/${career.slug}`}>
                      {t('career.applyNow')}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
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
