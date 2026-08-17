import { useQuery } from '@tanstack/react-query'
import { getNews, getNewsBySlug, getLatestNews } from '@/lib/api/news.api'

export function useNews(page = 1, limit = 6) {
  return useQuery({
    queryKey: ['news', page, limit],
    queryFn: () => getNews(page, limit),
  })
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: ['news-article', slug],
    queryFn: () => getNewsBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useLatestNews(limit = 3) {
  return useQuery({
    queryKey: ['news', 'latest', limit],
    queryFn: () => getLatestNews(limit),
  })
}
