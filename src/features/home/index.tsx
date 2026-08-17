import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Zap, Shield, Clock, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionWrapper, SectionHeading } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { AnimatedCard } from '@/components/common/AnimatedCard'
import { HeroBanner } from './HeroBanner'
import { useFeaturedPackages } from '@/hooks/usePackages'
import { useLatestNews } from '@/hooks/useNews'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, getLocalizedArray, formatDate, formatCurrency } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

const FEATURES = [
  { icon: Zap, titleKey: 'home.feature1Title', descKey: 'home.feature1Desc', color: 'text-yellow-500' },
  { icon: Shield, titleKey: 'home.feature2Title', descKey: 'home.feature2Desc', color: 'text-green-500' },
  { icon: Clock, titleKey: 'home.feature3Title', descKey: 'home.feature3Desc', color: 'text-blue-500' },
  { icon: Database, titleKey: 'home.feature4Title', descKey: 'home.feature4Desc', color: 'text-purple-500' },
]

const STATS = [
  { value: '200,000+', labelKey: 'home.stat1Label' },
  { value: '50+', labelKey: 'home.stat2Label' },
  { value: '99.9%', labelKey: 'home.stat3Label' },
  { value: '10+', labelKey: 'home.stat4Label' },
]

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage
  usePageTitle()

  const { data: packages, isLoading: pkgLoading, isError: pkgError, refetch: pkgRefetch } = useFeaturedPackages()
  const { data: news, isLoading: newsLoading, isError: newsError } = useLatestNews(3)

  return (
    <main>
      {/* Hero Banner Slider */}
      <HeroBanner lang={lang} />

      {/* Stats */}
      <section className="bg-brand-800 text-white py-10 px-4" aria-label="Company statistics">
        <div className="container">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, labelKey }) => (
              <div key={labelKey}>
                <dt className="text-sm text-blue-200 mb-1">{t(labelKey)}</dt>
                <dd className="text-3xl font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why Choose Us */}
      <SectionWrapper>
        <SectionHeading title={t('home.whyChooseUs')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, titleKey, descKey, color }, i) => (
            <AnimatedCard key={titleKey} delay={i * 90} variant="fade-up" className="rounded-lg">
              <Card className="text-center h-full card-shine card-glow border">
                <CardHeader className="pb-2">
                  <div className={`mx-auto mb-3 ${color}`} aria-hidden="true">
                    <Icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-lg">{t(titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{t(descKey)}</CardDescription>
                </CardContent>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {pkgError && <ErrorMessage onRetry={() => void pkgRefetch()} />}

          {packages && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <AnimatedCard key={pkg.id} delay={i * 100} variant="zoom-in" className="rounded-lg">
              <Card
                className={`relative h-full card-shine card-glow ${pkg.isPopular ? 'border-primary ring-2 ring-primary' : 'border'}`}
              >
                {pkg.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {t('common.popular')}
                  </Badge>
                )}
                <CardHeader>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {getLocalized(pkg.categoryLabel, lang)}
                  </div>
                  <CardTitle>{getLocalized(pkg.title, lang)}</CardTitle>
                  <CardDescription>{getLocalized(pkg.description, lang)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary mb-1">
                    {formatCurrency(pkg.price)}
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.speed} download</p>
                  <ul className="space-y-1.5" aria-label="Package features">
                    {getLocalizedArray(pkg.features, lang).slice(0, 4).map((f, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span className="text-green-500 font-bold" aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={`/packages/${pkg.slug}`}>{getLocalized(pkg.cta, lang)}</Link>
                  </Button>
                </CardFooter>
              </Card>
              </AnimatedCard>
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-4/5" />
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {newsError && <ErrorMessage />}

          {news && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((article, i) => (
              <AnimatedCard key={article.id} delay={i * 100} variant="fade-up" className="rounded-lg">
              <Card className="h-full card-shine card-glow border">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {getLocalized(article.category, lang)}
                  </Badge>
                  <CardTitle className="text-base leading-snug">
                    {getLocalized(article.title, lang)}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {getLocalized(article.excerpt, lang)}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(article.publishedAt, lang === 'my' ? 'my-MM' : 'en-US')}
                  </span>
                  <Button variant="link" size="sm" asChild className="p-0 h-auto">
                    <Link to={`/news/${article.slug}`}>{t('common.readMore')}</Link>
                  </Button>
                </CardFooter>
              </Card>
              </AnimatedCard>
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

      {/* CTA Section */}
      <SectionWrapper className="hero-gradient text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('home.ctaTitle')}</h2>
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
