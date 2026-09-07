import type { BilingualString } from './index'

export interface Promotion {
  id: string
  slug: string
  title: BilingualString
  description: BilingualString
  startDate: string
  endDate: string
  isActive: boolean
  imageUrl: string | null
}
