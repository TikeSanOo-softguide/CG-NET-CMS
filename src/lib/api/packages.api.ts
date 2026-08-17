import { apiClient } from './client'
import type { Package } from '@/types'

export async function getPackages(category?: string): Promise<Package[]> {
  const url = category ? `/packages?category=${category}` : '/packages'
  const { data } = await apiClient.get<Package[]>(url)
  return data
}

export async function getPackageBySlug(slug: string): Promise<Package> {
  const { data } = await apiClient.get<Package[]>(`/packages?slug=${slug}`)
  if (!data.length) throw new Error('Package not found')
  return data[0]
}

export async function getFeaturedPackages(): Promise<Package[]> {
  const { data } = await apiClient.get<Package[]>('/packages?isFeatured=true')
  return data
}
