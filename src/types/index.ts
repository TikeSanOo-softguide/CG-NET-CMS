export interface BilingualString {
  en: string
  my: string
  zh: string
}

export interface BilingualStringArray {
  en: string[]
  my: string[]
  zh: string[]
}

export interface Service {
  id: string
  slug: string
  title: BilingualString
  description: BilingualString
  icon: string
  features: BilingualStringArray
  category: string
  imageUrl: string
}

export interface Package {
  id: string
  slug: string
  category: string
  categoryLabel: BilingualString
  title: BilingualString
  description: BilingualString
  speed: string
  downloadSpeed: number
  uploadSpeed: number
  price: number
  currency: string
  priceLabel: BilingualString
  fup: BilingualString
  contractLength: BilingualString
  installationFee: number
  isPopular: boolean
  isFeatured: boolean
  features: BilingualStringArray
  cta: BilingualString
  imageUrl: string
}

export interface NewsArticle {
  id: string
  slug: string
  title: BilingualString
  excerpt: BilingualString
  content: BilingualString
  category: BilingualString
  author: BilingualString
  publishedAt: string
  imageUrl: string
  tags: string[]
}

export interface Career {
  id: string
  slug: string
  title: BilingualString
  department: BilingualString
  location: BilingualString
  type: BilingualString
  salary: BilingualString
  description: BilingualString
  requirements: BilingualStringArray
  responsibilities: BilingualStringArray
  publishedAt: string
  isActive: boolean
}

export interface GuideStep {
  id: string
  slug: string
  order: number
  title: BilingualString
  description: BilingualString
  icon: string
  steps: BilingualStringArray
  imageUrl: string
}

export interface TeamMember {
  id: string
  name: BilingualString
  role: BilingualString
  imageUrl: string
}

export interface Stat {
  label: BilingualString
  value: string
}

export interface AboutContent {
  id: string
  companyName: string
  tagline: BilingualString
  mission: BilingualString
  vision: BilingualString
  foundedYear: number
  headquarters: BilingualString
  employees: string
  coverageAreas: string
  stats: Stat[]
  team: TeamMember[]
}

export interface ContactInfo {
  id: string
  phone: string
  hotline: string
  email: string
  salesEmail: string
  address: BilingualString
  workingHours: BilingualString
  social: {
    facebook: string
    twitter: string
    youtube: string
  }
}

export interface HeroSlide {
  id: string
  title: BilingualString
  subtitle: BilingualString
  cta: BilingualString
  ctaLink: string
  imageUrl: string
  overlayColor?: string
}

export interface ContactSubmission {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  honeypot?: string
}

export interface Banner {
  id: number
  image_url_en: string
  image_url_zh: string
  image_url_my: string
}

export interface Contact {
  id: number
  contact_point: string
}
