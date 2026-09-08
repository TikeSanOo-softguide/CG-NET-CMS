import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks/usePageTitle'
import { SectionHeading, SectionWrapper } from '@/components/common/SectionWrapper'
import { PageHeader } from '@/components/common/PageHeader'

export default function NotFoundPage() {
  const { t } = useTranslation()

  usePageTitle(t('common.notFound'))

  return (
    <div>
      <PageHeader
        title="Location"
        subtitle="Available in 20+ cities and still growing"
      />
      
      <SectionWrapper>
        <SectionHeading
          eyebrow={t('home.featuredEyebrow')}
          title={t('home.featuredPackages')}
        />

      </SectionWrapper>
              
    </div>
  )
}