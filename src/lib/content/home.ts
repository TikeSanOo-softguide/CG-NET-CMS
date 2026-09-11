import { Clock, Languages, Shield, Users, Zap } from 'lucide-react'

export const homeContent = {
  features: [
    {
      icon: Zap,
      titleKey: 'home.feature1Title',
      descKey: 'home.feature1Desc',
      color: 'text-icon-lightning',
      hoverColor: 'group-hover:text-icon-lightning-hover',
      iconBg: 'bg-icon-abg',
      hoverBg: 'group-hover:bg-icon-a-hover',
      variant: 'rise' as const,
    },
    {
      icon: Shield,
      titleKey: 'home.feature2Title',
      descKey: 'home.feature2Desc',
      color: 'text-icon-shield',
      hoverColor: 'group-hover:text-icon-shield-hover',
      iconBg: 'bg-icon-bbg',
      hoverBg: 'group-hover:bg-icon-b-hover',
      variant: 'fade-up' as const,
    },
    {
      icon: Clock,
      titleKey: 'home.feature3Title',
      descKey: 'home.feature3Desc',
      color: 'text-icon-clock',
      hoverColor: 'group-hover:text-icon-clock-hover',
      iconBg: 'bg-icon-cbg',
      hoverBg: 'group-hover:bg-icon-c-hover',
      variant: 'zoom-in' as const,
    },
    {
      icon: Users,
      titleKey: 'home.feature4Title',
      descKey: 'home.feature4Desc',
      color: 'text-icon-data',
      hoverColor: 'group-hover:text-icon-data-hover',
      iconBg: 'bg-icon-dbg',
      hoverBg: 'group-hover:bg-icon-d-hover',
      variant: 'fade-right' as const,
    },
    {
      icon: Languages,
      titleKey: 'home.feature5Title',
      descKey: 'home.feature5Desc',
      color: 'text-icon-router',
      hoverColor: 'group-hover:text-icon-router-hover',
      iconBg: 'bg-icon-ebg',
      hoverBg: 'group-hover:bg-icon-e-hover',
      variant: 'fade-left' as const,
    },
  ],

  stats: [
    { value: '100,000+', labelKey: 'home.stat1Label' },
    { value: '50+', labelKey: 'home.stat2Label' },
    { value: '99.9%', labelKey: 'home.stat3Label' },
    { value: '10+', labelKey: 'home.stat4Label' },
    { value: '24/7', labelKey: 'home.stat5Label' },
  ],

  downloadItems: [{ key: 'home.downloadItem', imageUrl: '/assets/download/download-app.svg' }],
} as const
