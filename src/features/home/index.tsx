import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Download } from 'lucide-react'
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
import { getLocalized } from '@/lib/utils'
import { useRecommendPackage } from '@/hooks/usePackages'

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  usePageTitle()
  const navigate = useNavigate()
  const {
    data: recommendedPackages,
    isLoading: pkgLoading,
    isError: pkgError,
    refetch: pkgRefetch,
  } = useRecommendPackage()
  const { data: news, isLoading: newsLoading, isError: newsError } = useLatestNews(3)
  const { data: promotions, isLoading, isError } = useLatestPromotions(3)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'news'
  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const { data: galleryData } = useGallery()
  const hasMore = (galleryData?.data?.length ?? 0) > 5
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

  return (
    <main>
      {/* Hero Banner Slider */}
      <HeroBanner lang={lang} />

      {/* Stats */}
      <section className="bg-app-bar h-[70px] flex items-center" aria-label="Company statistics">
        <div className="container">
          <dl className="font-heading grid grid-cols-5 gap-1 sm:gap-4 text-center items-center">
            {homeContent.stats.map(({ value, labelKey }) => (
              <div key={labelKey} className="min-w-0 px-1">
                <dt className="text-[6px] xs:text-xs sm:text-xs text-font-light-blue leading-[1.6] whitespace-nowrap overflow-visible font-normal">
                  {t(labelKey)}
                </dt>
                <dd className="text-[9px] xs:text-xs sm:text-base text-font-white font-bold leading-tight">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why Choose Us */}
      <SectionWrapper className="bg-muted/40">
        <SectionHeading
          eyebrow={t('home.whyChooseUs')}
          title={t('home.whyChooseUsTitle')}
          subtitle={t('home.whyChooseUsDesc')}
        />
      <div className="font-heading grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {homeContent.features.map(({ icon: Icon, titleKey, descKey }, i) => (
            <AnimatedCard
              key={titleKey}
              delay={i * 90}
              className="rounded-lg"
            >
              <article className="group bg-font-white relative flex h-[180px] flex-col overflow-hidden border border-border/70 text-center shadow-sm card-shine transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.35)]">
                <CardHeader className="pb-2 pt-5">
                  <div
                    className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary transition-all duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <CardTitle className="text-sm font-semibold leading-tight text-foreground">
                    {t(titleKey)}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-4 pb-4 pt-0">
                  <CardDescription className="text-xs leading-snug text-muted-foreground">
                    {t(descKey)}
                  </CardDescription>
                </CardContent>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Packages */}
      <SectionWrapper>
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

        {(!recommendedPackages && !pkgError && recommendedPackages?.length === 0) && (
          <EmptyState
            title={t('common.noData')}
            description={t('common.emptyStateDesc')}
          />
        )}

        {recommendedPackages &&
          (() => {
            const STORAGE_URL = `${import.meta.env.VITE_APP_URL}/storage`
            const formattedPackages = recommendedPackages.map((pkg: any) => {
              const rawImg = pkg.image_url || pkg.imageUrl
              const fullImageUrl = rawImg
                ? rawImg.startsWith('http')
                  ? rawImg
                  : `${STORAGE_URL}/${rawImg}`
                : ''
              return {
                ...pkg,
                image_url: fullImageUrl,
                imageUrl: fullImageUrl,
              }
            })

            return <PackageCarousel packages={formattedPackages} lang={lang} />
          })()}
      </SectionWrapper>

      {/* Latest News */}
      <SectionWrapper className="bg-muted/40">
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
              <div className="text-center mt-8">
                <Button variant="outline" className="bg-font-white" asChild>
                  <Link to="/news">
                    {t('common.viewAll')} {t('nav.news')}
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
              <EmptyState title={t('common.noData')} description={t('common.emptyStateDesc')} />
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
              <div className="text-center mt-8">
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
      <SectionWrapper>
        <SectionHeading 
          eyebrow={t('home.galleryEyebrow')}
          title={t('home.galleryTitle')} 
          subtitle={t('home.galleryDesc')} 
        />

        {isError && <ErrorMessage />}

        {!isLoading &&
          !isError &&
          (!galleryData?.data || galleryData.data.length === 0) && (
            <EmptyState
              title={t('common.noData')}
              description={t('common.emptyStateDesc')}
            />
          )}


        {!isLoading &&
          !isError &&
          galleryData?.data &&
          galleryData.data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[190px] gap-4">
            {galleryData.data.slice(0, 5).map((item, i) => {
              const isMoreCard = i === 4 && hasMore
              const cardClass =
                i === 0
                  ? 'md:col-span-2 md:row-span-2 rounded-[28px]'
                  : 'md:col-span-1 rounded-[28px]'

              const imageUrl = item.imageUrl?.startsWith('http')
                ? item.imageUrl
                : `${STORAGE_URL}/${item.imageUrl}`

              const displayTitle = getLocalized(item.label, lang)

              return (
                <AnimatedCard key={item.id} delay={i * 90} variant="rise" className={cardClass}>
                  {isMoreCard ? (
                    <button
                      type="button"
                      onClick={() => navigate('/about#gallery')}
                      className="group relative h-full w-full overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
                    >
                      <img
                        src={imageUrl}
                        alt="View More"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-black/60 transition-all duration-500 group-hover:bg-black/70" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="text-2xl font-bold">+ {t('home.more')}</span>
                        <span className="mt-1 text-sm opacity-80">{t('home.viewAllGallery')}</span>
                      </div>
                    </button>
                  ) : (
                    <div className="group relative h-full overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
                      <div className="card-media h-full">
                        <img
                          src={imageUrl}
                          alt={displayTitle}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                          loading="lazy"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                      {displayTitle && (
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                          <p className="text-white text-sm sm:text-base font-semibold tracking-wide drop-shadow-sm">
                            {displayTitle}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </AnimatedCard>
              )
            })}
          </div>
        )}
      </SectionWrapper>
      
      {/* Download Section */}
      <SectionWrapper className="bg-muted/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto ">
          <div className="space-y-6 text-left relative">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-font bg-clip-text text-transparent">
                {t('home.downloadHead')}
              </span>
            </h3>
            <div className="border-l-4 border-primary/50 pl-4 py-1">
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-medium">
                {t('home.downloadSub1')}
                <br />
                {t('home.downloadSub2')}
                <br />
                {t('home.downloadSub3')}
              </p>
            </div>
            <button
              type="button"
              className="
                mt-3 inline-flex
                items-center justify-center gap-2
                rounded-full
                bg-app-primary
                px-5 py-2
                text-xs font-semibold text-white
                shadow-md
                transition-all duration-200
                hover:scale-[1.03]
                hover:opacity-90
                active:scale-95
                sm:text-sm
              "
            >
              <Download className="h-4 w-4" />
              {t('downloadCard.downloadApp')}
            </button>
          </div>
          {homeContent.downloadItems.map((item, i) => (
            <AnimatedCard
              key={item.key}
              delay={i * 90}
              className="'md:col-span-2 md:row-span-2 rounded-[28px]"
            >
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
                <div className="card-media h-full">
                  <img
                    src={item.imageUrl}
                    alt={t(item.key)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}
