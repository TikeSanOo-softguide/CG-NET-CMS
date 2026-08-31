import type { BilingualString } from './index'

export interface Promotion {
  excerpt(
    excerpt: any,
    lang: string
  ): import('react').ReactNode | Iterable<import('react').ReactNode>
  features: boolean
  viewDetail(viewDetail: any): import('react').ReactNode | Iterable<import('react').ReactNode>
  id: string
  slug: string
  title: BilingualString
  description: BilingualString
  startDate: string
  endDate: string
  isActive: boolean
  imageUrl: string
}
