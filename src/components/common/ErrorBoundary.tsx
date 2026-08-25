import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { devLog } from '@/lib/utils'
import { t } from 'i18next'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    devLog('ErrorBoundary caught:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <img 
            src="/assets/error/500.svg" 
            className="mx-auto w-64 h-64 object-contain" 
            alt="500 - Unexpected Error" 
            loading="eager"
          />
          <h2 className="text-2xl font-bold text-red-500 mb-3">{t('common.error')}</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {t('common.errorSubtitle')}
          </p>
          <div className="flex gap-3">
            <Button onClick={this.handleReload}>{t('common.reload')}</Button>
            <Button variant="outline" onClick={this.handleReset}>
              {t('common.tryagain')}
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
