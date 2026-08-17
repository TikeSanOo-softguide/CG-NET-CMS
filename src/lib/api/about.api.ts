import { apiClient } from './client'
import type { AboutContent, ContactInfo, HeroSlide } from '@/types'

export async function getAboutContent(): Promise<AboutContent> {
  const { data } = await apiClient.get<AboutContent>('/aboutContent')
  return data
}

export async function getContactInfo(): Promise<ContactInfo> {
  const { data } = await apiClient.get<ContactInfo>('/contactInfo')
  return data
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const { data } = await apiClient.get<HeroSlide[]>('/heroSlides')
  return data
}
