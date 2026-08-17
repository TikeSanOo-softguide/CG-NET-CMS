import { useQuery } from '@tanstack/react-query'
import { getAboutContent, getContactInfo, getHeroSlides } from '@/lib/api/about.api'

export function useAboutContent() {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAboutContent,
  })
}

export function useContactInfo() {
  return useQuery({
    queryKey: ['contactInfo'],
    queryFn: getContactInfo,
  })
}

export function useHeroSlides() {
  return useQuery({
    queryKey: ['heroSlides'],
    queryFn: getHeroSlides,
  })
}
