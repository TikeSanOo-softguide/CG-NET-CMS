import { apiClient } from './client'
import type { ContactSubmission } from '@/types'

export async function submitContactForm(submission: ContactSubmission): Promise<void> {
  // Omit honeypot from actual submission payload
  const { honeypot: _honeypot, ...payload } = submission
  await apiClient.post('/contactSubmissions', {
    ...payload,
    submittedAt: new Date().toISOString(),
  })
}
