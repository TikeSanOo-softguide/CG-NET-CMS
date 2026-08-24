import { apiClient } from './client'
import type { Promotion } from '@/types/promotion'

export async function getPromotions(
  page = 1,
  limit = 5
): Promise<{ data: Promotion[]; total: number }> {
  const { data, headers } = await apiClient.get<Promotion[]>(
    `/promotions?_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`
  )
  const total = parseInt(headers['x-total-count'] ?? String(data.length), 10)
  return { data, total }
}

export async function getPromotionBySlug(slug: string): Promise<Promotion> {
  const { data } = await apiClient.get<Promotion[]>(`/promotions?slug=${slug}`)
  if (!data.length) throw new Error('Promotion not found')
  return data[0]
}

export async function getLatestPromotions(limit = 3): Promise<Promotion[]> {
  const { data } = await apiClient.get<Promotion[]>(
    `/promotions?_sort=publishedAt&_order=desc&_limit=${limit}`
  )
  return data
}
