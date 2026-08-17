import { apiClient } from './client'
import type { Service } from '@/types'

export async function getServices(): Promise<Service[]> {
  const { data } = await apiClient.get<Service[]>('/services')
  return data
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const { data } = await apiClient.get<Service[]>(`/services?slug=${slug}`)
  if (!data.length) throw new Error('Service not found')
  return data[0]
}
