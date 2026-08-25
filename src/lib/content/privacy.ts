export const privacyContent = {
  lastUpdatedKey: 'privacy.lastUpdated',

  main: [
    {
      textKey: 'privacy.main1',
    },
    {
      textKey: 'privacy.main2',
    },
  ],

  interpretationAndDefinitions: {
    titleKey: 'privacy.interpretationAndDefinitions',
    interpretationKey: 'privacy.interpretation',

    definitions: [
      {
        termKey: 'privacy.account',
        definitionKey: 'privacy.accountDesc',
      },
      {
        termKey: 'privacy.affiliate',
        definitionKey: 'privacy.affiliateDesc',
      },
      {
        termKey: 'privacy.company',
        definitionKey: 'privacy.companyDesc',
      },
      {
        termKey: 'privacy.cookies',
        definitionKey: 'privacy.cookiesDesc',
      },
      {
        termKey: 'privacy.country',
        definitionKey: 'privacy.countryDesc',
      },
      {
        termKey: 'privacy.device',
        definitionKey: 'privacy.deviceDesc',
      },
      {
        termKey: 'privacy.personalData',
        definitionKey: 'privacy.personalDataDesc',
      },
      {
        termKey: 'privacy.service',
        definitionKey: 'privacy.serviceDesc',
      },
      {
        termKey: 'privacy.serviceProvider',
        definitionKey: 'privacy.serviceProviderDesc',
      },
      {
        termKey: 'privacy.usageData',
        definitionKey: 'privacy.usageDataDesc',
      },
      {
        termKey: 'privacy.website',
        definitionKey: 'privacy.websiteDesc',
      },
      {
        termKey: 'privacy.you',
        definitionKey: 'privacy.youDesc',
      },
    ],
  },

  collectingAndUsingData: {
    titleKey: 'privacy.collectingAndUsingData',

    typesOfDataCollected: {
      titleKey: 'privacy.typesOfDataCollected',

      personalData: {
        titleKey: 'privacy.personalDataCollected',
        items: [
          'privacy.emailAddress',
          'privacy.firstAndLastName',
          'privacy.phoneNumber',
          'privacy.usageData',
        ],
      },

      usageData: {
        titleKey: 'privacy.usageDataCollected',
        items: [
          'privacy.usageData1',
          'privacy.usageData2',
          'privacy.usageData3',
          'privacy.usageData4',
        ],
      },

      trackingTechnologiesAndCookies: {
        titleKey: 'privacy.trackingTechnologies',
        descriptionKey: 'privacy.trackingDesc',

        technologies: [
          {
            nameKey: 'privacy.browserCookies',
            descriptionKey: 'privacy.browserCookiesDesc',
          },
          {
            nameKey: 'privacy.webBeacons',
            descriptionKey: 'privacy.webBeaconsDesc',
          },
        ],

        cookieTypesDescriptionKey: 'privacy.cookieTypesDesc',

        typesUsed: [
          {
            nameKey: 'privacy.necessaryCookies',
            typeKey: 'privacy.necessaryCookiesType',
            administeredByKey: 'privacy.necessaryCookiesAdmin',
            purposeKey: 'privacy.necessaryCookiesPurpose',
          },
          {
            nameKey: 'privacy.acceptanceCookies',
            typeKey: 'privacy.acceptanceCookiesType',
            administeredByKey: 'privacy.acceptanceCookiesAdmin',
            purposeKey: 'privacy.acceptanceCookiesPurpose',
          },
          {
            nameKey: 'privacy.functionalityCookies',
            typeKey: 'privacy.functionalityCookiesType',
            administeredByKey: 'privacy.functionalityCookiesAdmin',
            purposeKey: 'privacy.functionalityCookiesPurpose',
          },
        ],

        moreInfoKey: 'privacy.moreCookieInfo',
      },
    },

    useOfPersonalData: {
      titleKey: 'privacy.useOfPersonalData',

      purposes: [
        {
          titleKey: 'privacy.provideService',
          descriptionKey: 'privacy.provideServiceDesc',
        },
        {
          titleKey: 'privacy.manageAccount',
          descriptionKey: 'privacy.manageAccountDesc',
        },
        {
          titleKey: 'privacy.performanceOfContract',
          descriptionKey: 'privacy.performanceOfContractDesc',
        },
        {
          titleKey: 'privacy.contactYou',
          descriptionKey: 'privacy.contactYouDesc',
        },
        {
          titleKey: 'privacy.provideYou',
          descriptionKey: 'privacy.provideYouDesc',
        },
        {
          titleKey: 'privacy.manageRequests',
          descriptionKey: 'privacy.manageRequestsDesc',
        },
        {
          titleKey: 'privacy.businessTransfers',
          descriptionKey: 'privacy.businessTransfersDesc',
        },
        {
          titleKey: 'privacy.otherPurposes',
          descriptionKey: 'privacy.otherPurposesDesc',
        },
      ],

      sharingSituations: [
        {
          titleKey: 'privacy.withServiceProviders',
          descriptionKey: 'privacy.withServiceProvidersDesc',
        },
        {
          titleKey: 'privacy.businessTransferSharing',
          descriptionKey: 'privacy.businessTransferSharingDesc',
        },
        {
          titleKey: 'privacy.withAffiliates',
          descriptionKey: 'privacy.withAffiliatesDesc',
        },
        {
          titleKey: 'privacy.withBusinessPartners',
          descriptionKey: 'privacy.withBusinessPartnersDesc',
        },
        {
          titleKey: 'privacy.withOtherUsers',
          descriptionKey: 'privacy.withOtherUsersDesc',
        },
        {
          titleKey: 'privacy.withYourConsent',
          descriptionKey: 'privacy.withYourConsentDesc',
        },
      ],
    },

    retentionOfPersonalData: {
      titleKey: 'privacy.retentionOfPersonalData',
      items: ['privacy.retention1', 'privacy.retention2'],
    },

    transferOfPersonalData: {
      titleKey: 'privacy.transferOfPersonalData',
      items: [
        'privacy.transfer1',
        'privacy.transfer2',
        'privacy.transfer3',
      ],
    },

    deletePersonalData: {
      titleKey: 'privacy.deletePersonalData',
      items: [
        'privacy.delete1',
        'privacy.delete2',
        'privacy.delete3',
        'privacy.delete4',
      ],
    },

    disclosureOfPersonalData: {
      titleKey: 'privacy.disclosureOfPersonalData',

      businessTransactions: {
        titleKey: 'privacy.businessTransactions',
        descriptionKey: 'privacy.businessTransactionsDesc',
      },

      lawEnforcement: {
        titleKey: 'privacy.lawEnforcement',
        descriptionKey: 'privacy.lawEnforcementDesc',
      },

      otherLegalRequirements: {
        titleKey: 'privacy.otherLegalRequirements',
        items: [
          'privacy.legalRequirement1',
          'privacy.legalRequirement2',
          'privacy.legalRequirement3',
          'privacy.legalRequirement4',
          'privacy.legalRequirement5',
        ],
      },
    },

    securityOfPersonalData: {
      titleKey: 'privacy.securityOfPersonalData',
      descriptionKey: 'privacy.securityDesc',
    },
  },

  childrensPrivacy: {
    titleKey: 'privacy.childrensPrivacy',
    items: ['privacy.children1', 'privacy.children2'],
  },

  linksToOtherWebsites: {
    titleKey: 'privacy.linksToOtherWebsites',
    items: ['privacy.links1', 'privacy.links2'],
  },

  changesToPrivacyPolicy: {
    titleKey: 'privacy.changesToPrivacyPolicy',
    items: [
      'privacy.changes1',
      'privacy.changes2',
      'privacy.changes3',
    ],
  },

  contactUs: {
    titleKey: 'privacy.contactUs',
    descriptionKey: 'privacy.contactUsDesc',
    email: 'contact@chenguangnetwork.com',
  },
} as const