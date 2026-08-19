import { useTranslation } from 'react-i18next'
import { Download, UserPlus, BarChart2, CreditCard, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { useGuides } from '@/hooks/useGuides'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, getLocalizedArray } from '@/lib/utils'
import { normalizeLanguage } from '@/lib/i18n'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Download, UserPlus, BarChart2, CreditCard, AlertCircle,
}

function GuideSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-10 rounded-full mb-2" />
        <Skeleton className="h-6 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}

export default function AppGuidePage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)

  usePageTitle(t('appGuide.pageTitle'))

  const { data: guides, isLoading, isError, refetch } = useGuides()

  return (
    <main>
      <PageHeader title={t('appGuide.title')} subtitle={t('appGuide.subtitle')} />

      <SectionWrapper>
        {/* App download links */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto"
            aria-label="Download on the App Store"
          >
            <span className="text-2xl" aria-hidden="true">🍎</span>
            <div className="text-left">
              <p className="text-xs text-gray-300">Download on the</p>
              <p className="font-semibold">{t('appGuide.iosApp')}</p>
            </div>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto"
            aria-label="Get it on Google Play"
          >
            <span className="text-2xl" aria-hidden="true">🤖</span>
            <div className="text-left">
              <p className="text-xs text-gray-300">Get it on</p>
              <p className="font-semibold">{t('appGuide.androidApp')}</p>
            </div>
          </a>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map((i) => <GuideSkeleton key={i} />)}
          </div>
        )}

        {isError && <ErrorMessage onRetry={() => void refetch()} />}

        {guides && (
          <>
            {/* Overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {guides.map((step, index) => {
                const IconComp = ICON_MAP[step.icon] ?? Download
                return (
                  <AnimatedCard key={step.id} delay={index * 80} variant="zoom-in" className="rounded-lg">
                  <Card className="h-full card-shine card-glow border">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <IconComp className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {t('appGuide.stepBy')} {index + 1}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{getLocalized(step.title, lang)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {getLocalized(step.description, lang)}
                      </p>
                    </CardContent>
                  </Card>
                  </AnimatedCard>
                )
              })}
            </div>

            {/* Detailed steps accordion */}
            <h2 className="text-2xl font-bold mb-6">{t('appGuide.overview')}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {guides.map((step, index) => {
                const steps = getLocalizedArray(step.steps, lang)
                return (
                  <AccordionItem key={step.id} value={step.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0" aria-hidden="true">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-sm sm:text-base min-w-0">{getLocalized(step.title, lang)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-3 pl-0 sm:pl-10">
                        {getLocalized(step.description, lang)}
                      </p>
                      <ol className="pl-0 sm:pl-10 space-y-2" aria-label={`Steps for ${getLocalized(step.title, lang)}`}>
                        {steps.map((s, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary font-semibold shrink-0" aria-hidden="true">{i + 1}.</span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </>
        )}
      </SectionWrapper>
    </main>
  )
}
