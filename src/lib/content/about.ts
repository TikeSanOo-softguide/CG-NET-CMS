import { Users, MapPin, Activity, Award, Calendar, Network, Wrench, Settings } from 'lucide-react'

export const aboutContent = {
  stats: [
    {
      value: '200,000+',
      labelKey: 'home.stat1Label',
      icon: Users,
      color: 'text-primary',
      hoverColor: 'group-hover:text-primary-foreground',
      iconBg: 'bg-primary/15',
      hoverBg: 'group-hover:bg-primary',
    },
    {
      value: '50+',
      labelKey: 'home.stat2Label',
      icon: MapPin,
      color: 'text-blue-500',
      hoverColor: 'group-hover:text-blue-300',
      iconBg: 'bg-blue-500/15',
      hoverBg: 'group-hover:bg-blue-600',
    },
    {
      value: '99.9%',
      labelKey: 'home.stat3Label',
      icon: Activity,
      color: 'text-green-500',
      hoverColor: 'group-hover:text-green-300',
      iconBg: 'bg-green-500/15',
      hoverBg: 'group-hover:bg-green-600',
    },
    {
      value: '10+',
      labelKey: 'home.stat4Label',
      icon: Award,
      color: 'text-purple-500',
      hoverColor: 'group-hover:text-purple-300',
      iconBg: 'bg-purple-500/15',
      hoverBg: 'group-hover:bg-purple-600',
    },
    {
      value: '24/7',
      labelKey: 'home.stat5Label',
      icon: Calendar,
      color: 'text-orange-500',
      hoverColor: 'group-hover:text-orange-300',
      iconBg: 'bg-orange-500/15',
      hoverBg: 'group-hover:bg-orange-600',
    },
  ],

  team: [
    {
      id: '1',
      nameKey: 'about.name1',
      icon: Network,
    },
    {
      id: '2',
      nameKey: 'about.name2',
      icon: Wrench,
    },
    {
      id: '3',
      nameKey: 'about.name3',
      icon: Settings,
    },
  ],

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
