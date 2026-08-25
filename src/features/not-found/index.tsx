import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageTitle(t('common.notFound'))

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <img 
        src="/assets/error/404.svg" 
        className="mx-auto w-64 h-64 object-contain" 
        alt="404 - Page not found" 
        loading="eager"
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t('common.notFound')}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">{t('common.notFoundDesc')}</p>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Button asChild className='bg-app-primary'>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('common.backToHome')}
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('common.goBack')}
        </Button>
      </div>
    </main>
  )
}
