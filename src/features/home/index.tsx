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
      <div className="bg-muted/40 pb-5">
        <section
          className="relative z-30 -mt-3 sm:-mt-8 lg:-mt-10 mx-auto w-[92%] max-w-[1200px] px-0 font-head"
          aria-label="Company statistics"
        >
          <div
            ref={statsRef}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="grid grid-cols-6 lg:grid-cols-5">
              {homeContent.stats.map(({ value, labelKey }, index) => (
                <div
                  key={labelKey}
                  className={cn(
                    // AFTER
                    'flex flex-col items-center justify-center border-b border-r border-border py-1.5 sm:py-3 lg:h-[100px] px-1 text-center transition-all',

                    index < 3 ? 'col-span-2 lg:col-span-1' : 'col-span-3 lg:col-span-1',

                    index === 3 ? 'sm:col-span-3' : '',
                    index === 4 ? 'sm:col-span-3 border-b-0 sm:border-b-0' : '',

                    index === 4 ? 'border-b-0 lg:border-b-0' : '',
                    'lg:border-b-0 lg:last:border-r-0'
                  )}
                >
                  <p className="text-[10px] sm:text-base md:text-lg lg:text-2xl font-extrabold tracking-tight text-font-blue">
                    <AnimatedStat value={value} />
                  </p>

                  <p className="text-[9px] sm:text-xs font-medium text-muted-foreground truncate w-full !leading-[1.7] ">
                    {t(labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Why Choose Us */}
      <SectionWrapper className="bg-muted/40 !py-6 md:!py-14" spacing="default">
        <SectionHeading
          eyebrow={t('home.whyChooseUs')}
          title={t('home.whyChooseUsTitle')}
          subtitle={t('home.whyChooseUsDesc')}
        />

        {/* ============================= */}
        {/* Mobile Design */}
        {/* ============================= */}
        <div className="md:hidden">
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 scrollbar-none">
            {homeContent.features.map(({ icon: Icon, titleKey, descKey }, i) => (
              <AnimatedCard
                key={titleKey}
                delay={i * 90}
                className="group relative flex min-w-[82%] snap-center overflow-hidden rounded-2xl border border-border/60 bg-app-surface p-5 shadow-sm transition-all duration-300"
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />

                <div className="relative flex w-full items-center gap-4">
                  {/* Icon */}
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-font-blue shadow-sm transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold leading-snug text-foreground">
                      {t(titleKey)}
                    </CardTitle>

                    <CardDescription className="mt-1.5 text-xs leading-[1.6] text-muted-foreground">
                      {t(descKey)}
                    </CardDescription>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-app-primary group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* ============================= */}
        {/* Tablet Design */}
        {/* ============================= */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            {homeContent.features.map(({ icon: Icon, titleKey, descKey }, i) => (
              <AnimatedCard
                key={titleKey}
                delay={i * 90}
                className="group relative flex min-h-[165px] overflow-hidden rounded-2xl border border-border/70 bg-app-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.35)]"
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />

                <div className="relative flex w-full items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-font-blue shadow-sm transition-transform duration-300 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-semibold leading-snug text-foreground">
                      {t(titleKey)}
                    </CardTitle>

                    <CardDescription className="mt-2 text-xs leading-[1.7] text-muted-foreground">
                      {t(descKey)}
                    </CardDescription>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-app-primary group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* ============================= */}
        {/* Desktop Design */}
        {/* ============================= */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-5">
          {homeContent.features.map(({ icon: Icon, titleKey, descKey }, i) => (
            <AnimatedCard
              key={titleKey}
              delay={i * 90}
              className="group relative flex h-[180px] flex-col overflow-hidden rounded-xl border border-border/70 bg-app-surface text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.35)]"
            >
              <CardHeader className="pb-2 pt-5">
                <div
                  className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-font-blue transition-all duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </div>

                <CardTitle className="text-sm font-semibold leading-tight text-foreground">
                  {t(titleKey)}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-4 pb-4 pt-0">
                <CardDescription className="text-xs leading-[1.7] text-muted-foreground">
                  {t(descKey)}
                </CardDescription>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Packages */}
      <SectionWrapper className="!py-6 md:!py-14">
        <SectionHeading
          eyebrow={t('home.featuredEyebrow')}
          title={t('home.featuredPackages')}
          subtitle={t('home.featuredPackagesDesc')}
        />

        {pkgLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="overflow-hidden rounded-[12px]">
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
      <SectionWrapper className="bg-muted/40 !py-6 md:!py-14">
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
                  <Card key={i} className="h-[300px] overflow-hidden rounded-[20px]">
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
                <Button variant="outline" className="bg-font-white" asChild>
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
                  <Card key={i} className="h-[300px] overflow-hidden rounded-[20px]">
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
                <Button variant="outline" className="bg-font-white" asChild>
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
      <SectionWrapper className="!py-6 md:!py-14">
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
              <div className="h-[320px] overflow-hidden rounded-[24px]">
                <Skeleton className="h-full w-full rounded-[24px]" />
              </div>

              <div className="mt-3 flex gap-3 overflow-hidden">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-[110px] min-w-[42%] rounded-2xl" />
                ))}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden auto-rows-[190px] grid-cols-1 gap-4 lg:grid lg:grid-cols-4">
              {Array.from({ length: 5 }).map((_, i) => {
                const cardClass =
                  i === 0
                    ? 'md:col-span-2 md:row-span-2 rounded-[28px]'
                    : 'md:col-span-1 rounded-[28px]'

                return (
                  <div key={i} className={`${cardClass} overflow-hidden`}>
                    <Skeleton className="h-full w-full rounded-[28px]" />
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
                      className="group relative h-[320px] overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-sm"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={displayTitle || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" aria-label={t('common.noData')} />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                      {displayTitle && (
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                          <div>
                            <p className="text-base font-semibold tracking-wide text-white">
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
                              className={`group relative h-[115px] min-w-[44%] snap-start overflow-hidden rounded-2xl border bg-card text-left shadow-sm ${
                                activeGalleryImage === imageIndex
                                  ? 'border-app-primary ring-2 ring-app-primary/30'
                                  : 'border-border/60'
                              }`}
                            >
                              {thumbnailUrl ? (
                                <img
                                  src={thumbnailUrl}
                                  alt={thumbnailTitle || 'Gallery image'}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                                  <p className="line-clamp-1 text-xs font-medium text-white">
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
                  i === 0 ? 'md:col-span-2 md:row-span-2 rounded-xl' : 'md:col-span-1 rounded-xl'

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
                    className={`group relative h-full overflow-hidden border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl ${cardClass}`}
                  >
                    <div className="card-media h-full">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={displayTitle || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" aria-label={t('common.noData')} />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                    {displayTitle && (
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <p className="text-sm font-semibold tracking-wide text-white drop-shadow-sm sm:text-base">
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
      <SectionWrapper id="app" className="bg-muted/40 !py-6 md:!py-10">
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-app-accent-bg">
          {/* ============================= */}
          {/* Mobile Download Design */}
          {/* ============================= */}
          <div className="md:hidden">
            {/* App Preview */}
            <div className="relative flex justify-center overflow-hidden px-5 pt-7">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-app-primary/10 blur-3xl"
              />

              <div className="relative w-[82%] max-w-[320px]">
                {homeContent.downloadItems.map((item) => (
                  <img
                    key={item.key}
                    src={item.imageUrl}
                    alt={t(item.key)}
                    className="h-auto w-full rounded-2xl drop-shadow-2xl"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-6 pt-6 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-font-blue">
                {t('home.downloadTitle')}
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-font-black !leading-[1.5]">
                {t('home.downloadHead')}
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-[1.7] text-muted-foreground">
                {t('home.downloadHeadSub')}
              </p>

              {/* Highlights */}
              <ul className="mx-auto mt-5 max-w-sm space-y-2.5 text-left">
                {homeContent.highlight.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-lg bg-background/50 px-3 py-2 text-xs text-foreground/80"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-app-primary/10">
                      <Check className="h-3 w-3 text-font-blue" />
                    </span>

                    <span className="leading-[1.6]">{t(h)}</span>
                  </li>
                ))}
              </ul>

              {/* Download Button */}
              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-app-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-font-blue sm:text-xl">
                {t('home.downloadTitle')}
              </p>

              <h2
                className={cn(
                  'mt-3 text-xl font-extrabold tracking-tight text-font-black sm:text-4xl',
                  lang === 'my' ? '!leading-[1.7]' : '!leading-tight'
                )}
              >
                {t('home.downloadHead')}
              </h2>

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                {t('home.downloadHeadSub')}
                <ul className="mt-6 space-y-2.5">
                  {homeContent.highlight.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[15px] text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-font-blue" />
                      {t(h)}
                    </li>
                  ))}
                </ul>
              </p>

              <button
                type="button"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-app-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
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
                    className="h-auto w-full rounded-xl drop-shadow-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="bg-muted/40 !py-6 md:!pb-20 md:!pt-14">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-font px-5 py-10 text-center sm:px-8 md:px-16 md:py-14">
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

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
              {t('cta.ctaTitle')}
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-[1.7] text-primary-foreground/80 sm:max-w-xl sm:text-[17px]">
              {t('cta.ctaDesc')}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
              <DirectionAwareButton
                to="/packages?category=1"
                label={t('home.heroCta')}
                color="var(--color-yellow)"
                className="w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:bg-primary-foreground/10 active:scale-[0.98] sm:w-auto"
              />

              <DirectionAwareButton
                to="/contact-us"
                label={t('nav.contact')}
                className="w-full rounded-xl border border-primary-foreground/20 px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:bg-primary-foreground/10 active:scale-[0.98] sm:w-auto"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
