import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/useToast'
import { submitContactForm } from '@/lib/api/contact.api'
import { devLog } from '@/lib/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'contact.form.nameTooShort').max(100),
  email: z.string().email('contact.form.invalidEmail'),
  phone: z
    .string()
    .min(7, 'contact.form.invalidPhone')
    .max(20)
    .regex(/^[+0-9\s\-()]+$/, 'contact.form.invalidPhone'),
  subject: z.string().min(3, 'contact.form.required').max(200),
  message: z.string().min(10, 'contact.form.messageTooShort').max(2000),
  // Honeypot — should always be empty; bots often fill it
  website: z.string().max(0, ''),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: '' },
  })

  async function onSubmit(data: ContactFormValues) {
    // Debounce/disable double-submit — real rate limiting is server-side
    if (isSubmitting) return
    setIsSubmitting(true)

    // Silently drop submissions where the honeypot was filled by a bot
    if (data.website) {
      devLog('Honeypot triggered — submission silently ignored')
      setIsSubmitting(false)
      return
    }

    try {
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      })
      toast({ variant: 'success', title: '✓', description: t('contact.form.success') })
      reset()
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: t('contact.form.error') })
    } finally {
      // Re-enable after 3s to prevent accidental double-submit
      submitTimerRef.current = setTimeout(() => setIsSubmitting(false), 3000)
    }
  }

  function getError(field: keyof Omit<ContactFormValues, 'website'>): string | undefined {
    const msg = errors[field]?.message
    if (!msg) return undefined
    // Translate zod error keys that map to i18n keys
    return msg.startsWith('contact.') ? t(msg) : msg
  }

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="space-y-5">
      {/* Honeypot — visually hidden, never shown to real users */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] opacity-0 h-0 overflow-hidden">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            {t('contact.form.name')} <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-name"
            type="text"
            placeholder={t('contact.form.namePlaceholder')}
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-sm text-destructive">
              {getError('name')}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="contact-email">
            {t('contact.form.email')} <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder={t('contact.form.emailPlaceholder')}
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-destructive">
              {getError('email')}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="contact-phone">
            {t('contact.form.phone')} <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder={t('contact.form.phonePlaceholder')}
            autoComplete="tel"
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-sm text-destructive">
              {getError('phone')}
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="contact-subject">
            {t('contact.form.subject')} <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <Input
            id="contact-subject"
            type="text"
            placeholder={t('contact.form.subjectPlaceholder')}
            aria-required="true"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            {...register('subject')}
          />
          {errors.subject && (
            <p id="subject-error" role="alert" className="text-sm text-destructive">
              {getError('subject')}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="contact-message">
          {t('contact.form.message')} <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="contact-message"
          placeholder={t('contact.form.messagePlaceholder')}
          rows={5}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {getError('message')}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto gap-2">
        <Send className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
      </Button>
    </form>
  )
}
