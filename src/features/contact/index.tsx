import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Clock, Facebook, Youtube } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { ContactForm } from '@/components/forms/ContactForm'
import { useContactInfo } from '@/hooks/useAbout'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

export default function ContactPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage

  usePageTitle(t('contact.pageTitle'))

  const { data: contactInfo, isLoading, isError, refetch } = useContactInfo()

  return (
    <main>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact form */}
          <AnimatedCard variant="fade-right" delay={0} className="lg:col-span-2 rounded-lg" hoverClass="">
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contact.title')}</h2>
              <ContactForm />
            </div>
          </AnimatedCard>

          {/* Contact info sidebar */}
          <div className="space-y-4">
            {isLoading && (
              <Card>
                <CardContent className="pt-6 space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-5 w-full" />
                  ))}
                </CardContent>
              </Card>
            )}

            {isError && <ErrorMessage onRetry={() => void refetch()} />}

            {contactInfo && (
              <>
                <AnimatedCard variant="fade-left" delay={80} className="rounded-lg">
                  <Card className="card-shine card-glow border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{t('contact.info.phone')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        {contactInfo.phone}
                      </a>
                      <a
                        href={`tel:${contactInfo.hotline}`}
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        {contactInfo.hotline} ({t('contact.info.hotline')})
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                <AnimatedCard variant="fade-left" delay={160} className="rounded-lg">
                  <Card className="card-shine card-glow border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{t('contact.info.email')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        {contactInfo.email}
                      </a>
                      <a
                        href={`mailto:${contactInfo.salesEmail}`}
                        className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        {contactInfo.salesEmail}
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                <AnimatedCard variant="fade-left" delay={240} className="rounded-lg">
                  <Card className="card-shine card-glow border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{t('contact.info.address')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <address className="not-italic">
                          {getLocalized(contactInfo.address, lang)}
                        </address>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{getLocalized(contactInfo.workingHours, lang)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                <AnimatedCard variant="fade-left" delay={320} className="rounded-lg">
                  <Card className="card-shine card-glow border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{t('contact.info.social')}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                      <a
                        href={contactInfo.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="CG-NET Facebook"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Facebook className="h-5 w-5" aria-hidden="true" />
                      </a>
                      <a
                        href={contactInfo.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="CG-NET YouTube"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Youtube className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </>
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
