import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { usePageTitle } from '@/hooks/usePageTitle'
import CommonTab from '@/components/common/CommonTab'
import PackageSelection from './PackageSelection'
import OtherPackage from './OtherPackage'
import networkPackages from '@/lib/content/package'

const FILTERS = [
  { value: 'mm-broadband', labelKey: 'services.mmBroadband.title' },
  { value: 'cg-broadband', labelKey: 'services.cgBroadband.title' },
  { value: 'cg-net-broadband', labelKey: 'services.cgNetBroadband.title' },
  { value: 'iptv-service', labelKey: 'services.iptv.title' },
] 

export default function PackagesPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? ''
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  usePageTitle(t('packages.pageTitle'))
  const DEFAULT_CATEGORY = 'mm-broadband'

  useEffect(() => {
    const category = searchParams.get('category')

    const validCategory = FILTERS.some(
      (filter) => filter.value === category
    )
      ? category!
      : DEFAULT_CATEGORY

    setActiveFilter(validCategory)
  }, [searchParams])

  function handleFilterChange(value: string) {
    setActiveFilter(value)
    if (value) setSearchParams({ category: value })
    else setSearchParams({})
  }

  function renderPackageContent() {
    switch (activeFilter) {
      case 'mm-broadband':
      case 'cg-broadband':
      case 'cg-net-broadband':
        return <PackageSelection
                  key={activeFilter}
                  network={networkPackages[activeFilter]}
                />

      case 'iptv-service':
        return <OtherPackage />

      default:
        return <PackageSelection
                  key={activeFilter}
                  network={networkPackages[DEFAULT_CATEGORY]}
                />
    }
  }

  return (
    <main>
      <PageHeader title={t('packages.title')} subtitle={t('packages.subtitle')} />
        <SectionWrapper>
          <CommonTab
            filters={FILTERS}
            activeValue={activeFilter}
            onValueChange={handleFilterChange}
          />
          <div className="mt-6">
            {renderPackageContent()}
          </div>
      </SectionWrapper>
    </main>
  )
}