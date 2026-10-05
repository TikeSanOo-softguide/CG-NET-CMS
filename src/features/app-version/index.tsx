import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useAppVersion } from '@/hooks/useAppVersion'
import { normalizeLanguage } from '@/lib/i18n'
import type { AppPlatform, AppVersionItem } from '@/types/app-version'
import { ChevronRight } from 'lucide-react'
import DirectionAwareButton from '@/components/common/DirectionAwareButton'

export default function AppVersionPage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)

  usePageTitle(t('nav.yaungNiOoApp'))

  const [isExpanded, setIsExpanded] = useState(false)
  const [activePlatform, setActivePlatform] = useState<AppPlatform>('android')
  const versionCardRef = useRef<HTMLDivElement>(null)
  const versionCardTopRef = useRef<number | null>(null)

  const { data, isLoading, isError, refetch } = useAppVersion()

  const versionsByPlatform = useMemo(() => {
    const map: Record<AppPlatform, AppVersionItem | undefined> = {
      android: undefined,
      ios: undefined,
    }

    for (const version of data?.data ?? []) {
      if (version.platform === 'android' || version.platform === 'ios') {
        map[version.platform] = version
      }
    }

    return map
  }, [data])

  const currentVersion = versionsByPlatform[activePlatform]

  const releaseNotes =
    currentVersion?.release_notes?.[lang] || currentVersion?.release_notes?.en || ''
  const versionText = currentVersion?.version ? `V${currentVersion.version}` : ''

  useLayoutEffect(() => {
    const versionCard = versionCardRef.current
    if (!versionCard) return

    if (isExpanded && versionCardTopRef.current !== null) {
      const offset = versionCardTopRef.current - versionCard.getBoundingClientRect().top
      versionCard.style.transform = `translateY(${offset}px)`
    } else {
      versionCard.style.transform = ''
    }
  }, [isExpanded])

  return (
    <main className="min-h-screen">
      <PageHeader title={t('nav.yaungNiOoApp')} subtitle={t('app-version.description')} />

      <SectionWrapper className="bg-muted/40 pt-14 pb-14 md:pt-18 md:pb-10">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-font-blue shadow-lg shadow-slate-200/60 md:h-20 md:w-20">
            <img
              src="/assets/logo/logo.svg"
              alt="Yaung Ni Oo App Icon"
              className="h-20 w-20 p-2 object-contain md:h-20 md:w-20 md:p-3"
            />
          </div>

          <h1 className="mb-4 text-xl font-bold tracking-tight text-font-blue md:text-[35px]">
            {t('nav.yaungNiOoApp')}
          </h1>

          <p className="max-w-3xl px-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('home.downloadSub1')} {t('home.downloadSub2')}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper spacing="compact" className="bg-muted/40 pb-14 pt-4 md:pb-14 md:pt-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 rounded-[2rem] border border-white/5 bg-app-accent-bg p-8 shadow-xl md:flex-row md:p-10">
          <div ref={versionCardRef} className="flex shrink-0 items-center justify-center">
            {isLoading ? (
              <div className="flex h-28 w-28 animate-pulse items-center justify-center rounded-xl border-2 border-muted bg-muted/10 shadow-sm">
                <div className="h-8 w-16 rounded bg-muted-foreground/20 md:h-10 md:w-20"></div>
              </div>
            ) : isError || !versionText ? (
              <div className="h-28 w-28 rounded-xl border-2 border-muted/30 bg-muted/5 shadow-sm"></div>
            ) : (
              <DirectionAwareButton
                to=""
                label={versionText}
                className="flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-font-... border-font-blue bg-app-accent-bg text-lg font-bold text-font-blue shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md md:text-xl"
              />
            )}
          </div>
          <div className="w-full flex-1 text-left">
            <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <h2 className="text-xl font-bold text-font-blue transition-all duration-300 md:text-[35px]">
                {t('app-version.whatsNew')} {versionText}
              </h2>

              {/* Dynamic Platform Buttons */}
              <div className="inline-flex rounded-lg border border-border/50 bg-muted/50 p-1">
                {data?.data?.map((version) => {
                  if (version.platform !== 'android' && version.platform !== 'ios') return null

                  return (
                    <button
                      key={version.platform}
                      type="button"
                      onClick={() => {
                        versionCardTopRef.current = null
                        setActivePlatform(version.platform as AppPlatform)
                        setIsExpanded(false)
                      }}
                      className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                        activePlatform === version.platform
                          ? 'bg-white text-font-blue shadow-sm'
                          : 'text-font-muted hover:text-font-black'
                      }`}
                    >
                      {version.platform.toLowerCase() === 'ios'
                        ? 'iOS'
                        : version.platform.charAt(0).toUpperCase() +
                          version.platform.slice(1).toLowerCase()}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* --- Release Notes --- */}
            <div className="mb-6">
              {isLoading ? (
                <div className="flex max-w-2xl flex-col gap-3 animate-pulse">
                  <div className="h-4 w-full rounded-md bg-muted-foreground/20"></div>
                  <div className="h-4 w-11/12 rounded-md bg-muted-foreground/20"></div>
                  <div className="h-4 w-full rounded-md bg-muted-foreground/20"></div>
                  <div className="h-4 w-5/6 rounded-md bg-muted-foreground/20"></div>
                  <div className="h-4 w-4/5 rounded-md bg-muted-foreground/20"></div>
                </div>
              ) : isError ? (
                <ErrorMessage onRetry={() => void refetch()} />
              ) : (
                <>
                  <div
                    className={`max-w-2xl text-[15px] leading-relaxed text-font-muted transition-all duration-300 md:text-base overflow-hidden ${
                      !isExpanded ? 'line-clamp-5' : ''
                    }`}
                  >
                    {/* 使用 \n 将发行说明分行显示 */}
                    {releaseNotes ? (
                      releaseNotes.split('\n').map((line, index) => (
                        <p key={index} className="mb-1">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p>No release notes available for this version yet.</p>
                    )}
                  </div>

                  {/* 核心修复：将 length > 220 更改为 split('\n').length > 5 */}
                  {releaseNotes && releaseNotes.split('\n').length > 5 && (
                    <button
                      type="button"
                      onClick={() => {
                        const willExpand = !isExpanded
                        versionCardTopRef.current = willExpand
                          ? (versionCardRef.current?.getBoundingClientRect().top ?? null)
                          : null
                        setIsExpanded(willExpand)
                      }}
                      className="mt-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
                    >
                      {isExpanded ? 'See less' : 'See more'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Mobile Section */}
      <SectionWrapper className="border-t border-white/5 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="relative flex w-full justify-center md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop"
              alt="Mobile App"
              className="h-[300px] w-full max-w-[500px] rounded-2xl object-cover drop-shadow-2xl md:h-[400px]"
            />
          </div>

          <div className="w-full text-left md:w-1/2">
            <h2 className="mb-4 text-xl font-bold leading-[1.8] tracking-tight text-font-blue md:text-[35px]">
              {t('app-version.mobileTitle')}
            </h2>
            <p className="mb-6 max-w-lg text-[15px] leading-[2] text-gray-400 md:text-base">
              {t('app-version.mobileDesc')}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-500 font-medium transition-colors hover:text-blue-400"
            >
              {t('app-version.mobileLink')} <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Tablet Section */}
      <SectionWrapper className="border-t border-white/5 bg-muted/40 py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="w-full md:w-1/2 md:pr-4">
            <h2 className="mb-4 text-xl font-bold leading-[1.8] tracking-tight text-font-blue md:text-[35px]">
              {t('app-version.tabletTitle')}
            </h2>
            <p className="mb-6 max-w-lg text-[15px] leading-[2] text-gray-400 md:text-base">
              {t('app-version.tabletDesc')}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-500 font-medium transition-colors hover:text-blue-400"
            >
              {t('app-version.tabletLink')} <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          <div className="relative flex w-full justify-center md:w-1/2 md:justify-end">
            <div className="w-full max-w-[500px] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop"
                alt="Tablet App"
                className="h-[300px] w-full rounded-xl object-cover md:h-[400px]"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
