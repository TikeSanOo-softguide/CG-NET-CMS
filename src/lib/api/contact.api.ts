import { apiClient } from './client'
import type { Contact, ContactSubmission } from '@/types'

interface ContactResponse {
  success: boolean
  data: Contact[]
}

export async function submitContactForm(submission: ContactSubmission): Promise<void> {
  // Omit honeypot from actual submission payload
  const { honeypot: _honeypot, ...payload } = submission
  await apiClient.post('/contactSubmissions', {
    ...payload,
    submittedAt: new Date().toISOString(),
  })
}

export async function getContact(): Promise<Contact[]> {
  const response = await apiClient.get<ContactResponse>('/web-app/contacts')
  return response.data.data
}
