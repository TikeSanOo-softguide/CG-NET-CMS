import axios from 'axios'
import { isHttpsUrl, devLog } from '@/lib/utils'

const baseURL = import.meta.env.VITE_API_BASE_URL as string

// Refuse non-HTTPS base URL in production builds
if (import.meta.env.PROD && baseURL && !isHttpsUrl(baseURL)) {
  console.error(
    '[CG-NET] Security: VITE_API_BASE_URL must use HTTPS in production. Current value:',
    baseURL
  )
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
    // Never surface raw error messages to users — callers handle friendly messages
    return Promise.reject(error)
  }
)
