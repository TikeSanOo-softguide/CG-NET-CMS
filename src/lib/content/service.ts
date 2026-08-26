import {
  Gauge,
  ShieldCheck,
  Wrench,
  Headphones,
  Server,
  Globe,
  UserRound,
  Wifi,
  Infinity,
  Router,
  Settings,
} from 'lucide-react'

export const serviceContent = {
  services: [
    {
      id: '1',
      slug: 'mm-broadband',
      titleKey: 'services.mmBroadband.title',
      descriptionKey: 'services.mmBroadband.description',
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
      color: 'text-icon-user',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-ebg',
      hoverBg: 'group-hover:bg-icon-e-hover',
      features: [
        {
          key: 'speed',
          labelKey: 'services.mmBroadband.features.speed',
          icon: Gauge,
        },
        {
          key: 'uptime',
          labelKey: 'services.mmBroadband.features.uptime',
          icon: ShieldCheck,
        },
        {
          key: 'installation',
          labelKey: 'services.mmBroadband.features.installation',
          icon: Wrench,
        },
        {
          key: 'support',
          labelKey: 'services.mmBroadband.features.support',
          icon: Headphones,
        },
      ],
    },
    {
      id: '2',
      slug: 'cg-broadband',
      titleKey: 'services.cgBroadband.title',
      descriptionKey: 'services.cgBroadband.description',
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
      color: 'text-icon-business',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-business-bg',
      hoverBg: 'group-hover:bg-icon-business-hover',

      features: [
        {
          key: 'bandwidth',
          labelKey: 'services.cgBroadband.features.bandwidth',
          icon: Server,
        },
        {
          key: 'staticIp',
          labelKey: 'services.cgBroadband.features.staticIp',
          icon: Globe,
        },
        {
          key: 'sla',
          labelKey: 'services.cgBroadband.features.sla',
          icon: ShieldCheck,
        },
        {
          key: 'support',
          labelKey: 'services.cgBroadband.features.support',
          icon: UserRound,
        },
      ],
    },
    {
      id: '3',
      slug: 'cg-net-broadband',
      titleKey: 'services.cgNetBroadband.title',
      descriptionKey: 'services.cgNetBroadband.description',
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
      color: 'text-icon-home',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-home-bg',
      hoverBg: 'group-hover:bg-icon-home-hover',

      features: [
        {
          key: 'speedTiers',
          labelKey: 'services.cgNetBroadband.features.speedTiers',
          icon: Wifi,
        },
        {
          key: 'unlimitedData',
          labelKey: 'services.cgNetBroadband.features.unlimitedData',
          icon: Infinity,
        },
        {
          key: 'freeRouter',
          labelKey: 'services.cgNetBroadband.features.freeRouter',
          icon: Router,
        },
        {
          key: 'easySetup',
          labelKey: 'services.cgNetBroadband.features.easySetup',
          icon: Settings,
        },
      ],
    },
    {
      id: '4',
      slug: 'iptv-service',
      titleKey: 'services.iptv.title',
      descriptionKey: 'services.iptv.description',
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
      color: 'text-icon-home',
      hoverColor: 'group-hover:text-font-white',
      iconBg: 'bg-icon-home-bg',
      hoverBg: 'group-hover:bg-icon-home-hover',

      features: [
        {
          key: 'speedTiers',
          labelKey: 'services.iptv.features.channels',
          icon: Wifi,
        },
        {
          key: 'unlimitedData',
          labelKey: 'services.iptv.features.resolution',
          icon: Infinity,
        },
        {
          key: 'freeRouter',
          labelKey: 'services.iptv.features.service',
          icon: Router,
        },
        {
          key: 'easySetup',
          labelKey: 'services.iptv.features.easySetup',
          icon: Settings,
        },
      ],
    },
  ],
}