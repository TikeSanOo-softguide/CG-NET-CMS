import { NewsArticle, NewsArticleResponse } from '@/types/new'
import { apiClient } from './client'
import { newsArticleSchema, newsResponseSchema, parseApiResponse } from './validation'

type NewsResponse = {
  data: NewsArticle[]
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export async function getNews(
  page = 1,
  limit = 6,
  search = '',
  category = '',
  lang = 'en'
): Promise<{
  data: NewsArticle[]
  total: number
}> {
  const { data } = await apiClient.get<NewsResponse>(
    '/web-app/news',
    {
      params: {
        page,
        per_page: limit,
        lang,
        ...(search.trim() && {
          search: search.trim(),
        }),
        ...(category && {
          category,
        }),
      },
    }
  )

  const parsed = parseApiResponse<NewsResponse>(
    newsResponseSchema, 
    data, 
    'news'
  )
  
  return { 
    data: parsed.data, 
    total: parsed.meta.total 
  }
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsArticleResponse> {
  const { data } = await apiClient.get<NewsArticleResponse>(
    `/web-app/news/${encodeURIComponent(slug)}`
  )
  return {
    data: parseApiResponse<NewsArticle>(newsArticleSchema, data.data, 'news article'),
  }
}

export async function getLatestNews(
  limit = 3
): Promise<NewsArticle[]> {
  const { data } = await apiClient.get<NewsResponse>(
    '/web-app/news',
    {
      params: {
        page: 1,
        per_page: limit,
      },
    }
  )
  return parseApiResponse<NewsResponse>(newsResponseSchema, data, 'latest news').data
}
