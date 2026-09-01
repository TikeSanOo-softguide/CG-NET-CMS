import { NewsCategory } from '@/types/new'
import { apiClient } from './client'

type NewsCategoriesResponse = {
  data: NewsCategory[]
}

export async function getNewsCategories(): Promise<NewsCategory[]> {
  const { data } = await apiClient.get<NewsCategoriesResponse>(
    '/web-app/categories'
  )

  return data.data
}