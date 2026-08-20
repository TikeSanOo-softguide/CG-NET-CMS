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
import { analytics } from '@/lib/analytics'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function AppContent() {
  const { i18n } = useTranslation()

  // Sync html[lang] on language change (drives Myanmar and Chinese font CSS)
  useEffect(() => {
    document.documentElement.lang = normalizeLanguage(i18n.language)
  }, [i18n.language])

  // Analytics — track initial page view on mount
  useEffect(() => {
    analytics.trackPageView(window.location.pathname)
  }, [])

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Header />
      <div className="flex-1">
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter 
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}>
          <AppContent />
        </BrowserRouter>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </HelmetProvider>
  )
}
