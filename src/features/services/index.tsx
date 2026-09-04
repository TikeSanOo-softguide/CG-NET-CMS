import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'
import { serviceContent } from '@/lib/content/service'

export default function ServicesPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  usePageTitle(t('services.pageTitle'))

  return (
    <main>
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} />

      <SectionWrapper spacing="tight">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceContent.services.map((service, i) => (
            <div key={service.id} className={i === 3 ? 'lg:col-span-3' : ''}>
              <ServiceCard
                service={service}
                lang={lang}
                delay={i * 80}
                featured={i === 3}
              />
            </div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}
