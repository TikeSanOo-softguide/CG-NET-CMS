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
    <div className="container py-12 md:py-16 space-y-12 max-w-5xl mx-auto px-4 animate-fade-in">
      <div className="space-y-4 text-center max-w-2xl mx-auto flex flex-col items-center">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-10 w-3/4 sm:w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-full sm:w-4/5 rounded-md" />
      </div>
      {[1, 2].map((section) => (
        <div key={section} className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <div key={card} className="p-4 border border-border/50 rounded-xl space-y-3">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
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
