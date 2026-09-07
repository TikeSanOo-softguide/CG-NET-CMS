import { apiClient } from './client'
import type { AboutContent, ContactInfo, HeroSlide } from '@/types'
import { apiArraySchema, apiObjectSchema, parseApiResponse } from './validation'

export async function getAboutContent(): Promise<AboutContent> {
  const { data } = await apiClient.get<AboutContent>('/aboutContent')
  return parseApiResponse<AboutContent>(apiObjectSchema, data, 'about content')
}

export async function getContactInfo(): Promise<ContactInfo> {
  const { data } = await apiClient.get<ContactInfo>('/contactInfo')
  return parseApiResponse<ContactInfo>(apiObjectSchema, data, 'contact info')
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const { data } = await apiClient.get<HeroSlide[]>('/heroSlides')
  return parseApiResponse<HeroSlide[]>(apiArraySchema, data, 'hero slides')
}
