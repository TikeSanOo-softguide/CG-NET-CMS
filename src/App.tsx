import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
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
import ScrollToTop from './components/common/ScrollToTop'
// import AppDownloadCard from './components/common/AppDownloadCard'
import PromotionModal from './components/common/PromotionModal'
// import { ConsentProvider } from './components/common/ConsentProvider'
import DotBackgroundDemo from './components/ui/dot-background'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

function AppContent() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = normalizeLanguage(i18n.language)
  }, [i18n.language])

  return (
    <DotBackgroundDemo>
      <Header />
      <main className="flex flex-1 flex-col">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster />
    </DotBackgroundDemo>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      {/* <ConsentProvider> */}
        <QueryClientProvider client={queryClient}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <ErrorBoundary>
              <PromotionModal lang={''} />
              {/* <AppDownloadCard /> */}
              <AppContent />
              <ScrollToTop />
            </ErrorBoundary>
          </BrowserRouter>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      {/* </ConsentProvider> */}
    </HelmetProvider>
  )
}
