import axios from 'axios'
import { isHttpsUrl, devLog } from '@/lib/utils'
import { normalizeApiError } from './errors'

const baseURL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_BASE_URL || ''

if (import.meta.env.PROD && (!isHttpsUrl(baseURL) || baseURL.startsWith('/'))) {
  throw new Error('[Yaung Ni Oo] VITE_API_BASE_URL must be an HTTPS URL in production')
}

export const apiClient = axios.create({
  baseURL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    devLog('API error:', error)
    return Promise.reject(normalizeApiError(error))
  }
)
