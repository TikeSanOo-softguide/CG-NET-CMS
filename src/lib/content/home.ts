import { Clock, Database, Router, Shield, Zap } from 'lucide-react'

export const homeContent = {
  features: [
    { icon: Zap, titleKey: 'home.feature1Title', descKey: 'home.feature1Desc', color: 'text-yellow-500', hoverColor: 'group-hover:text-yellow-300', iconBg: 'bg-yellow-500/15', hoverBg: 'group-hover:bg-yellow-400/30', variant: 'rise' as const },
    { icon: Shield, titleKey: 'home.feature2Title', descKey: 'home.feature2Desc', color: 'text-green-500', hoverColor: 'group-hover:text-green-300', iconBg: 'bg-green-500/15', hoverBg: 'group-hover:bg-green-400/30', variant: 'fade-up' as const },
    { icon: Clock, titleKey: 'home.feature3Title', descKey: 'home.feature3Desc', color: 'text-blue-500', hoverColor: 'group-hover:text-blue-300', iconBg: 'bg-blue-500/15', hoverBg: 'group-hover:bg-blue-300/30', variant: 'zoom-in' as const },
    { icon: Database, titleKey: 'home.feature4Title', descKey: 'home.feature4Desc', color: 'text-purple-500', hoverColor: 'group-hover:text-purple-300', iconBg: 'bg-purple-500/15', hoverBg: 'group-hover:bg-purple-400/30', variant: 'fade-right' as const },
    { icon: Router, titleKey: 'home.feature5Title', descKey: 'home.feature5Desc', color: 'text-cyan-500', hoverColor: 'group-hover:text-cyan-300', iconBg: 'bg-cyan-500/15', hoverBg: 'group-hover:bg-cyan-400/30', variant: 'fade-left' as const },
  ],

  stats: [
    { value: '200,000+', labelKey: 'home.stat1Label' },
    { value: '50+', labelKey: 'home.stat2Label' },
    { value: '99.9%', labelKey: 'home.stat3Label' },
    { value: '10+', labelKey: 'home.stat4Label' },
    { value: '24/7', labelKey: 'home.stat5Label' },
  ],

  galleryItems: [
    { key: 'home.galleryItem1', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop'},
    { key: 'home.galleryItem2', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop'},
    { key: 'home.galleryItem3', imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&fit=crop'},
    { key: 'home.galleryItem4', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop'},
    { key: 'home.galleryItem5', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&fit=crop'},
    { key: 'home.galleryItem5', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&fit=crop'},
  ],

  downloadItems: [
    { key: 'home.downloadItem', imageUrl: '/assets/download/download-app.svg' },
  ],
} as const