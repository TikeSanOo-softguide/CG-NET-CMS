import axios from 'axios'

export type ApiErrorKind =
  | 'http'
  | 'validation'
  | 'network'
  | 'timeout'
  | 'unknown'

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number
  readonly fields?: Record<string, string[]>
  readonly retryable: boolean

  constructor(
    message: string,
    options: {
      kind: ApiErrorKind
      status?: number
      fields?: Record<string, string[]>
      retryable?: boolean
      cause?: unknown
    }
  ) {
    super(message)
    if (options.cause !== undefined) {
      Object.defineProperty(this, 'cause', {
        configurable: true,
        value: options.cause,
      })
    }
    this.name = 'ApiError'
    this.kind = options.kind
    this.status = options.status
    this.fields = options.fields
    this.retryable = options.retryable ?? false
  }
}

function getValidationFields(data: unknown): Record<string, string[]> | undefined {
  if (!data || typeof data !== 'object' || !('errors' in data)) return undefined

  const errors = data.errors
  if (!errors || typeof errors !== 'object') return undefined

  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages.map(String) : [String(messages)],
    ])
  )
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error

  if (!axios.isAxiosError(error)) {
    return new ApiError('Unexpected API error', {
      kind: 'unknown',
      cause: error,
    })
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError('The request timed out', {
      kind: 'timeout',
      retryable: true,
      cause: error,
    })
  }

  if (!error.response) {
    return new ApiError('The service is unavailable', {
      kind: 'network',
      retryable: true,
      cause: error,
    })
  }

  const status = error.response.status
  const messageByStatus: Record<number, string> = {
    401: 'Authentication is required',
    403: 'You are not allowed to perform this action',
    404: 'The requested content was not found',
    422: 'Please check the submitted fields',
    429: 'Too many requests. Please try again later',
    500: 'The service encountered an error',
    503: 'The service is temporarily unavailable',
  }

  return new ApiError(messageByStatus[status] ?? 'The request failed', {
    kind: status === 422 ? 'validation' : 'http',
    status,
    fields: getValidationFields(error.response.data),
    retryable: status === 408 || status === 429 || status >= 500,
    cause: error,
  })
}