import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ContactForm } from '@/components/forms/ContactForm'

// Mock the API call
vi.mock('@/lib/api/contact.api', () => ({
  submitContactForm: vi.fn().mockResolvedValue(undefined),
}))

// Mock toast
vi.mock('@/hooks/useToast', () => ({
  toast: vi.fn(),
}))

function renderForm() {
  return render(
    <BrowserRouter>
      <ContactForm />
    </BrowserRouter>
  )
}

describe('ContactForm', () => {
  it('renders all form fields', () => {
    renderForm()
    expect(screen.getByLabelText(/contact.form.name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contact.form.email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contact.form.phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contact.form.subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contact.form.message/i)).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    renderForm()
    const submitBtn = screen.getByRole('button', { name: /contact.form.submit/i })
    await user.click(submitBtn)
    // Errors should appear after submission attempt
    await waitFor(() => {
      const alerts = screen.queryAllByRole('alert')
      expect(alerts.length).toBeGreaterThan(0)
    })
  })

  it('submit button is present and enabled initially', () => {
    renderForm()
    const btn = screen.getByRole('button', { name: /contact.form.submit/i })
    expect(btn).toBeInTheDocument()
    expect(btn).not.toBeDisabled()
  })

  it('honeypot field is visually hidden', () => {
    renderForm()
    const honeypot = document.querySelector('input[name="website"]')
    expect(honeypot).toBeInTheDocument()
    // Should be in a hidden container
    const parent = honeypot?.closest('[aria-hidden="true"]')
    expect(parent).toBeInTheDocument()
  })
})
