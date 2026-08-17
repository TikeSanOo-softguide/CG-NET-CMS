import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SupportedLanguage } from './i18n'

/**
 * Merges Tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the localized string for a bilingual field.
 * Falls back to English if the requested language is unavailable.
 */
export function getLocalized(
  field: { en: string; my: string } | string | undefined,
  lang: SupportedLanguage
): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || ''
}

/**
 * Returns a localized string array.
 */
export function getLocalizedArray(
  field: { en: string[]; my: string[] } | string[] | undefined,
  lang: SupportedLanguage
): string[] {
  if (!field) return []
  if (Array.isArray(field)) return field
  return field[lang] ?? field.en ?? []
}

/**
 * Formats a date string to a human-readable format.
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

/**
 * Formats a number as MMK currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount) + ' MMK'
}

/**
 * Truncates a string to a given length.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/**
 * Checks if a URL is HTTPS (used for production safety checks).
 */
export function isHttpsUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Only log in dev mode — never expose internals to production users.
 */
export function devLog(...args: unknown[]): void {
  if (import.meta.env.DEV) {
    console.warn('[CG-NET DEV]', ...args)
  }
}
