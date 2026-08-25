import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/common/PageHeader'
import { SectionWrapper } from '@/components/common/SectionWrapper'
import { usePageTitle } from '@/hooks/usePageTitle'
import { privacyContent } from '@/lib/content/privacy'

export default function PrivacyPage() {
const { t } = useTranslation()
usePageTitle(t('privacy.pageTitle'))

const renderTextList = (items: readonly string[]) => (
<div className="space-y-4">
    {items.map((key, index) => (
    <p
        key={key}
        className="text-base leading-8 text-font-muted md:text-lg"
    >
        <span className="mr-2 font-bold text-primary">
        {index + 1}.
        </span>

        {t(key)}
    </p>
    ))}
</div>
)

  return (
    <main>
      <PageHeader
        title={t('privacy.pageTitle')}
        subtitle={t('privacy.pageSubtitle')}
      />

      <SectionWrapper>
        <div className="mx-auto max-w-5xl">
          {/* Hero */}
          <div className="mb-12 border-b border-border/60 pb-10">
            <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="text-sm font-semibold text-primary">
                {t('privacy.lastUpdated')}:{' '}
                {t('privacy.lastUpdatedDate')}
              </span>
            </div>

            <h1 className="text-font-blue bg-clip-text text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">
              {t('privacy.title')}
            </h1>
            <div className="h-1.5 w-28 rounded-full bg-gradient-font" />

            <div className="mt-8 space-y-5">
              {privacyContent.main.map((item) => (
                <p
                  key={item.textKey}
                  className="text-base leading-8 text-font-muted md:text-lg"
                >
                  {t(item.textKey)}
                </p>
              ))}
            </div>
          </div>

          {/* Interpretation & Definitions */}
          <PrivacySection
            number="01"
            title={t(
              privacyContent.interpretationAndDefinitions.titleKey
            )}
          >
            <p className="text-base leading-8 text-font-muted md:text-lg">
              {t(
                privacyContent.interpretationAndDefinitions
                  .interpretationKey
              )}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {privacyContent.interpretationAndDefinitions.definitions.map(
                (item) => (
                  <div
                    key={item.termKey}
                    className="rounded-2xl border border-border/60 bg-background/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t(item.termKey)}
                    </h3>

                    <p className="text-sm leading-7 text-font-muted">
                      {t(item.definitionKey)}
                    </p>
                  </div>
                )
              )}
            </div>
          </PrivacySection>

          {/* Collecting and Using Data */}
          <PrivacySection
            number="02"
            title={t(privacyContent.collectingAndUsingData.titleKey)}
          >
            <PrivacySubSection
              title={t(
                privacyContent.collectingAndUsingData.typesOfDataCollected
                  .titleKey
              )}
            >
              {/* Personal Data */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold">
                  {t(
                    privacyContent.collectingAndUsingData.typesOfDataCollected
                      .personalData.titleKey
                  )}
                </h4>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {privacyContent.collectingAndUsingData.typesOfDataCollected.personalData.items.map(
                    (key) => (
                      <li
                        key={key}
                        className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-font-muted"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        {t(key)}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Usage Data */}
              <div className="mt-8">
                <h4 className="mb-4 text-xl font-bold">
                  {t(
                    privacyContent.collectingAndUsingData.typesOfDataCollected
                      .usageData.titleKey
                  )}
                </h4>

                {renderTextList(
                  privacyContent.collectingAndUsingData.typesOfDataCollected
                    .usageData.items
                )}
              </div>

              {/* Tracking */}
              <div className="mt-10">
                <h4 className="mb-4 text-xl font-bold">
                  {t(
                    privacyContent.collectingAndUsingData.typesOfDataCollected
                      .trackingTechnologiesAndCookies.titleKey
                  )}
                </h4>

                <p className="text-base leading-8 text-font-muted md:text-lg">
                  {t(
                    privacyContent.collectingAndUsingData.typesOfDataCollected
                      .trackingTechnologiesAndCookies.descriptionKey
                  )}
                </p>

                <div className="mt-6 space-y-5">
                  {privacyContent.collectingAndUsingData.typesOfDataCollected.trackingTechnologiesAndCookies.technologies.map(
                    (item) => (
                      <div
                        key={item.nameKey}
                        className="rounded-2xl border border-border/60 p-5"
                      >
                        <h5 className="mb-2 font-bold text-foreground">
                          {t(item.nameKey)}
                        </h5>

                        <p className="leading-7 text-font-muted">
                          {t(item.descriptionKey)}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <p className="mt-6 leading-8 text-font-muted">
                  {t(
                    privacyContent.collectingAndUsingData.typesOfDataCollected
                      .trackingTechnologiesAndCookies
                      .cookieTypesDescriptionKey
                  )}
                </p>

                {/* Cookie Types */}
                <div className="mt-8 grid gap-5">
                  {privacyContent.collectingAndUsingData.typesOfDataCollected.trackingTechnologiesAndCookies.typesUsed.map(
                    (cookie) => (
                      <div
                        key={cookie.nameKey}
                        className="rounded-2xl border border-border/60 bg-card/50 p-6"
                      >
                        <h5 className="text-lg font-bold">
                          {t(cookie.nameKey)}
                        </h5>

                        <div className="mt-4 space-y-3 text-sm leading-7 text-font-muted">
                          <p>
                            <span className="font-semibold text-foreground">
                              Type:{' '}
                            </span>
                            {t(cookie.typeKey)}
                          </p>

                          <p>
                            <span className="font-semibold text-foreground">
                              Administered by:{' '}
                            </span>
                            {t(cookie.administeredByKey)}
                          </p>

                          <p>
                            <span className="font-semibold text-foreground">
                              Purpose:{' '}
                            </span>
                            {t(cookie.purposeKey)}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <p className="mt-6 leading-8 text-font-muted">
                  {t(
                    privacyContent.collectingAndUsingData.typesOfDataCollected
                      .trackingTechnologiesAndCookies.moreInfoKey
                  )}
                </p>
              </div>
            </PrivacySubSection>

            {/* Use of Personal Data */}
            <PrivacySubSection
              title={t(
                privacyContent.collectingAndUsingData.useOfPersonalData
                  .titleKey
              )}
            >
              <div className="space-y-5">
                {privacyContent.collectingAndUsingData.useOfPersonalData.purposes.map(
                  (item, index) => (
                    <div
                      key={item.titleKey}
                      className="flex gap-4 rounded-2xl border border-border/60 p-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <h4 className="mb-2 font-bold">
                          {t(item.titleKey)}
                        </h4>

                        <p className="leading-7 text-font-muted">
                          {t(item.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </PrivacySubSection>

            {/* Sharing */}
            <PrivacySubSection
              title={t('privacy.sharingPersonalData')}
            >
              <div className="space-y-5">
                {privacyContent.collectingAndUsingData.useOfPersonalData.sharingSituations.map(
                  (item) => (
                    <div
                      key={item.titleKey}
                      className="border-l-2 border-primary/40 pl-5"
                    >
                      <h4 className="mb-2 font-bold">
                        {t(item.titleKey)}
                      </h4>

                      <p className="leading-7 text-font-muted">
                        {t(item.descriptionKey)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </PrivacySubSection>
          </PrivacySection>

          {/* Retention */}
          <PrivacySection
            number="03"
            title={t(privacyContent.collectingAndUsingData.retentionOfPersonalData.titleKey)}
          >
            {renderTextList(
              privacyContent.collectingAndUsingData.retentionOfPersonalData
                .items
            )}
          </PrivacySection>

          {/* Transfer */}
          <PrivacySection
            number="04"
            title={t(privacyContent.collectingAndUsingData.transferOfPersonalData.titleKey)}
          >
            {renderTextList(
              privacyContent.collectingAndUsingData.transferOfPersonalData
                .items
            )}
          </PrivacySection>

          {/* Delete */}
          <PrivacySection
            number="05"
            title={t(privacyContent.collectingAndUsingData.deletePersonalData.titleKey)}
          >
            {renderTextList(
              privacyContent.collectingAndUsingData.deletePersonalData.items
            )}
          </PrivacySection>

          {/* Disclosure */}
          <PrivacySection
            number="06"
            title={t(privacyContent.collectingAndUsingData.disclosureOfPersonalData.titleKey)}
          >
            <PrivacyInfoBlock
              title={t(
                privacyContent.collectingAndUsingData.disclosureOfPersonalData
                  .businessTransactions.titleKey
              )}
              description={t(
                privacyContent.collectingAndUsingData.disclosureOfPersonalData
                  .businessTransactions.descriptionKey
              )}
            />

            <PrivacyInfoBlock
              title={t(
                privacyContent.collectingAndUsingData.disclosureOfPersonalData
                  .lawEnforcement.titleKey
              )}
              description={t(
                privacyContent.collectingAndUsingData.disclosureOfPersonalData
                  .lawEnforcement.descriptionKey
              )}
            />

            <div className="mt-8">
              <h4 className="mb-4 text-xl font-bold">
                {t(
                  privacyContent.collectingAndUsingData.disclosureOfPersonalData
                    .otherLegalRequirements.titleKey
                )}
              </h4>

              <ul className="space-y-3">
                {privacyContent.collectingAndUsingData.disclosureOfPersonalData.otherLegalRequirements.items.map(
                  (key) => (
                    <li
                      key={key}
                      className="flex gap-3 leading-7 text-font-muted"
                    >
                      <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      {t(key)}
                    </li>
                  )
                )}
              </ul>
            </div>
          </PrivacySection>

          {/* Security */}
          <PrivacySection
            number="07"
            title={t(
              privacyContent.collectingAndUsingData.securityOfPersonalData
                .titleKey
            )}
          >
            <p className="text-base leading-8 text-font-muted md:text-lg">
              {t(
                privacyContent.collectingAndUsingData.securityOfPersonalData
                  .descriptionKey
              )}
            </p>
          </PrivacySection>

          {/* Children's Privacy */}
          <PrivacySection
            number="08"
            title={t(privacyContent.childrensPrivacy.titleKey)}
          >
            {renderTextList(privacyContent.childrensPrivacy.items)}
          </PrivacySection>

          {/* Other Websites */}
          <PrivacySection
            number="09"
            title={t(privacyContent.linksToOtherWebsites.titleKey)}
          >
            {renderTextList(privacyContent.linksToOtherWebsites.items)}
          </PrivacySection>

          {/* Changes */}
          <PrivacySection
            number="10"
            title={t(privacyContent.changesToPrivacyPolicy.titleKey)}
          >
            {renderTextList(privacyContent.changesToPrivacyPolicy.items)}
          </PrivacySection>

          {/* Contact */}
          <section className="mt-16 overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-10">
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              {t(privacyContent.contactUs.titleKey)}
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-font-muted md:text-lg">
              {t(privacyContent.contactUs.descriptionKey)}
            </p>

            <a
              href={`mailto:${privacyContent.contactUs.email}`}
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {privacyContent.contactUs.email}
            </a>
          </section>
        </div>
      </SectionWrapper>
    </main>
  )
}

function PrivacySection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-border/60 py-8 md:py-10">
      <div className="mb-8 flex items-start gap-4">
        <span className="mt-2 text-sm font-black tracking-widest text-primary">
          {number}
        </span>

        <h2 className="text-2xl font-black tracking-tight md:text-3xl">
          {title}
        </h2>
      </div>

      <div className="pl-0 md:pl-10">{children}</div>
    </section>
  )
}

function PrivacySubSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-12">
      <h3 className="mb-6 text-xl font-black tracking-tight md:text-2xl">
        {title}
      </h3>

      {children}
    </div>
  )
}

function PrivacyInfoBlock({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-8 rounded-2xl border border-border/60 bg-muted/20 p-6">
      <h4 className="mb-3 text-xl font-bold">{title}</h4>

      <p className="leading-8 text-font-muted">{description}</p>
    </div>
  )
}