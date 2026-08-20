/**
 * Analytics utility — no-op by default.
 * Wire up Google Analytics, Plausible, or similar here without
 * touching individual page components.
 */

type EventProperties = Record<string, string | number | boolean>

interface AnalyticsEvent {
  name: string
  properties?: EventProperties
}

function trackEvent({ name, properties }: AnalyticsEvent): void {
  // TODO: Replace with real analytics provider
  // Example: window.gtag?.('event', name, properties)
  // Example: window.plausible?.(name, { props: properties })
  if (import.meta.env.DEV) {
    console.debug('[Analytics]', name, properties)
  }
}

function trackPageView(path: string): void {
  trackEvent({ name: 'page_view', properties: { path } })
}

export const analytics = { trackEvent, trackPageView }
