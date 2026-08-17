import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock i18next so tests don't need HTTP backend
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
  Trans: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock react-router-dom Link/useNavigate for components that use routing
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ slug: 'test-slug' }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  }
})
