import { MapPin, MessageCircle, ShieldCheck, Smartphone, Wrench, Package, Newspaper, BadgePercent, } from "lucide-react"

export const SUPPORT_CATEGORIES = [
    { 
        key: 'app-guide', 
        labelKey: 'nav.appGuide', 
        icon: Smartphone, 
        to: '/app-guide' 
    },
    {
        key: 'available-location',
        labelKey: 'footer.availableLocation',
        icon: MapPin,
        to: '/available-location',
    },
    { 
        key: 'contact-us', 
        labelKey: 'nav.contact', 
        icon: MessageCircle, 
        to: '/contact-us' 
    },
    {
        key: 'privacy-policy',
        labelKey: 'footer.privacyPolicy',
        icon: ShieldCheck,
        to: '/privacy-policy',
    },
]

export const SERVICE_CATEGORIES = [
    { 
        key: 'services', 
        labelKey: 'nav.services', 
        icon: Wrench, 
        to: '/services' 
    },
    {
        key: 'package',
        labelKey: 'nav.packages',
        icon: Package,
        to: '/packages?category=1',
    },
]

export const NEWS_CATEGORIES = [
    { 
        key: 'news', 
        labelKey: 'nav.news', 
        icon: Newspaper, 
        to: '/news' 
    },
    {
        key: 'promotion',
        labelKey: 'nav.promotion',
        icon: BadgePercent,
        to: '/promotion',
    },
]