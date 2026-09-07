import { apiClient } from './client'
import type { Service } from '@/types'
import { apiArraySchema, parseApiResponse } from './validation'

export async function getServices(): Promise<Service[]> {
  const { data } = await apiClient.get<Service[]>('/services')
  return parseApiResponse<Service[]>(apiArraySchema, data, 'services')
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const { data } = await apiClient.get<Service[]>(`/services?slug=${slug}`)
  const services = parseApiResponse<Service[]>(apiArraySchema, data, 'service lookup')
  if (!services.length) throw new Error('Service not found')
  return services[0]
}
