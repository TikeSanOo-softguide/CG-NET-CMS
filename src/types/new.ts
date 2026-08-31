import { BilingualString } from "."

export interface NewsCategory {
  id: number
  slug: string
  name: BilingualString
  created_at?: string
  updated_at?: string
}

export interface NewsArticle {
  id: number
  slug: string
  title: BilingualString
  description: BilingualString
  image_url: string
  status: 'published' | 'draft' | string
  category: NewsCategory
  created_at: string
  updated_at: string
}

export interface NewsArticleResponse {
  data: NewsArticle
}