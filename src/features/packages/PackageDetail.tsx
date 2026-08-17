import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Check, Download, Upload, Database, FileText, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { usePackageBySlug } from '@/hooks/usePackages'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getLocalized, getLocalizedArray, formatCurrency } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

export default function PackageDetailPage() {
  const { slug = '' } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage

  const { data: pkg, isLoading, isError, refetch } = usePackageBySlug(slug)

  usePageTitle(pkg ? getLocalized(pkg.title, lang) : t('packages.detailPageTitle'))

  if (isLoading) {
    return (
      <SectionWrapper>
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </SectionWrapper>
    )
  }

  if (isError || !pkg) return <ErrorMessage onRetry={() => void refetch()} />

  const features = getLocalizedArray(pkg.features, lang)

  return (
    <main>
      <SectionWrapper>
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link to="/packages">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('packages.backToPackages')}
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-2">
              <Badge variant="secondary">{getLocalized(pkg.categoryLabel, lang)}</Badge>
              {pkg.isPopular && <Badge className="ml-2">{t('common.popular')}</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{getLocalized(pkg.title, lang)}</h1>
            <p className="text-lg text-muted-foreground mb-6">{getLocalized(pkg.description, lang)}</p>

            <Separator className="mb-6" />

            {/* Speed details */}
            <h2 className="text-xl font-semibold mb-4">{t('packages.speedDetails')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Download, label: t('packages.download'), value: `${pkg.downloadSpeed} Mbps` },
                { icon: Upload, label: t('packages.upload'), value: `${pkg.uploadSpeed} Mbps` },
                { icon: Database, label: t('packages.fup'), value: getLocalized(pkg.fup, lang) },
                { icon: FileText, label: t('packages.contract'), value: getLocalized(pkg.contractLength, lang) },
                { icon: Wrench, label: t('packages.installationFee'), value: pkg.installationFee === 0 ? t('common.free') : formatCurrency(pkg.installationFee) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-muted rounded-lg p-4 text-center">
                  <Icon className="h-5 w-5 mx-auto mb-2 text-primary" aria-hidden="true" />
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <h2 className="text-xl font-semibold mb-4">{t('packages.whatsIncluded')}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Package features">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                  <Check className="h-5 w-5 text-green-500 shrink-0" aria-hidden="true" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sticky pricing card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className={pkg.isPopular ? 'border-primary ring-2 ring-primary' : ''}>
              <CardHeader>
                <CardTitle className="text-center">{getLocalized(pkg.title, lang)}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div>
                  <span className="text-4xl font-bold text-primary">{formatCurrency(pkg.price)}</span>
                  <span className="text-muted-foreground text-sm">{t('packages.perMonth')}</span>
                </div>
                <p className="text-muted-foreground text-sm">{pkg.speed} {t('packages.download')}</p>
                <Button size="lg" className="w-full" asChild>
                  <Link to="/contact">{getLocalized(pkg.cta, lang)}</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  {getLocalized(pkg.contractLength, lang)} •{' '}
                  {pkg.installationFee === 0 ? t('common.free') : formatCurrency(pkg.installationFee)} {t('packages.installation')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
