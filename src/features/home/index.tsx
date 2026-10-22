import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionWrapper, SectionHeading } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { PackageCarousel } from '@/components/cards/PackageCarousel'
import { NewsCard } from '@/components/cards/NewsCard'
import { HeroBanner } from './HeroBanner'
import { useLatestNews } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'
import { homeContent } from '@/lib/content/home'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLatestPromotions } from '@/hooks/usePromotion'
import { PromotionCard } from '@/components/cards/PromotionCard'
import { EmptyState } from '@/components/common/EmptyState'
import CommonTab from '@/components/common/CommonTab'
import { useGallery } from '@/hooks/useGallery'
import { cn, getLocalized } from '@/lib/utils'
import {
  cardDescClass,
  cardTitleClass,
  sectionDescClass,
  sectionTitleClass,
} from '@/lib/typography'
import { useRecommendPackage } from '@/hooks/usePackages'
import AnimatedStat from '@/components/common/AnimatedStat'
import DirectionAwareButton from '@/components/common/DirectionAwareButton'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useGsapStagger } from '@/hooks/useGsapStagger'
import { initGsap, prefersReducedMotion } from '@/lib/gsap'

const SECTION_Y = 'py-8 md:py-10 lg:py-14'

type Feature = (typeof homeContent.features)[number]

function FeatureCard({ feature, className }: { feature: Feature; className?: string }) {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  const { icon: Icon, titleKey, descKey } = feature

  return (
    <AnimatedCard
      className={cn(
        'group relative flex min-h-[180px] flex-col overflow-hidden rounded-xl border border-white bg-app-surface text-center shadow-soft',
        className
      )}
    >
      <CardHeader className="px-5 pb-1.5 pt-5">
        <div
          className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-font-blue transition-colors duration-500 group-hover:bg-app-primary group-hover:text-white"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>

        <CardTitle className={cardTitleClass(lang)}>{t(titleKey)}</CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-0">
        <CardDescription className={cn('mt-1', cardDescClass(lang))}>{t(descKey)}</CardDescription>
      </CardContent>
    </AnimatedCard>
  )
}

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  usePageTitle(t('home.pageTitle'))
  const {
    data: recommendedPackages,
    isLoading: pkgLoading,
    isError: pkgError,
  } = useRecommendPackage()
  const { data: news, isLoading: newsLoading, isError: newsError } = useLatestNews(3)
  const { data: promotions, isLoading, isError } = useLatestPromotions(3)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'news'
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const { data: galleryData, isLoading: galleryLoading, isError: galleryError } = useGallery()
  const [activeGalleryImage, setActiveGalleryImage] = useState(0)
  const [failedGalleryImages, setFailedGalleryImages] = useState<Set<string>>(() => new Set())
  const [activeFeature, setActiveFeature] = useState(0)
  const statsRef = useGsapReveal<HTMLDivElement>({ mode: 'rise' })
  const featureHeadRef = useGsapReveal<HTMLDivElement>({ mode: 'rise' })
  const featureMobileRef = useGsapStagger({ stagger: 0.1 })
  const featureTabletRef = useGsapStagger({ stagger: 0.1 })
  const featureDesktopRef = useGsapStagger({ stagger: 0.1 })
  const newsHeadRef = useGsapReveal<HTMLDivElement>({ mode: 'rise' })
  const newsGridRef = useGsapStagger({
    stagger: 0.12,
    deps: [news?.length, activeFilter],
  })
  const promoGridRef = useGsapStagger({
    stagger: 0.12,
    deps: [promotions?.length, activeFilter],
  })
  const downloadImageRef = useRef<HTMLDivElement>(null)
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`

  initGsap()
  useGSAP(
    () => {
      const el = downloadImageRef.current
      if (!el || prefersReducedMotion()) return

      // Image entrance only on laptop+ — mobile/tablet stay instant (no delay).
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: 28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
              toggleActions: 'play none none none',
            },
          }
        )
      })

      return () => mm.revert()
    },
    { scope: downloadImageRef }
  )
  const FILTERS = [
    { value: 'news', labelKey: 'home.latestNews' },
    { value: 'promotion', labelKey: 'nav.promotion' },
  ]

  function handleFilterChange(value: string) {
    setActiveFilter(value)
    if (value) setSearchParams({ category: value })
    else setSearchParams({})
  }

  const formattedRecommendedPackages = recommendedPackages
    ?.filter((pkg) => typeof pkg.imageUrl === 'string' && pkg.imageUrl.trim().length > 0)
    .map((pkg) => {
      const rawImg = pkg.imageUrl?.trim() ?? ''
      const fullImageUrl = rawImg.startsWith('http') ? rawImg : `${STORAGE_URL}/${rawImg}`

      return {
        ...pkg,
        imageUrl: fullImageUrl,
      }
    })

  return (
    <main>
      {/* Hero Banner Slider */}
      <HeroBanner lang={lang} />

      {/* Stats */}
      <div className="bg-muted/40">
        <section className="container relative z-30 -mt-3 font-head sm:-mt-8 lg:-mt-10">
          <div
            ref={statsRef}
            className="mx-auto max-w-[1200px] overflow-hidden rounded-xl border border-white bg-white shadow-soft"
          >
            <div className="grid grid-cols-2 md:grid-cols-5">
              {homeContent.stats.map(({ value, labelKey }, index) => (
                <div
                  key={labelKey}
                  className={cn(
                    'flex flex-col items-center justify-center border-border/60 px-2 text-center',

                    // Mobile
                    'h-[72px]',
                    index === 0 && 'col-span-2',
                    index <= 2 && 'border-b',
                    (index === 1 || index === 3) && 'border-r',

                    // Tablet
                    'md:col-span-1 md:h-[88px] md:border-b-0',
                    index < 4 ? 'md:border-r' : 'md:border-r-0',

                    // Laptop & desktop
                    'lg:h-[112px]'
                  )}
                >
                  <p
                    className={cn(
                      'font-extrabold tabular-nums tracking-tight text-font-blue',
                      'text-[20px]/none md:text-[25px]/none lg:text-3xl'
                    )}
                  >
                    <AnimatedStat value={value} />
                  </p>

                  <p
                    className={cn(
                      'mt-1 font-medium text-muted-foreground',
                      'text-[12px]/[1.5] md:text-[13px]/[1.5] lg:text-small'
                    )}
                  >
                    {t(labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Us */}
      <SectionWrapper className={cn('bg-muted/40', SECTION_Y)} motion="none">
        <div ref={featureHeadRef}>
          <SectionHeading eyebrow={t('home.whyChooseUs')} title={t('home.whyChooseUsTitle')} />
        </div>

        {/* ============================= */}
        {/* Mobile Design */}
        {/* ============================= */}
        <div className="md:hidden">
          <div
            ref={featureMobileRef}
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-4 scrollbar-none"
            onScroll={(e) => {
              const el = e.currentTarget
              const card = el.firstElementChild as HTMLElement | null
              if (!card) return
              setActiveFeature(Math.round(el.scrollLeft / (card.offsetWidth + 8)))
            }}
          >
            {homeContent.features.map((feature) => (
              <FeatureCard
                key={feature.titleKey}
                feature={feature}
                className="min-w-[82%] snap-center"
              />
            ))}
          </div>

          <div className="flex justify-center gap-1.5" aria-hidden="true">
            {homeContent.features.map((feature, i) => (
              <span
                key={feature.titleKey}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === activeFeature ? 'w-5 bg-app-primary' : 'w-1.5 bg-border'
                )}
              />
            ))}
          </div>
        </div>

        {/* ============================= */}
        {/* Tablet Design */}
        {/* ============================= */}
        <div ref={featureTabletRef} className="hidden grid-cols-2 gap-3 md:grid lg:hidden">
          {homeContent.features.map((feature) => (
            <FeatureCard key={feature.titleKey} feature={feature} />
          ))}
        </div>

        {/* ============================= */}
        {/* Desktop Design */}
        {/* ============================= */}
        <div ref={featureDesktopRef} className="hidden gap-3 lg:grid lg:grid-cols-3 xl:grid-cols-5">
          {homeContent.features.map((feature) => (
            <FeatureCard key={feature.titleKey} feature={feature} />
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Packages */}
      <SectionWrapper className={SECTION_Y}>
        <SectionHeading eyebrow={t('home.featuredEyebrow')} title={t('home.featuredPackages')} />

        {pkgLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="overflow-hidden rounded-xl">
                <Skeleton className="h-44 w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {pkgError && <ErrorMessage />}

        {!pkgLoading && !pkgError && formattedRecommendedPackages?.length === 0 && (
          <EmptyState title={t('common.noData')} description={t('common.emptyStateDesc')} />
        )}

        {formattedRecommendedPackages && formattedRecommendedPackages.length > 0 && (
          <PackageCarousel packages={formattedRecommendedPackages} lang={lang} />
        )}
      </SectionWrapper>

      {/* Latest News */}
      <SectionWrapper className={cn('bg-muted/40', SECTION_Y)} motion="none">
        <div ref={newsHeadRef}>
          <SectionHeading eyebrow={t('home.whatsNew')} title={t('home.latestTitle')} />
        </div>

        {/* Tabs */}
        <CommonTab
          filters={FILTERS}
          activeValue={activeFilter}
          onValueChange={handleFilterChange}
        />

        {/* NEWS TAB */}
        {activeFilter === 'news' && (
          <>
            {newsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="h-[300px] overflow-hidden rounded-xl border-white shadow-soft"
                  >
                    <Skeleton className="h-[150px] w-full rounded-none" />
                    <CardHeader className="px-4 pt-3">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full mt-2" />
                      <Skeleton className="h-3 w-4/5" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}

            {newsError && <ErrorMessage />}

            {!newsLoading && !newsError && news?.length === 0 && (
              <EmptyState title={t('news.noNews')} description={t('news.noNewsDesc')} />
            )}

            {!newsLoading && !newsError && news && (
              <div
                ref={newsGridRef}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
              >
                {news.slice(0, 3).map((article, i) => (
                  <NewsCard key={article.id} article={article} lang={lang} delay={i * 100} />
                ))}
              </div>
            )}

            {(news?.length ?? 0) > 0 && (
              <div className="text-center mt-5">
                <Button
                  variant="outline"
                  className="rounded-full bg-font-white px-6 text-body transition-colors duration-500 hover:border-app-primary hover:bg-font-white hover:text-font-blue"
                  asChild
                >
                  <Link to="/news">
                    {t('news.viewAllNews')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}

        {/* PROMOTION TAB */}
        {activeFilter === 'promotion' && (
          <>
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="h-[300px] overflow-hidden rounded-xl border-white shadow-soft"
                  >
                    <Skeleton className="h-[150px] w-full rounded-none" />
                    <CardHeader className="px-4 pt-3">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full mt-2" />
                      <Skeleton className="h-3 w-4/5" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}

            {isError && <ErrorMessage />}

            {!isLoading && !isError && promotions?.length === 0 && (
              <EmptyState
                title={t('promotions.noPromotion')}
                description={t('promotions.noPromotionDesc')}
              />
            )}

            {!isLoading && !isError && promotions && (
              <div
                ref={promoGridRef}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
              >
                {promotions?.slice(0, 3).map((promotion, i) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    lang={lang}
                    delay={i * 100}
                  />
                ))}
              </div>
            )}

            {(promotions?.length ?? 0) > 0 && (
              <div className="text-center mt-5">
                <Button
                  variant="outline"
                  className="rounded-full bg-font-white px-6 text-body transition-colors duration-500 hover:border-app-primary hover:bg-font-white hover:text-font-blue"
                  asChild
                >
                  <Link to="/promotion">
                    {t('promotions.viewAllPromotions')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </SectionWrapper>

      {/* Photo Gallery */}
      <SectionWrapper className={SECTION_Y} motionMedia="(min-width: 1024px)">
        <SectionHeading eyebrow={t('home.galleryEyebrow')} title={t('home.galleryTitle')} />

        {galleryError && <ErrorMessage />}

        {galleryLoading && (
          <>
            {/* Mobile */}
            <div className="lg:hidden">
              <div className="h-[320px] overflow-hidden rounded-[12px]">
                <Skeleton className="h-full w-full rounded-[12px]" />
              </div>

              <div className="mt-3 flex gap-3 overflow-hidden">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-[115px] min-w-[44%] rounded-xl" />
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden auto-rows-[190px] grid-cols-1 gap-4 lg:grid lg:grid-cols-4">
              {Array.from({ length: 5 }).map((_, i) => {
                const cardClass =
                  i === 0
                    ? 'md:col-span-2 md:row-span-2 rounded-[12px]'
                    : 'md:col-span-1 rounded-[12px]'

                return (
                  <div key={i} className={`${cardClass} overflow-hidden`}>
                    <Skeleton className="h-full w-full rounded-[12px]" />
                  </div>
                )
              })}
            </div>
          </>
        )}

        {!galleryLoading &&
          !galleryError &&
          (!galleryData?.data || galleryData.data.length === 0) && (
            <EmptyState title={t('common.noData')} description={t('common.emptyStateDesc')} />
          )}

        {!galleryLoading && !galleryError && galleryData?.data && galleryData.data.length > 0 && (
          <>
            {/* ================================= */}
            {/* MOBILE GALLERY */}
            {/* ================================= */}
            <div className="lg:hidden">
              {(() => {
                const items = galleryData.data.slice(0, 5)
                const item = items[activeGalleryImage] ?? items[0]
                const imageUrl = item.imageUrl
                  ? item.imageUrl.startsWith('http')
                    ? item.imageUrl
                    : `${STORAGE_URL}/${item.imageUrl}`
                  : null
                const displayTitle = getLocalized(
                  {
                    en: item.label.en ?? undefined,
                    my: item.label.my ?? undefined,
                    zh: item.label.zh ?? undefined,
                  },
                  lang
                )

                return (
                  <>
                    <AnimatedCard
                      key={item.id}
                      delay={0}
                      variant="rise"
                      className="group relative h-[320px] overflow-hidden rounded-[12px] border border-white bg-card shadow-soft"
                    >
                      {imageUrl && !failedGalleryImages.has(item.id) ? (
                        <img
                          src={imageUrl}
                          alt={displayTitle || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                          onError={() =>
                            setFailedGalleryImages((failed) => new Set(failed).add(item.id))
                          }
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <img
                            src="/assets/logo/logo-muted.png"
                            alt={t('common.noImage')}
                            className="h-12 w-auto object-contain opacity-60 sm:h-16"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                      {displayTitle && (
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                          <div>
                            <p className="text-body-lg font-semibold tracking-wide text-white">
                              {displayTitle}
                            </p>
                          </div>
                        </div>
                      )}
                    </AnimatedCard>

                    {items.length > 1 && (
                      <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-none">
                        {items.slice(1).map((thumbnail, i) => {
                          const thumbnailUrl = thumbnail.imageUrl
                            ? thumbnail.imageUrl.startsWith('http')
                              ? thumbnail.imageUrl
                              : `${STORAGE_URL}/${thumbnail.imageUrl}`
                            : null
                          const thumbnailTitle = getLocalized(
                            {
                              en: thumbnail.label.en ?? undefined,
                              my: thumbnail.label.my ?? undefined,
                              zh: thumbnail.label.zh ?? undefined,
                            },
                            lang
                          )
                          const imageIndex = i + 1

                          return (
                            <button
                              key={thumbnail.id}
                              type="button"
                              aria-label={`Show gallery image ${imageIndex + 1}`}
                              aria-pressed={activeGalleryImage === imageIndex}
                              onClick={() => setActiveGalleryImage(imageIndex)}
                              className={`group relative h-[115px] min-w-[44%] snap-start overflow-hidden rounded-xl border bg-card text-left shadow-soft ${
                                activeGalleryImage === imageIndex
                                  ? 'border-app-primary ring-2 ring-[#0100ca]/30'
                                  : 'border-border/60'
                              }`}
                            >
                              {thumbnailUrl && !failedGalleryImages.has(thumbnail.id) ? (
                                <img
                                  src={thumbnailUrl}
                                  alt={thumbnailTitle || 'Gallery image'}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                  loading="lazy"
                                  onError={() =>
                                    setFailedGalleryImages((failed) =>
                                      new Set(failed).add(thumbnail.id)
                                    )
                                  }
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                  <img
                                    src="/assets/logo/logo-muted.png"
                                    alt={t('common.noImage')}
                                    className="h-8 w-auto object-contain opacity-60 sm:h-10"
                                  />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                              {thumbnailTitle && (
                                <div className="absolute inset-x-0 bottom-0 p-3">
                                  <p className="line-clamp-1 text-caption font-medium text-white">
                                    {thumbnailTitle}
                                  </p>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    <div
                      className="mt-2 flex justify-center gap-1.5"
                      role="group"
                      aria-label="Gallery slides"
                    >
                      {items.map((galleryItem, i) => (
                        <button
                          key={galleryItem.id}
                          type="button"
                          aria-label={`Show gallery image ${i + 1}`}
                          aria-current={i === activeGalleryImage}
                          onClick={() => setActiveGalleryImage(i)}
                          className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-2 ${
                            i === activeGalleryImage ? 'w-5 bg-app-primary' : 'w-2.5 bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )
              })()}
            </div>

            {/* ================================= */}
            {/* DESKTOP GALLERY */}
            {/* ================================= */}
            <div className="hidden auto-rows-[190px] grid-cols-1 gap-4 lg:grid lg:grid-cols-4">
              {galleryData.data.slice(0, 5).map((item, i) => {
                const cardClass =
                  i === 0
                    ? 'md:col-span-2 md:row-span-2 rounded-[12px]'
                    : 'md:col-span-1 rounded-[12px]'

                const imageUrl = item.imageUrl
                  ? item.imageUrl.startsWith('http')
                    ? item.imageUrl
                    : `${STORAGE_URL}/${item.imageUrl}`
                  : null

                const displayTitle = getLocalized(
                  {
                    en: item.label.en ?? undefined,
                    my: item.label.my ?? undefined,
                    zh: item.label.zh ?? undefined,
                  },
                  lang
                )

                return (
                  <AnimatedCard
                    key={item.id}
                    delay={i * 90}
                    variant="rise"
                    className={`group relative h-full overflow-hidden border border-white bg-card shadow-soft ${cardClass}`}
                  >
                    <div className="card-media h-full">
                      {imageUrl && !failedGalleryImages.has(item.id) ? (
                        <img
                          src={imageUrl}
                          alt={displayTitle || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                          onError={() =>
                            setFailedGalleryImages((failed) => new Set(failed).add(item.id))
                          }
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <img
                            src="/assets/logo/logo-muted.png"
                            alt={t('common.noImage')}
                            className="h-16 w-auto object-contain opacity-60"
                          />
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                    {displayTitle && (
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <p className="text-body font-semibold tracking-wide text-white drop-shadow-sm">
                          {displayTitle}
                        </p>
                      </div>
                    )}
                  </AnimatedCard>
                )
              })}
            </div>
          </>
        )}
      </SectionWrapper>

      {/* Download Section */}
      <SectionWrapper
        id="app"
        className={cn('bg-muted/40', SECTION_Y)}
        motion="fade"
        motionDuration={0.35}
        motionStart="top 95%"
        motionMedia="(min-width: 1024px)"
      >
        <AnimatedCard className="group relative rounded-[12px] bg-app-accent-bg shadow-soft max-lg:transition-none">
          <div className="relative overflow-hidden rounded-[12px]">
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-[#0100ca]/10 blur-3xl lg:block"
            />

            {/* Mobile + tablet: stacked | Desktop: equal columns, shared padding */}
            <div className="relative grid grid-cols-1 items-center lg:grid-cols-2 lg:min-h-[440px]">
              {/* Text */}
              <div className="order-1 flex flex-col justify-center px-5 py-8 text-center sm:px-8 lg:order-1 lg:px-10 lg:py-12 lg:text-left xl:px-12">
                <h2 className={cn(sectionTitleClass(lang, 'text-font-black'), 'lg:text-left')}>
                  {t('home.downloadHead')}
                </h2>

                <p className={cn('mx-auto mt-3 max-w-md lg:mx-0', sectionDescClass(lang))}>
                  {t('home.downloadHeadSub')}
                </p>

                <ul className="mx-auto mt-5 max-w-md space-y-3 text-left lg:mx-0">
                  {homeContent.highlight.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-app-primary/10">
                        <Check
                          className="h-3 w-3 text-app-primary"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className={cn(
                          'text-small text-foreground/80',
                          lang === 'my' ? 'leading-[1.7]' : 'leading-snug'
                        )}
                      >
                        {t(h)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex w-full justify-center lg:mt-8">
                  <button
                    type="button"
                    className="mx-auto inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-app-primary px-6 text-small font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="leading-none">{t('downloadCard.downloadApp')}</span>
                  </button>
                </div>
              </div>

              {/* Image — equal top/bottom inset; capped height so card edge stays clear */}
              <div
                ref={downloadImageRef}
                className="order-2 flex items-center justify-center px-5 py-8 sm:px-8 lg:order-2 lg:px-10 lg:py-12 xl:px-12"
              >
                {homeContent.downloadItems.map((item) => (
                  <div
                    key={item.key}
                    className="mx-auto inline-flex max-w-full overflow-hidden rounded-[12px] shadow-soft lg:transition-transform lg:duration-500 lg:ease-out lg:group-hover:scale-[1.02]"
                  >
                    <img
                      src={item.imageUrl}
                      alt={t(item.key)}
                      width={800}
                      height={532}
                      className="block h-auto max-h-[280px] w-auto max-w-full object-contain sm:max-h-[320px] lg:max-h-[340px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedCard>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper
        className="bg-muted/40 py-5 md:py-6 lg:py-8"
        motion="fade"
        motionDuration={0.35}
        motionStart="top 95%"
        motionMedia="(min-width: 1024px)"
      >
        <div className="relative overflow-hidden rounded-[12px] bg-gradient-font px-5 py-4 text-center sm:px-8 md:px-16 md:py-5">
          <div className="relative">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-[12px] bg-white p-2 shadow-md ring-1 ring-white/40">
              <img
                src="/assets/logo/logo.svg"
                alt="Yaung Ni Oo logo"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </span>

            <h2 className={cn(sectionTitleClass(lang, 'mt-3 text-primary-foreground'))}>
              {t('cta.ctaTitle')}
            </h2>

            <p
              className={cn(
                'mx-auto mt-2.5 max-w-sm sm:max-w-xl',
                sectionDescClass(lang, 'text-primary-foreground/80')
              )}
            >
              {t('cta.ctaDesc')}
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              <DirectionAwareButton
                to="/packages?category=1"
                label={t('home.heroCta')}
                color="var(--color-yellow)"
                className="w-full rounded-[8px] px-4 py-2 text-small font-semibold transition-all duration-200 hover:bg-primary-foreground/10 active:scale-[0.98] sm:w-auto"
              />

              <DirectionAwareButton
                to="/contact-us"
                label={t('nav.contact')}
                className="w-full rounded-[8px] border border-primary-foreground/20 px-4 py-2 text-small font-semibold transition-all duration-200 hover:bg-primary-foreground/10 active:scale-[0.98] sm:w-auto"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
