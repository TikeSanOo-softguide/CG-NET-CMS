import type { BilingualString } from './index'

export interface Promotion {
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
