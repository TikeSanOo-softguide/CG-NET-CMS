import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper, SectionHeading } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useAboutContent } from '@/hooks/useAbout'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

function AboutSkeleton() {
  return (
    <SectionWrapper>
      <div className="space-y-4 max-w-3xl mx-auto">
        {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-5 w-full" />)}
      </div>
    </SectionWrapper>
  )
}

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage

  usePageTitle(t('about.pageTitle'))

  const { data: about, isLoading, isError, refetch } = useAboutContent()

  if (isLoading) return <AboutSkeleton />
  if (isError || !about) return <ErrorMessage onRetry={() => void refetch()} />

  return (
    <main>
      <PageHeader
        title={t('about.title')}
        subtitle={getLocalized(about.tagline, lang)}
      />

      {/* Stats */}
      <section className="bg-brand-800 text-white py-10 px-4" aria-label="Company statistics">
        <div className="container">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {about.stats.map((stat, i) => (
              <div key={i}>
                <dt className="text-sm text-blue-200 mb-1">{getLocalized(stat.label, lang)}</dt>
                <dd className="text-3xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Our Story */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('about.ourStory')}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t('about.storyText1')}</p>
            <p className="text-muted-foreground leading-relaxed">{t('about.storyText2')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary">{about.foundedYear}</p>
              <p className="text-sm text-muted-foreground mt-1">Founded</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary">{about.employees}</p>
              <p className="text-sm text-muted-foreground mt-1">Employees</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary">{about.coverageAreas}+</p>
              <p className="text-sm text-muted-foreground mt-1">Cities</p>
            </div>
            <div className="bg-primary/10 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary">99.9%</p>
              <p className="text-sm text-muted-foreground mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <Separator />

      {/* Mission & Vision */}
      <SectionWrapper className="bg-muted/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedCard variant="fade-right" delay={0} className="rounded-lg">
            <Card className="h-full card-shine card-glow border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">🎯</span>
                  {t('about.ourMission')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {getLocalized(about.mission, lang)}
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
          <AnimatedCard variant="fade-left" delay={100} className="rounded-lg">
            <Card className="h-full card-shine card-glow border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">🔭</span>
                  {t('about.ourVision')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {getLocalized(about.vision, lang)}
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </SectionWrapper>

      {/* Team */}
      <SectionWrapper>
        <SectionHeading title={t('about.ourTeam')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {about.team.map((member, i) => (
            <AnimatedCard key={member.id} delay={i * 100} variant="zoom-in" className="rounded-lg">
            <Card className="text-center h-full card-shine card-glow border">
              <CardHeader>
                <div
                  className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl"
                  aria-hidden="true"
                >
                  👤
                </div>
                <CardTitle className="text-base">{getLocalized(member.name, lang)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{getLocalized(member.role, lang)}</p>
              </CardContent>
            </Card>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}
