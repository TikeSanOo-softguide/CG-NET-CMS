import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { usePageTitle } from '@/hooks/usePageTitle'
import CommonTab from '@/components/common/CommonTab'
import OtherPackage from './OtherPackage'
import { useNetworks, useOtherPackages, usePackages } from '@/hooks/usePackages'
import i18n from '@/lib/i18n'
import PackageSelection from './PackageSelection'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorMessage } from '@/components/common/ErrorMessage'

export default function PackagesPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? ''
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const {
    data: packages,
    isLoading: packagesLoading,
    isError: packagesError,
    refetch: refetchPackages,
  } = usePackages()
  const {
    data: addons,
    isLoading: addonsLoading,
    isError: addonsError,
    refetch: refetchAddons,
  } = useOtherPackages()
  const {
    data: networks,
    isLoading: networksLoading,
    isError: networksError,
    refetch: refetchNetworks,
  } = useNetworks()
  usePageTitle(t('packages.pageTitle'))

  const FILTERS = useMemo(() => {
  const networkFilters =
    networks?.map((network) => ({
      value: String(network.id),
      label:
        network.name[
          i18n.language as 'en' | 'zh' | 'my'
        ] ?? network.name.en,
    })) ?? []

    return [
      ...networkFilters,
      {
        value: 'other-service',
        label: t('packages.OtherService'),
      },
    ]
  }, [networks, i18n.language])

  const DEFAULT_CATEGORY = FILTERS[0]?.value ?? ''

  useEffect(() => { if (!FILTERS.length) { return } 
  const category = searchParams.get('category') 
  const validCategory = FILTERS.some( 
    (filter) => filter.value === category ) ? category! : DEFAULT_CATEGORY 
    if (activeFilter !== validCategory) { setActiveFilter(validCategory) } 
    if (category !== validCategory) { 
      setSearchParams( 
        { category: validCategory }, 
        { replace: true } 
      ) 
    } 
  }, [ 
    searchParams, 
    FILTERS, 
    DEFAULT_CATEGORY, 
    activeFilter, 
    setSearchParams, 
  ])

  function handleFilterChange(value: string) { 
    setActiveFilter(value) 
    if (value) { 
      setSearchParams({ category: value }) 
    } else { 
      setSearchParams({}) 
    } 
  }

  function renderPackageContent() {
    if (activeFilter === 'other-service') {
      return <OtherPackage addons={addons ?? []} />
    }

    const selectedNetwork = networks?.find(
      (network) => String(network.id) === activeFilter
    )

    const selectedPackages =
      packages?.filter(
        (pkg) => pkg.network.id === selectedNetwork?.id
      ) ?? []

    if (!selectedNetwork) {
      return null
    }

    return (
      <PackageSelection
        key={activeFilter}
        network={selectedNetwork}
        packages={selectedPackages}
      />
    )
  }

  const isLoading =
  networksLoading ||
  packagesLoading ||
  (activeFilter === 'other-service' && addonsLoading)

  const isError =
    networksError ||
    packagesError ||
    (activeFilter === 'other-service' && addonsError)

  const handleRetry = () => {
    void refetchNetworks()
    void refetchPackages()

    if (activeFilter === 'other-service') {
      void refetchAddons()
    }
  }

  if (isLoading) {
    return (
      <SectionWrapper>
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-10 w-full max-w-2xl mb-3" />
        <Skeleton className="h-5 w-1/2 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </SectionWrapper>
    )
  }

  if (isError) {
    return (
      <SectionWrapper>
        <ErrorMessage onRetry={handleRetry} />
      </SectionWrapper>
    )
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