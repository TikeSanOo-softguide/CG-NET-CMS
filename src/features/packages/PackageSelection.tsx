import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Coins,
  Globe,
} from 'lucide-react'

import type { Network, Package } from '@/types/package'
import { EmptyState } from '@/components/common/EmptyState'
import { t } from 'i18next'

type PackageSelectionProps = {
  network: Network
  packages: Package[]
}

type DurationOption = {
  months: number
  label: string
}

export default function PackageSelection({
  network,
  packages,
}: PackageSelectionProps) {
  const { i18n } = useTranslation()
  const currentLocale = (i18n.language as 'en' | 'zh' | 'my') || 'en'
  const networkName = network.name?.[currentLocale] ?? network.name?.en ?? ''
  const [packageStartIndex, setPackageStartIndex] = useState(0)
  const VISIBLE_PACKAGES = 4

  const speedOptions = useMemo(
    () =>
      Array.from(
        new Set(packages.map((pkg) => pkg.speed.mbps))
      ).sort((a, b) => a - b),
    [packages]
  )

  const [selectedSpeed, setSelectedSpeed] = useState<number>(
    speedOptions[0] ?? 0
  )

  const [selectedDuration, setSelectedDuration] = useState<number>(1)

  useEffect(() => {
    if (!speedOptions.length) return

    setSelectedSpeed((current) => {
      if (speedOptions.includes(current)) {
        return current
      }
      return speedOptions[0]
    })
  }, [speedOptions])

  const durationOptions = useMemo<DurationOption[]>(() => {
    const availableMonths = Array.from(
      new Set(
        packages
          .filter((pkg) => pkg.speed.mbps === selectedSpeed)
          .map((pkg) => pkg.term.months)
      )
    ).sort((a, b) => a - b)

    return availableMonths.map((months) => ({
      months,
      label: months === 12 ? `1 ${t('packages.year')}` : `${months} ${t('packages.months')}`,
    }))
  }, [packages, selectedSpeed])

  useEffect(() => {
    if (!durationOptions.length) return

    setSelectedDuration((current) => {
      if (durationOptions.some((option) => option.months === current)) {
        return current
      }

      return durationOptions[0].months
    })
  }, [durationOptions])


  const allPackageCards = useMemo(
    () =>
      speedOptions
        .map(
          (speed) =>
            packages.find((pkg) => pkg.speed.mbps === speed) ?? null
        )
        .filter((pkg): pkg is Package => pkg !== null),
    [packages, speedOptions]
  )

  const packageCards = useMemo(
    () =>
      allPackageCards.slice(
        packageStartIndex,
        packageStartIndex + VISIBLE_PACKAGES
      ),
    [allPackageCards, packageStartIndex]
  )

  const hasPreviousPackage = packageStartIndex > 0
  const hasNextPackage = packageStartIndex + VISIBLE_PACKAGES < allPackageCards.length

  const selectedPackage = useMemo(
    () =>
      packages.find(
        (pkg) =>
          pkg.speed.mbps === selectedSpeed &&
          pkg.term.months === selectedDuration
      ) ??
      packages.find((pkg) => pkg.speed.mbps === selectedSpeed) ??
      packages[0] ??
      null,
    [packages, selectedSpeed, selectedDuration]
  )

  if (!packages.length || !selectedPackage) {
    return (
      <EmptyState
        title={t('common.noData')}
        description={t('common.emptyStateDesc')}
      />
    )
  }

  const basePrice = Number(selectedPackage.price ?? 0)
  const installationFee = Number(selectedPackage.installation_fee ?? 0)
  const totalPrice = basePrice + installationFee

  const selectPackage = (pkg: Package) => {
    setSelectedSpeed(pkg.speed.mbps)
    setSelectedDuration(pkg.term.months)
  }

  const previousPackage = () => {
    setPackageStartIndex((current) => Math.max(0, current - 1))
  }

  const nextPackage = () => {
    setPackageStartIndex((current) =>
      Math.min(
        allPackageCards.length - VISIBLE_PACKAGES,
        current + 1
      )
    )
  }

  const selectedDurationIndex = durationOptions.findIndex(
    (option) => option.months === selectedDuration
  )

  const progressPercent =
    durationOptions.length > 1 && selectedDurationIndex >= 0
      ? (selectedDurationIndex / (durationOptions.length - 1)) * 100
      : 0

  return (
    <section className="px-4 py-1">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="relative">
              {hasPreviousPackage && (
                <button
                  type="button"
                  onClick={previousPackage}
                  className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:bg-neutral-50"
                  aria-label="Previous package"
                >
                  <ChevronLeft size={19} />
                </button>
              )}
              

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {packageCards.map((pkg) => {
                  const active = selectedPackage.speed.mbps === pkg.speed.mbps

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => selectPackage(pkg)}
                      className={[
                        'relative min-w-0 rounded-2xl border p-5 text-left transition-all duration-200',
                        active
                          ? 'border-app-primary bg-white shadow-lg ring-2 ring-sky-100'
                          : 'border-neutral-200 bg-white/80 shadow-sm hover:-translate-y-0.5 hover:shadow-md',
                      ].join(' ')}
                    >
                      {active && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-white">
                          <Check size={14} />
                        </div>
                      )}

                      <div className="pr-8">
                        <p
                          className={[
                            'text-sm font-bold',
                            active
                              ? 'text-font-blue'
                              : 'text-neutral-800',
                          ].join(' ')}
                        >
                          {networkName}
                        </p>
                      </div>

                      <div className="mt-4">
                        <p
                          className={[
                            'text-2xl font-bold',
                            active
                              ? 'text-font-blue'
                              : 'text-neutral-900',
                          ].join(' ')}
                        >
                          {pkg.speed.mbps}
                          <span className="ml-1 text-sm font-medium">
                            Mbps
                          </span>
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {hasNextPackage && (
                <button
                  type="button"
                  onClick={nextPackage}
                  className="absolute right-0 top-1/2 z-20 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:bg-neutral-50"
                  aria-label="Next package"
                >
                  <ChevronRight size={19} />
                </button>
              )}
            </div>

            {packageCards.length > 1 && (
              <div className="mt-4 flex justify-center gap-1.5">
                {packageCards.map((pkg) => {
                  const active =
                    selectedPackage.speed.mbps === pkg.speed.mbps

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => selectPackage(pkg)}
                      className={[
                        'h-1.5 rounded-full transition-all',
                        active ? 'w-6 bg-app-primary' : 'w-1.5 bg-neutral-300',
                      ].join(' ')}
                      aria-label={`Select package ${pkg.speed.mbps} Mbps`}
                    />
                  )
                })}
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-sm font-semibold text-neutral-800">
                    {t('packages.durationHead')}
                  </h2>

                  <p className="mt-1 text-xs text-neutral-400">
                    {t('packages.durationDec')}
                  </p>
                </div>

                <div className="relative px-2">
                  <div className="absolute left-5 right-4 top-[6px] h-1 rounded-full bg-neutral-200">
                    <div
                      className="h-full rounded-full bg-app-primary transition-all duration-300"
                      style={{
                        width: `${progressPercent}%`,
                      }}
                    />
                  </div>

                  <div className="relative flex justify-between">
                    {durationOptions.map((option) => {
                      const active = selectedDuration === option.months

                      return (
                        <button
                          key={option.months}
                          type="button"
                          onClick={() => setSelectedDuration(option.months)}
                          className="flex min-w-0 flex-col items-center"
                        >
                          <span
                            className={[
                              'h-4 w-4 rounded-full border-2 bg-white transition-all',
                              active
                                ? 'border-app-primary bg-app-primary'
                                : 'border-neutral-300',
                            ].join(' ')}
                          />

                          <span
                            className={[
                              'mt-3 text-xs font-medium',
                              active ? 'text-neutral-900' : 'text-neutral-500',
                            ].join(' ')}
                          >
                            {option.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm">
                <div className="flex h-full items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                      <Coins size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-neutral-700">
                        {t('packages.installationFee')}
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-lg font-bold text-neutral-900">
                    {installationFee.toLocaleString()} 元
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-lg xl:sticky xl:top-5">
            <div className="border-b border-neutral-200 pb-4">
              <h2 className="text-lg font-bold text-neutral-900">
                {t('packages.yourSelection')}
              </h2>

              <p className="mt-1 text-xs text-neutral-400">
                {t('packages.reviewYourPackage')}
              </p>
            </div>

            <div className="space-y-5 pt-5">
              <div>
                <p className="text-xs text-neutral-400">{t('packages.package')}</p>

                <div className="mt-2 flex items-center gap-2">
                  <Globe size={16} className="text-neutral-500" />

                  <p className="text-sm font-semibold text-neutral-900">
                    {networkName} - {selectedPackage.speed.mbps} Mbps
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-400">{t('packages.duration')}</p>

                <p className="mt-2 text-sm font-medium text-neutral-800">
                  {selectedDuration === 12
                    ? `1 ${t('packages.year')}`
                    : `${selectedDuration} ${t('packages.months')}${
                        selectedDuration > 1 ? 's' : ''
                      }`}
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-1">
                <div className="mt-1 flex items-end justify-between gap-3">
                  <span className="text-sm text-neutral-500">
                    {t('packages.totalPrice')}
                  </span>

                  <span className="text-2xl font-bold text-neutral-900">
                    {totalPrice.toLocaleString()} 元
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-neutral-50 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{t('packages.package')}</span>

                  <span className="font-medium text-neutral-800">
                    {basePrice.toLocaleString()} 元
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{t('packages.installationFee')}</span>

                  <span className="font-medium text-neutral-800">
                    {installationFee.toLocaleString()} 元
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">{t('packages.addsOn')}</span>

                  <span className="font-medium text-neutral-800">
                    {installationFee.toLocaleString()} 元
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}