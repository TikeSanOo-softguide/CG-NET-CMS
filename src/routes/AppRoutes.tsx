import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = lazy(() => import('@/features/home'))
const ServicesPage = lazy(() => import('@/features/services'))
const PackagesPage = lazy(() => import('@/features/packages'))
const NewsPage = lazy(() => import('@/features/news'))
const NewsDetailPage = lazy(() => import('@/features/news/NewsDetail'))
const PromotionPage = lazy(() => import('@/features/promotion'))
const PromotionDetailPage = lazy(() => import('@/features/promotion/PromotionDetail'))
const AppGuidePage = lazy(() => import('@/features/app-guide'))
const PrivacyPage = lazy(() => import('@/features/privacy-policy'))
const AboutPage = lazy(() => import('@/features/about'))
const NotFoundPage = lazy(() => import('@/features/not-found'))
const AvailableLocationPage = lazy(() => import('@/features/available-location'))
const ContactPage = lazy(() => import('@/features/contact-us'))

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
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/promotion/:slug" element={<PromotionDetailPage />} />
        <Route path="/app-guide" element={<AppGuidePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route
          path="/available-location"
          element={<AvailableLocationPage state={null} area={null} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
