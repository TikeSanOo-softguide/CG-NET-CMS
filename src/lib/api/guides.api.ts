import { apiClient } from './client'
import type { GuideStep } from '@/types'

export async function getGuides(): Promise<GuideStep[]> {
  const { data } = await apiClient.get<GuideStep[]>('/guides?_sort=order&_order=asc')
  return data
}

export async function getGuideBySlug(slug: string): Promise<GuideStep> {
  const { data } = await apiClient.get<GuideStep[]>(`/guides?slug=${slug}`)
  if (!data.length) throw new Error('Guide step not found')
  return data[0]
}
