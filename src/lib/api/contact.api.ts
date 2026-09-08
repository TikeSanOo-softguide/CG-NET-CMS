import { apiClient } from './client'
import type { Contact } from '@/types'
import { contactResponseSchema, parseApiResponse } from './validation'

interface ContactResponse {
  success: boolean
  data: Contact[]
}

export async function getContact(): Promise<Contact[]> {
  const response = await apiClient.get<ContactResponse>('/web-app/contacts')
  return parseApiResponse<ContactResponse>(contactResponseSchema, response.data, 'contacts').data
}
