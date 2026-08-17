import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// Setup mocks before importing component
const mockChangeLanguage = vi.fn()
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: mockChangeLanguage },
  }),
}))

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

function renderSwitcher() {
  return render(
    <BrowserRouter>
      <LanguageSwitcher />
    </BrowserRouter>
  )
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a language toggle button', () => {
    renderSwitcher()
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
  })

  it('has accessible aria-label', () => {
    renderSwitcher()
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-label')
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    const btn = screen.getByRole('button')
    await user.click(btn)
    // Both language options should appear (English appears in button label AND menu item)
    const englishItems = screen.getAllByText('English')
    expect(englishItems.length).toBeGreaterThan(0)
    expect(screen.getByText('မြန်မာ')).toBeInTheDocument()
  })

  it('calls changeLanguage when a language is selected', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('မြန်မာ'))
    expect(mockChangeLanguage).toHaveBeenCalledWith('my')
  })
})
