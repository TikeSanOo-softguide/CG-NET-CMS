import { useMutation, useQuery } from '@tanstack/react-query'

import { getContact, submitContactForm } from '@/lib/api/contact.api'

export function useContact() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContact,
  })
}

export function useContactSubmission() {
  return useMutation({ mutationFn: submitContactForm })
}