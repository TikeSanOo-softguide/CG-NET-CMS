import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy-loaded route components — code split per route for performance
const HomePage = lazy(() => import('@/features/home'))
const ServicesPage = lazy(() => import('@/features/services'))
const PackagesPage = lazy(() => import('@/features/packages'))
const PackageDetailPage = lazy(() => import('@/features/packages/PackageDetail'))
const NewsPage = lazy(() => import('@/features/news'))
const NewsDetailPage = lazy(() => import('@/features/news/NewsDetail'))
const CareerPage = lazy(() => import('@/features/career'))
const CareerDetailPage = lazy(() => import('@/features/career/CareerDetail'))
const PromotionPage = lazy(() => import('@/features/promotion'))
const PromotionDetailPage = lazy(() => import('@/features/promotion/PromotionDetail'))
const AppGuidePage = lazy(() => import('@/features/app-guide'))
const PrivacyPage = lazy(() => import('@/features/privacy-policy'))
const AboutPage = lazy(() => import('@/features/about'))
const ContactPage = lazy(() => import('@/features/contact'))
const NotFoundPage = lazy(() => import('@/features/not-found'))

function PageLoader() {
  return (
    <div className="container py-16 space-y-4 max-w-4xl">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-5/6" />
      <div className="grid grid-cols-3 gap-4 pt-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:slug" element={<PackageDetailPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/career/:slug" element={<CareerDetailPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/promotion/:slug" element={<PromotionDetailPage />} />
        <Route path="/app-guide" element={<AppGuidePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
