import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  SectionWrapper,
  SectionHeading,
  SectionEyebrow,
} from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { PackageCarousel } from '@/components/cards/PackageCarousel'
import { NewsCard } from '@/components/cards/NewsCard'
import { HeroBanner } from './HeroBanner'
import { useLatestNews } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'
import { homeContent } from '@/lib/content/home'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLatestPromotions } from '@/hooks/usePromotion'
import { PromotionCard } from '@/components/cards/PromotionCard'
import { EmptyState } from '@/components/common/EmptyState'
import CommonTab from '@/components/common/CommonTab'
import { useGallery } from '@/hooks/useGallery'
import { cn, getLocalized } from '@/lib/utils'
import { useRecommendPackage } from '@/hooks/usePackages'
import AnimatedStat from '@/components/common/AnimatedStat'
import DirectionAwareButton from '@/components/common/DirectionAwareButton'
import { useGsapReveal } from '@/hooks/useGsapReveal'

const SECTION_Y = 'py-12 md:py-16 lg:py-24'

type Feature = (typeof homeContent.features)[number]

function FeatureCard({ feature, className }: { feature: Feature; className?: string }) {
  const { t } = useTranslation()
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

        <CardTitle className="text-body-lg font-semibold leading-tight text-foreground">
          {t(titleKey)}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-0">
        <CardDescription className="text-body leading-[1.7] text-muted-foreground">
          {t(descKey)}
        </CardDescription>
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
  const [activeFeature, setActiveFeature] = useState(0)
  const statsRef = useGsapReveal<HTMLDivElement>({ mode: 'rise' })
  const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
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
                    index === 0 ? 'col-span-2 h-[88px]' : 'h-[76px]',
                    index <= 2 && 'border-b',
                    (index === 1 || index === 3) && 'border-r',

                    // Tablet
                    'md:col-span-1 md:h-[96px] md:border-b-0',
                    index < 4 ? 'md:border-r' : 'md:border-r-0',

                    // Laptop & desktop
                    'lg:h-[112px]'
                  )}
                >
                  <p
                    className={cn(
                      'font-extrabold tabular-nums tracking-tight text-font-blue',
                      index === 0 ? 'text-3xl md:text-2xl lg:text-3xl' : 'text-xl md:text-2xl lg:text-3xl'
                    )}
                  >
                    <AnimatedStat value={value} />
                  </p>

                  <p
                    className={cn(
                      'mt-1 font-medium text-muted-foreground',
                      'text-small'
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
      <SectionWrapper className={cn('bg-muted/40', SECTION_Y)}>
        <SectionHeading
          eyebrow={t('home.whyChooseUs')}
          title={t('home.whyChooseUsTitle')}
          subtitle={t('home.whyChooseUsDesc')}
        />

        {/* ============================= */}
        {/* Mobile Design */}
        {/* ============================= */}
        <div className="md:hidden">
          <div
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
        <div className="hidden grid-cols-2 gap-3 md:grid lg:hidden">
          {homeContent.features.map((feature) => (
            <FeatureCard key={feature.titleKey} feature={feature} />
          ))}
        </div>

        {/* ============================= */}
        {/* Desktop Design */}
        {/* ============================= */}
        <div className="hidden gap-3 lg:grid lg:grid-cols-3 xl:grid-cols-5">
          {homeContent.features.map((feature) => (
            <FeatureCard key={feature.titleKey} feature={feature} />
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Packages */}
      <SectionWrapper className={SECTION_Y}>
        <SectionHeading
          eyebrow={t('home.featuredEyebrow')}
          title={t('home.featuredPackages')}
          subtitle={t('home.featuredPackagesDesc')}
        />

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
      <SectionWrapper className={cn('bg-muted/40', SECTION_Y)}>
        <SectionHeading
          eyebrow={t('home.whatsNew')}
          title={t('home.latestTitle')}
          subtitle={t('home.latestNewsDesc')}
        />

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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
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
      <SectionWrapper className={SECTION_Y}>
        <SectionHeading
          eyebrow={t('home.galleryEyebrow')}
          title={t('home.galleryTitle')}
          subtitle={t('home.galleryDesc')}
        />

        {galleryError && <ErrorMessage />}

        {galleryLoading && (
          <>
            {/* Mobile */}
            <div className="lg:hidden">
              <div className="h-[320px] overflow-hidden rounded-2xl">
                <Skeleton className="h-full w-full rounded-2xl" />
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
                  i === 0 ? 'md:col-span-2 md:row-span-2 rounded-2xl' : 'md:col-span-1 rounded-2xl'

                return (
                  <div key={i} className={`${cardClass} overflow-hidden`}>
                    <Skeleton className="h-full w-full rounded-2xl" />
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
                      className="group relative h-[320px] overflow-hidden rounded-2xl border border-white bg-card shadow-soft"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={displayTitle || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" aria-label={t('common.noData')} />
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
                              {thumbnailUrl ? (
                                <img
                                  src={thumbnailUrl}
                                  alt={thumbnailTitle || 'Gallery image'}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                  loading="lazy"
                                />
                              ) : (
                                <div
                                  className="h-full w-full bg-muted"
                                  aria-label={t('common.noData')}
                                />
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
                  i === 0 ? 'md:col-span-2 md:row-span-2 rounded-2xl' : 'md:col-span-1 rounded-2xl'

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
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={displayTitle || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" aria-label={t('common.noData')} />
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
      <SectionWrapper id="app" className={cn('bg-muted/40', SECTION_Y)}>
        <div className="w-full overflow-hidden rounded-2xl border border-white bg-app-accent-bg shadow-soft">
          {/* ============================= */}
          {/* Mobile Download Design */}
          {/* ============================= */}
          <div className="md:hidden">
            {/* App Preview */}
            <div className="relative flex justify-center overflow-hidden px-5 pt-7">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-[#0100ca]/10 blur-3xl"
              />

              <div className="relative w-[82%] max-w-[320px]">
                {homeContent.downloadItems.map((item) => (
                  <img
                    key={item.key}
                    src={item.imageUrl}
                    alt={t(item.key)}
                    className="h-auto w-full rounded-2xl drop-shadow-xl"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-6 pt-6 text-center">
              <SectionEyebrow>{t('home.downloadTitle')}</SectionEyebrow>

              <h2
                className={cn(
                  'mt-3 text-h2 font-bold tracking-[-0.02em] text-font-black font-head',
                  lang === 'my' ? '!leading-[1.7]' : '!leading-tight'
                )}
              >
                {t('home.downloadHead')}
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-body-lg leading-relaxed text-muted-foreground">
                {t('home.downloadHeadSub')}
              </p>

              {/* Highlights */}
              <ul className="mx-auto mt-5 max-w-sm space-y-2.5 text-left">
                {homeContent.highlight.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-lg bg-background/50 px-3 py-2 text-small text-foreground/80"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0100ca]/10">
                      <Check className="h-3 w-3 text-font-blue" />
                    </span>

                    <span className="leading-[1.6]">{t(h)}</span>
                  </li>
                ))}
              </ul>

              {/* Download Button */}
              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-app-primary px-6 py-3.5 text-body font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                {t('downloadCard.downloadApp')}
              </button>
            </div>
          </div>

          {/* ============================= */}
          {/* Desktop Download Design */}
          {/* ============================= */}
          <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-8 md:p-12">
            <div>
              <SectionEyebrow align="left">{t('home.downloadTitle')}</SectionEyebrow>

              <h2
                className={cn(
                  'mt-3 text-h2 font-bold tracking-[-0.02em] text-font-black font-head',
                  lang === 'my' ? '!leading-[1.7]' : '!leading-tight'
                )}
              >
                {t('home.downloadHead')}
              </h2>

              <p className="mt-2 max-w-md text-body-lg leading-relaxed text-muted-foreground">
                {t('home.downloadHeadSub')}
              </p>

              <ul className="mt-6 space-y-2.5">
                {homeContent.highlight.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-body text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-font-blue" />
                    {t(h)}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-app-primary px-6 py-3.5 text-body font-semibold text-white shadow-soft transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                {t('downloadCard.downloadApp')}
              </button>
            </div>

            <div className="relative flex h-full items-center justify-center md:justify-end">
              {homeContent.downloadItems.map((item) => (
                <div key={item.key} className="w-full rounded-xl">
                  <img
                    src={item.imageUrl}
                    alt={t(item.key)}
                    className="h-auto w-full rounded-2xl drop-shadow-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className={SECTION_Y}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-luxe px-5 py-12 text-center shadow-lift sm:px-8 md:px-16 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ffcf62]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#0100ca]/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffcf62]/60 to-transparent"
          />

          {/* Content */}
          <div className="relative">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-md ring-1 ring-white/40">
              <img
                src="/assets/logo/logo.svg"
                alt="Yaung Ni Oo logo"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </span>

            <h2
              className={cn(
                'mt-5 text-h2 font-bold tracking-[-0.02em] text-primary-foreground font-head',
                lang === 'my' ? '!leading-[1.7]' : '!leading-tight'
              )}
            >
              {t('cta.ctaTitle')}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-body-lg leading-relaxed text-primary-foreground/80 sm:max-w-xl">
              {t('cta.ctaDesc')}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <DirectionAwareButton
                to="/packages?category=1"
                label={t('home.heroCta')}
                className="w-full border-app-yellow bg-app-yellow px-7 py-3.5 text-body active:scale-[0.98] sm:w-auto"
              />

              <DirectionAwareButton
                to="/contact-us"
                label={t('nav.contact')}
                className="w-full border-white px-7 py-3.5 text-body active:scale-[0.98] sm:w-auto"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
