import { useTranslation } from 'react-i18next'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" aria-hidden="true" />
      <h3 className="text-lg font-semibold mb-2">{t('common.error')}</h3>
      {message && import.meta.env.DEV && (
        <p className="text-sm text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">{message}</p>
      )}
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
