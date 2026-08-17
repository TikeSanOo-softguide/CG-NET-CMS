import { apiClient } from './client'
import type { Career } from '@/types'

export async function getCareers(): Promise<Career[]> {
  const { data } = await apiClient.get<Career[]>('/careers?isActive=true')
  return data
}

export async function getCareerBySlug(slug: string): Promise<Career> {
  const { data } = await apiClient.get<Career[]>(`/careers?slug=${slug}`)
  if (!data.length) throw new Error('Position not found')
  return data[0]
}
