export const SUPPORTED_LANGUAGES = ['en', 'my', 'zh'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export function normalizeLanguage(code?: string | null): SupportedLanguage {
  const base = (code ?? 'en').split('-')[0] as SupportedLanguage
  return SUPPORTED_LANGUAGES.includes(base) ? base : 'en'
}
