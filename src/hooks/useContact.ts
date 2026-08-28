import { useQuery } from '@tanstack/react-query'

import { getContact } from '@/lib/api/contact.api'

export function useContact() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContact,
  })
}