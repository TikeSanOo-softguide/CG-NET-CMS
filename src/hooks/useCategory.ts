import { getNewsCategories } from '@/lib/api/category.api'
import { useQuery } from '@tanstack/react-query'

export function useNewsCategories() {
  return useQuery({
    queryKey: ['news', 'categories'],
    queryFn: getNewsCategories,
  })
}