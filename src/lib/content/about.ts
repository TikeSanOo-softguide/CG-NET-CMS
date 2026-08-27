import { Users, MapPin, Activity, Award, Calendar, Network, Wrench, Settings } from 'lucide-react'

export const aboutContent = {
  stats: [
    {
      value: '100,000+',
      labelKey: 'home.stat1Label',
      icon: Users,
      color: 'text-icon-user',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-ebg',
      hoverBg: 'group-hover:bg-icon-e-hover',
    },
    {
      value: '50+',
      labelKey: 'home.stat2Label',
      icon: MapPin,
      color: 'text-icon-map',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-cbg',
      hoverBg: 'group-hover:bg-icon-c-hover',
    },
    {
      value: '99.9%',
      labelKey: 'home.stat3Label',
      icon: Activity,
      color: 'text-icon-activity',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-bbg',
      hoverBg: 'group-hover:bg-icon-b-hover',
    },
    {
      value: '10+',
      labelKey: 'home.stat4Label',
      icon: Award,
      color: 'text-icon-award',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-dbg',
      hoverBg: 'group-hover:bg-icon-d-hover',
    },
    {
      value: '24/7',
      labelKey: 'home.stat5Label',
      icon: Calendar,
      color: 'text-icon-calendar',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-abg',
      hoverBg: 'group-hover:bg-icon-a-hover',
    },
  ],

  team: [
    {
      id: '1',
      nameKey: 'about.name1',
      icon: Network,
      color: 'text-icon-map',
      hoverColor: 'group-hover:text-font-white',
      bg: 'bg-icon-cbg',
      hoverBg: 'group-hover:bg-icon-c-hover',
    },
    {
      id: '2',
      nameKey: 'about.name2',
      icon: Wrench,
      color: 'text-icon-activity',
      hoverColor: 'group-hover:text-font-white',
      bg: 'bg-icon-bbg',
      hoverBg: 'group-hover:bg-icon-b-hover',
    },
    {
      id: '3',
      nameKey: 'about.name3',
      icon: Settings,
      color: 'text-icon-award',
      hoverColor: 'group-hover:text-font-white',
      bg: 'bg-icon-dbg',
      hoverBg: 'group-hover:bg-icon-d-hover',
    },
  ],

  culture: {
    badgeKey: 'about.cultureBadge',
    titleKey1: 'about.cultureTitle1',
    titleKey2: 'about.cultureTitle2',
    descriptionKey: 'about.cultureDescription',
  },

  galleryItems: [
    {
      key: 'home.galleryItem1',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop',
    },
    {
      key: 'home.galleryItem2',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
    },
    {
      key: 'home.galleryItem3',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&fit=crop',
    },
    {
      key: 'home.galleryItem4',
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop',
    },
    {
      key: 'home.galleryItem5',
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&q=80&fit=crop',
    },
  ],
} as const
