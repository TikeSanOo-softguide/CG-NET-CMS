import { useQuery } from '@tanstack/react-query'
import { getNews, getNewsBySlug, getLatestNews } from '@/lib/api/news.api'
import { useTranslation } from 'react-i18next'

export function useNews(
    page = 1, 
    limit = 6,
    search = '', 
    category = ''
  ) {
    const { i18n } = useTranslation()
    const lang = i18n.language.split('-')[0]
    return useQuery({
      queryKey: ['news', page, limit, search, category, lang],
      queryFn: () => getNews(
        page, 
        limit, 
        search, 
        category,
        lang
      ),
      placeholderData: (previousData) => previousData,
    })
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: ['news-article', slug],
    queryFn: async () => {
      const response = await getNewsBySlug(slug)
      return response.data
    },
    enabled: Boolean(slug),
  })
}

export function useLatestNews(limit = 3) {
  return useQuery({
    queryKey: ['news', 'latest', limit],
    queryFn: () => getLatestNews(limit),
  })
}
