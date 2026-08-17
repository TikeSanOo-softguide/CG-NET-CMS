import { apiClient } from './client'
import type { NewsArticle } from '@/types'

export async function getNews(page = 1, limit = 6): Promise<{ data: NewsArticle[]; total: number }> {
  const { data, headers } = await apiClient.get<NewsArticle[]>(
    `/news?_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`
  )
  const total = parseInt(headers['x-total-count'] ?? String(data.length), 10)
  return { data, total }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle> {
  const { data } = await apiClient.get<NewsArticle[]>(`/news?slug=${slug}`)
  if (!data.length) throw new Error('Article not found')
  return data[0]
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  const { data } = await apiClient.get<NewsArticle[]>(
    `/news?_sort=publishedAt&_order=desc&_limit=${limit}`
  )
  return data
}
