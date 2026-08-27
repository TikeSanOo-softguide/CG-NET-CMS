import { Download, UserPlus, BarChart2, CreditCard, AlertCircle } from 'lucide-react'

// 👇 ဒီနေရာမှာ export const appGuideContent ဆိုပြီး ပါရှိရပါမယ်
export const appGuideContent = {
  // 1. Overview & Steps Guides
  downloadLinks: [
    {
      id: 'app-store',
      subtitleKey: 'appGuide.iosSubtitle',
      titleKey: 'appGuide.iosApp',
      href: '#',
      ariaLabel: 'Download on the App Store',
      viewBox: '0 0 384 512',
      iconPath:
        'M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z',
    },
    {
      id: 'google-play',
      subtitleKey: 'appGuide.androidSubtitle',
      titleKey: 'appGuide.androidApp',
      href: '#',
      ariaLabel: 'Get it on Google Play',
      viewBox: '0 0 512 512',
      iconPath:
        'M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z',
    },
    {
      id: 'android-apk',
      subtitleKey: 'appGuide.apkSubtitle',
      titleKey: 'appGuide.androidApk',
      href: '#',
      ariaLabel: 'Download APK for Android',
      viewBox: '0 0 576 512',
      iconPath:
        'M420.22 32.05c-1.35-.85-2.83-1.63-4.24-2.45-36.21-20.93-79.37-32.55-127.98-32.55-48.61 0-91.77 11.62-127.98 32.55-1.41.82-2.89 1.6-4.24 2.45v.06L116.4 7.64c-3.15-4.48-9.33-5.59-13.82-2.44-4.48 3.15-5.59 9.33-2.44 13.82l40.36 57.25C91.13 109.91 49.95 168.04 32.05 237.94H543.9c-17.9-69.9-59.08-128.03-108.48-161.69l40.36-57.25c3.15-4.49 2.04-10.67-2.44-13.82-4.49-3.15-10.67-2.04-13.82 2.44l-39.3 54.43zM153.25 167.33c-11.45 0-20.73-9.28-20.73-20.73s9.28-20.73 20.73-20.73 20.73 9.28 20.73 20.73-9.28 20.73-20.73 20.73zm269.5 0c-11.45 0-20.73-9.28-20.73-20.73s9.28-20.73 20.73-20.73 20.73 9.28 20.73 20.73-9.28 20.73-20.73 20.73z',
    },
    {
      id: 'app-gallery',
      subtitleKey: 'appGuide.gallerySubtitle',
      titleKey: 'appGuide.appGallery',
      href: '#',
      ariaLabel: 'Available on the AppGallery',
      viewBox: '0 0 512 512',
      iconPath:
        'M448 112h-96v-16c0-53-43-96-96-96s-96 43-96 96v16H64c-17.7 0-32 14.3-32 32v288c0 44.2 35.8 80 80 80h288c44.2 0 80-35.8 80-80V144c0-17.7-14.3-32-32-32zM192 96c0-35.3 28.7-64 64-64s64 28.7 64 64v16H192V96zm224 336c0 26.5-21.5 48-48 48H144c-26.5 0-48-21.5-48-48V144h64v32c0 8.8 7.2 16 16 16s16-7.2 16-16v-32h128v32c0 8.8 7.2 16 16 16s16-7.2 16-16v-32h64v288z',
    },
  ],
  guides: [
    {
      id: '1',
      slug: 'download-app',
      order: 1,
      titleKey: 'appGuide.guides.1.title',
      descriptionKey: 'appGuide.guides.1.description',
      stepsKey: 'appGuide.guides.1.steps',
      icon: Download,
      imageUrl: '/images/guide-download.jpg',
    },
    {
      id: '2',
      slug: 'create-account',
      order: 2,
      titleKey: 'appGuide.guides.2.title',
      descriptionKey: 'appGuide.guides.2.description',
      stepsKey: 'appGuide.guides.2.steps',
      icon: UserPlus,
      imageUrl: '/images/guide-register.jpg',
    },
    {
      id: '3',
      slug: 'check-usage',
      order: 3,
      titleKey: 'appGuide.guides.3.title',
      descriptionKey: 'appGuide.guides.3.description',
      stepsKey: 'appGuide.guides.3.steps',
      icon: BarChart2,
      imageUrl: '/images/guide-usage.jpg',
    },
    {
      id: '4',
      slug: 'pay-bill',
      order: 4,
      titleKey: 'appGuide.guides.4.title',
      descriptionKey: 'appGuide.guides.4.description',
      stepsKey: 'appGuide.guides.4.steps',
      icon: CreditCard,
      imageUrl: '/images/guide-payment.jpg',
    },
    {
      id: '5',
      slug: 'report-issue',
      order: 5,
      titleKey: 'appGuide.guides.5.title',
      descriptionKey: 'appGuide.guides.5.description',
      stepsKey: 'appGuide.guides.5.steps',
      icon: AlertCircle,
      imageUrl: '/images/guide-support.jpg',
    },
  ],

  // 2. Frequently Asked Questions (FAQ list 1 to 10)
  faqs: [
    { id: '1', questionKey: 'appGuide.faq.1.question', answerKey: 'appGuide.faq.1.answer' },
    { id: '2', questionKey: 'appGuide.faq.2.question', answerKey: 'appGuide.faq.2.answer' },
    { id: '3', questionKey: 'appGuide.faq.3.question', answerKey: 'appGuide.faq.3.answer' },
    { id: '4', questionKey: 'appGuide.faq.4.question', answerKey: 'appGuide.faq.4.answer' },
    { id: '5', questionKey: 'appGuide.faq.5.question', answerKey: 'appGuide.faq.5.answer' },
    { id: '6', questionKey: 'appGuide.faq.6.question', answerKey: 'appGuide.faq.6.answer' },
    { id: '7', questionKey: 'appGuide.faq.7.question', answerKey: 'appGuide.faq.7.answer' },
    { id: '8', questionKey: 'appGuide.faq.8.question', answerKey: 'appGuide.faq.8.answer' },
    { id: '9', questionKey: 'appGuide.faq.9.question', answerKey: 'appGuide.faq.9.answer' },
    { id: '10', questionKey: 'appGuide.faq.10.question', answerKey: 'appGuide.faq.10.answer' },
  ],
} as const
