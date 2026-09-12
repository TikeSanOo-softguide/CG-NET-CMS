import { ConsentManagerProvider, ConsentBanner } from '@c15t/react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { normalizeLanguage } from '@/lib/i18n'

interface ConsentProviderProps {
    children: ReactNode
}

export function ConsentProvider({
    children,
}: ConsentProviderProps) {
    const { t, i18n } = useTranslation()
    const locale = normalizeLanguage(i18n.language)

    return (
        <ConsentManagerProvider
            options={{
                mode: 'offline',

                legalLinks: {
                    privacyPolicy: {
                        href: '/privacy-policy',
                        target: '_self',
                    },
                },

                i18n: {
                    locale,
                    detectBrowserLanguage: false,
                    messages: {
                        [locale]: {
                            cookieBanner: {
                                title: t('cookieConsent.privacyPolicy'),
                                description: t('cookieConsent.description'),
                            },
                            common: {
                                acceptAll: t('cookieConsent.accept'),
                                rejectAll: t('cookieConsent.reject'),
                            },
                            legalLinks: {
                                privacyPolicy: t('cookieConsent.privacyPolicy'),
                            },
                        },
                    },
                },

                theme: {
                    colors: {
                        primary: 'var(--color-primary)',
                        primaryHover: 'var(--color-hover)',
                        surface: 'var(--background)',
                        surfaceHover: 'var(--background)',
                        border: 'var(--border)',
                        text: 'var(--foreground)',
                        textMuted: 'var(--muted-foreground)',
                        textOnPrimary: 'var(--primary-foreground)',
                    },

                    slots: {
                        consentBanner:
                            'c15t-consent-banner fixed inset-x-0 bottom-0 z-[9999] w-full',

                        consentBannerCard:
                            'flex w-full max-w-none flex-col rounded-xl border-0 bg-background shadow-none sm:flex-row sm:items-center',

                        consentBannerHeader: 'min-w-0 flex-1 px-4 py-2 sm:px-6',

                        consentBannerTitle: 'hidden',

                        consentBannerTag: 'hidden',

                        consentBannerDescription:
                            'm-0 text-[12px] font-normal leading-[1.4] text-foreground sm:text-[13px]',

                        consentBannerFooter:
                            'flex shrink-0 items-center justify-end gap-4 border-0 bg-background px-4 py-2 sm:px-6',

                        consentBannerFooterSubGroup: 'flex items-center gap-4',

                        buttonSecondary:
                            'h-auto rounded-none border-0 border-b border-gray-500 bg-transparent px-0 py-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-600 shadow-none hover:border-foreground hover:bg-transparent hover:text-foreground',

                        buttonPrimary:
                            'h-8 min-w-[64px] rounded-none border-0 !bg-[var(--color-primary)] px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-none transition-colors hover:!bg-[var(--color-hover)]',
                    },

                    consentActions: {
                        accept: {
                            variant: 'primary',
                            mode: 'filled',
                        },

                        reject: {
                            variant: 'neutral',
                            mode: 'ghost',
            },
                    },
                },
            }}
        >
            {children}
            <ConsentBanner
                title={t('cookieConsent.privacyPolicy')}
                description={t('cookieConsent.description')}
                rejectButtonText={t('cookieConsent.reject')}
                acceptButtonText={t('cookieConsent.accept')}
                layout={['reject', 'accept']}
                primaryButton="accept"
                legalLinks={['privacyPolicy']}
                hideBranding
            />

        </ConsentManagerProvider>
    )
}