import { NewsCategory } from '@/types/new'
import { apiClient } from './client'
import { newsCategoriesResponseSchema, parseApiResponse } from './validation'

type NewsCategoriesResponse = {
  data: NewsCategory[]
}

export async function getNewsCategories(): Promise<NewsCategory[]> {
  const { data } = await apiClient.get<NewsCategoriesResponse>(
    '/web-app/categories'
  )

  return parseApiResponse<NewsCategoriesResponse>(
    newsCategoriesResponseSchema,
    data,
    'news categories'
  ).data
}