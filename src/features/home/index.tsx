import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Zap, Shield, Clock, Database, Router } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionWrapper, SectionHeading } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { BorderBeam } from '@/components/magicui/border-beam'
import { PackageCarousel } from '@/components/cards/PackageCarousel'
import { NewsCard } from '@/components/cards/NewsCard'
import { HeroBanner } from './HeroBanner'
import { usePackages } from '@/hooks/usePackages'
import { useLatestNews } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { normalizeLanguage } from '@/lib/i18n'

const FEATURES = [
  { icon: Zap, titleKey: 'home.feature1Title', descKey: 'home.feature1Desc', color: 'text-yellow-500', hoverColor: 'group-hover:text-yellow-300', iconBg: 'bg-yellow-500/15', hoverBg: 'group-hover:bg-yellow-400/30', variant: 'rise' as const },
  { icon: Shield, titleKey: 'home.feature2Title', descKey: 'home.feature2Desc', color: 'text-green-500', hoverColor: 'group-hover:text-green-300', iconBg: 'bg-green-500/15', hoverBg: 'group-hover:bg-green-400/30', variant: 'fade-up' as const },
  { icon: Clock, titleKey: 'home.feature3Title', descKey: 'home.feature3Desc', color: 'text-blue-500', hoverColor: 'group-hover:text-blue-300', iconBg: 'bg-blue-500/15', hoverBg: 'group-hover:bg-blue-400/30', variant: 'zoom-in' as const },
  { icon: Database, titleKey: 'home.feature4Title', descKey: 'home.feature4Desc', color: 'text-purple-500', hoverColor: 'group-hover:text-purple-300', iconBg: 'bg-purple-500/15', hoverBg: 'group-hover:bg-purple-400/30', variant: 'fade-right' as const },
  { icon: Router, titleKey: 'home.feature5Title', descKey: 'home.feature5Desc', color: 'text-cyan-500', hoverColor: 'group-hover:text-cyan-300', iconBg: 'bg-cyan-500/15', hoverBg: 'group-hover:bg-cyan-400/30', variant: 'fade-left' as const },
]

const STATS = [
  { value: '200,000+', labelKey: 'home.stat1Label' },
  { value: '50+', labelKey: 'home.stat2Label' },
  { value: '99.9%', labelKey: 'home.stat3Label' },
  { value: '10+', labelKey: 'home.stat4Label' },
]

const GALLERY_ITEMS = [
  {
    key: 'home.galleryItem1',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    key: 'home.galleryItem2',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
    className: 'md:col-span-1',
  },
  {
    key: 'home.galleryItem3',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&fit=crop',
    className: 'md:col-span-1',
  },
  {
    key: 'home.galleryItem4',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop',
    className: 'md:col-span-1',
  },
  {
    key: 'home.galleryItem5',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&fit=crop',
    className: 'md:col-span-1',
  },
]

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const lang = normalizeLanguage(i18n.language)
  usePageTitle()

  const { data: packages, isLoading: pkgLoading, isError: pkgError, refetch: pkgRefetch } = usePackages()
  const { data: news, isLoading: newsLoading, isError: newsError } = useLatestNews(4)

  return (
    <main>
      {/* Hero Banner Slider */}
      <HeroBanner lang={lang} />

      {/* Stats */}
      <section className="bg-brand-800 text-white h-[60px] flex items-center" aria-label="Company statistics">
        <div className="container">
          <dl className="grid grid-cols-4 gap-1 sm:gap-4 text-center items-center">
            {STATS.map(({ value, labelKey }) => (
              <div key={labelKey} className="min-w-0 px-1">
                <dt className="text-[10px] sm:text-xs text-blue-200 leading-tight truncate">{t(labelKey)}</dt>
                <dd className="text-sm sm:text-base font-bold leading-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why Choose Us */}
      <SectionWrapper>
        <SectionHeading title={t('home.whyChooseUs')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
          {FEATURES.map(({ icon: Icon, titleKey, descKey, color, hoverColor, iconBg, hoverBg, variant }, i) => (
            <AnimatedCard key={titleKey} delay={i * 90} variant={variant} hoverClass="" className="rounded-lg">
              <Card className="group relative flex h-[220px] flex-col overflow-hidden text-center border border-border/70 shadow-sm card-shine transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.35)]">
                <CardHeader className="pb-2 pt-5">
                  <div
                    className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${iconBg} ${hoverBg} ${color} ${hoverColor} group-hover:scale-110 group-hover:shadow-[0_0_18px_currentColor]`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-sm font-semibold leading-tight">{t(titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  <CardDescription className="text-xs leading-snug">{t(descKey)}</CardDescription>
                </CardContent>
                <BorderBeam
                  size={80}
                  duration={8}
                  delay={i * 1.2}
                  borderWidth={2}
                  colorFrom="#004AC6"
                  colorTo="#004AC6"
                />
                <BorderBeam
                  size={80}
                  duration={8}
                  delay={i * 1.2 + 4}
                  reverse
                  borderWidth={2}
                  colorFrom="#004AC6"
                  colorTo="#004AC6"
                />
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Packages */}
      <SectionWrapper className="bg-muted/40">
        <SectionHeading
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

        {pkgError && <ErrorMessage onRetry={() => void pkgRefetch()} />}

        {packages && (
          <PackageCarousel packages={packages} lang={lang} />
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/packages">
              {t('common.viewAll')} {t('nav.packages')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Latest News */}
      <SectionWrapper>
        <SectionHeading
          title={t('home.latestNews')}
          subtitle={t('home.latestNewsDesc')}
        />

        {newsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
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

        {news && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {news.map((article, i) => (
              <NewsCard key={article.id} article={article} lang={lang} delay={i * 100} compact />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/news">
              {t('common.viewAll')} {t('nav.news')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Photo Gallery */}
      <SectionWrapper className="bg-muted/30">
        <SectionHeading
          title={t('home.galleryTitle')}
          subtitle={t('home.galleryDesc')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[190px] gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <AnimatedCard
              key={item.key}
              delay={i * 90}
              variant="rise"
              className={item.className}
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-white text-sm sm:text-base font-semibold tracking-wide drop-shadow-sm">
                    {t(item.key)}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="hero-gradient text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('home.ctaTitle')}</h2>
          <p className="text-blue-100 mb-8">{t('home.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/packages">{t('home.ctaButton')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white hover:bg-white/10">
              <Link to="/contact">{t('common.contactUs')}</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
