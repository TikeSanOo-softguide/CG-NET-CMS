export const SUPPORTED_LANGUAGES = ['en', 'my', 'zh'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export function normalizeLanguage(code: string): SupportedLanguage {
  const base = code.split('-')[0] as SupportedLanguage
  return SUPPORTED_LANGUAGES.includes(base) ? base : 'en'
}
