import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { SUPPORTED_LANGUAGES } from './languages'

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LANGUAGES],
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    defaultNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'cgnet_language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React handles XSS escaping
    },
    react: {
      useSuspense: true,
    },
  })

export default i18n
export { SUPPORTED_LANGUAGES } from './languages'
export type { SupportedLanguage } from './languages'
export { normalizeLanguage } from './languages'
