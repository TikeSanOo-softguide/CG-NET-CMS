import { useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { normalizeLanguage } from '@/lib/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AppRoutes } from '@/routes/AppRoutes'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Toaster } from '@/components/ui/toaster'
import { analytics } from '@/lib/analytics'
import ScrollToTop from './components/common/ScrollToTop'
import AppDownloadCard from './components/common/AppDownloadCard'
import PromotionModal from './components/common/PromotionModal'
import { ApiError } from '@/lib/api/errors'
import { ConsentProvider } from './components/common/ConsentProvider'
import { useConsentManager } from '@c15t/react'
import DotBackgroundDemo from './components/ui/dot-background'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: (failureCount, error) =>
        error instanceof ApiError && error.retryable ? failureCount < 2 : false,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

function AppContent() {
  const { i18n } = useTranslation()
  const { consents } = useConsentManager()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.lang = normalizeLanguage(i18n.language)
  }, [i18n.language])

  useEffect(() => {
    if (consents.measurement) {
      analytics.trackPageView(location.pathname)
    }
  }, [consents.measurement, location.pathname])

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Header />
      <DotBackgroundDemo>
        <div className="flex-1">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </DotBackgroundDemo>
      <Footer />
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ConsentProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <ErrorBoundary>
              <PromotionModal />
              <AppDownloadCard />
              <AppContent />
              <ScrollToTop />
            </ErrorBoundary>
          </BrowserRouter>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </ConsentProvider>
    </HelmetProvider>
  )
}
