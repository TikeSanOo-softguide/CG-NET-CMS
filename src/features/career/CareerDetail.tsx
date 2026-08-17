import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, MapPin, Clock, Briefcase, DollarSign, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { ErrorMessage } from '@/components/common/ErrorMessage'
import { useCareerBySlug } from '@/hooks/useCareers'
import { usePageTitle } from '@/hooks/usePageTitle'
import { toast } from '@/hooks/useToast'
import { getLocalized, getLocalizedArray } from '@/lib/utils'
import type { SupportedLanguage } from '@/lib/i18n'

// Max resume file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['.pdf', '.doc', '.docx']
const ALLOWED_MIME = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export default function CareerDetailPage() {
  const { slug = '' } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as SupportedLanguage
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const { data: career, isLoading, isError, refetch } = useCareerBySlug(slug)

  usePageTitle(career ? getLocalized(career.title, lang) : t('career.detailPageTitle'))

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFileError(null)
    if (!file) return

    // Client-side validation — server MUST re-validate (never trust client alone)
    if (!ALLOWED_MIME.includes(file.type)) {
      setFileError(`Only ${ALLOWED_TYPES.join(', ')} files are accepted`)
      e.target.value = ''
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File must be under 5MB')
      e.target.value = ''
    }
  }

  function handleApply(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    // Mock submission — real implementation would POST FormData to backend
    setTimeout(() => {
      toast({ variant: 'success', title: '✓', description: 'Application submitted! We will be in touch soon.' })
      formRef.current?.reset()
      setIsSubmitting(false)
    }, 1200)
  }

  if (isLoading) {
    return (
      <SectionWrapper>
        <Skeleton className="h-8 w-40 mb-6" />
        <Skeleton className="h-10 w-2/3 mb-3" />
        <Skeleton className="h-5 w-1/2 mb-6" />
      </SectionWrapper>
    )
  }

  if (isError || !career) return <ErrorMessage onRetry={() => void refetch()} />

  const requirements = getLocalizedArray(career.requirements, lang)
  const responsibilities = getLocalizedArray(career.responsibilities, lang)

  return (
    <main>
      <SectionWrapper>
        <Button variant="ghost" asChild className="mb-6 gap-2">
          <Link to="/career">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('career.backToCareers')}
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="mb-3">{getLocalized(career.department, lang)}</Badge>
            <h1 className="text-3xl font-bold mb-4">{getLocalized(career.title, lang)}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {getLocalized(career.location, lang)}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                {getLocalized(career.type, lang)}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" aria-hidden="true" />
                {getLocalized(career.salary, lang)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Posted {new Date(career.publishedAt).toLocaleDateString()}
              </span>
            </div>

            <Separator className="mb-6" />

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {getLocalized(career.description, lang)}
            </p>

            <h2 className="text-xl font-semibold mb-4">{t('career.responsibilities')}</h2>
            <ul className="space-y-2 mb-6" aria-label="Job responsibilities">
              {responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                  {r}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-4">{t('career.requirements')}</h2>
            <ul className="space-y-2" aria-label="Job requirements">
              {requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-0.5" aria-hidden="true">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Application form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('career.applyNow')}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Honeypot */}
                <div aria-hidden="true" className="absolute left-[-9999px] opacity-0 h-0 overflow-hidden">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <form ref={formRef} onSubmit={handleApply} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="apply-name">Full Name *</Label>
                    <Input id="apply-name" type="text" required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apply-email">Email *</Label>
                    <Input id="apply-email" type="email" required autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apply-phone">Phone *</Label>
                    <Input id="apply-phone" type="tel" required autoComplete="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apply-cover">Cover Letter</Label>
                    <Textarea id="apply-cover" rows={4} placeholder="Tell us about yourself..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apply-resume" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" aria-hidden="true" />
                      Resume / CV *
                    </Label>
                    {/* Accept only pdf/doc/docx, max 5MB — server must re-validate */}
                    <Input
                      id="apply-resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      aria-describedby={fileError ? 'resume-error' : 'resume-hint'}
                    />
                    <p id="resume-hint" className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX · Max 5MB
                    </p>
                    {fileError && (
                      <p id="resume-error" role="alert" className="text-sm text-destructive">
                        {fileError}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting || Boolean(fileError)}>
                    {isSubmitting ? 'Submitting...' : t('career.applyNow')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
