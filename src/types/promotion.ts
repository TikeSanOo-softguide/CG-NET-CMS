import type { BilingualString } from './index'

export interface Promotion {
  id: string
  slug: string
  title: BilingualString
  description: BilingualString
  startDate: string | null
  endDate: string | null
  isActive: boolean
  imageUrl: string | null
}
