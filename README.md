# CG-NET CMS Marketing Website

A modern, bilingual (English + Myanmar) marketing website for CG-NET ISP, built with **React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui**.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite + React 18 + TypeScript | Core framework |
| Tailwind CSS + shadcn/ui | Styling & components |
| react-router-dom v6 | Client-side routing |
| @tanstack/react-query | Data fetching & caching |
| axios | HTTP client |
| react-i18next | EN/MY internationalization |
| react-hook-form + zod | Contact form validation |
| DOMPurify | HTML sanitization |
| json-server | Mock API (dev only) |
| vitest + @testing-library/react | Unit / component tests |

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env — never commit this file
```

### 3. Start the mock API
```bash
npm run mock-api
# Runs json-server on http://localhost:4000
```

### 4. Start the dev server
```bash
npm run dev
# Vite dev server on http://localhost:3000
# API proxied via /api → http://localhost:4000
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (port 3000) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run mock-api` | Run json-server mock API on port 4000 |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format |
| `npm run typecheck` | TypeScript strict check (no emit) |
| `npm run test` | Run all tests (vitest) |
| `npm run test:watch` | Watch mode tests |
| `npm run security-check` | `npm audit` for dependency vulnerabilities |

---

## Folder Structure

```
src/
├── assets/
├── components/
│   ├── ui/            # shadcn/ui components
│   ├── layout/        # Header, Footer, NavBar, LanguageSwitcher, PackageDropdown
│   ├── common/        # PageHeader, SectionWrapper, EmptyState, ErrorMessage, ErrorBoundary
│   └── forms/         # ContactForm
├── features/          # Self-contained page features (home, services, packages, news, career, app-guide, about, contact)
├── hooks/             # React Query hooks (usePackages, useNews, useCareers, etc.)
├── lib/
│   ├── api/           # Typed API clients (axios)
│   ├── i18n/          # i18next config
│   ├── analytics.ts   # Analytics hook point (no-op default)
│   └── utils.ts       # getLocalized, formatCurrency, devLog, etc.
├── routes/            # AppRoutes.tsx (lazy-loaded routes)
├── test/              # vitest setup + test files
├── types/             # Shared TypeScript interfaces
├── App.tsx
└── main.tsx
```

---

## Internationalization

Language files live in `public/locales/{en,my}/translation.json`.

- Toggle between **English** and **မြန်မာ** using the globe icon in the header.
- Language preference persists in `localStorage` (key: `cgnet_language`).
- Switching language updates `<html lang>`, which triggers the Myanmar font via CSS.
- API data uses a bilingual shape `{ en: "...", my: "..." }` — always use `getLocalized(field, lang)` helper.

### Myanmar Font Setup

Self-host `Noto Sans Myanmar` under `public/fonts/`:
```
public/fonts/
├── NotoSansMyanmar-Regular.woff2
├── NotoSansMyanmar-Medium.woff2
├── NotoSansMyanmar-Bold.woff2
├── Pyidaungsu.woff2    (fallback)
└── Padauk-Regular.woff2 (fallback)
```

Download from [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+Myanmar) or [Pyidaungsu](https://software.nlm.gov.mm/).

---

## Security Notes

- **Environment variables**: All API URLs in `.env`. Never commit `.env`.
- **Input validation**: Contact form validated with `zod` client-side. **Server must re-validate.**
- **XSS**: React escapes all output by default. News article HTML is sanitized with `DOMPurify` before `dangerouslySetInnerHTML`.
- **Honeypot**: Contact and job application forms include a visually hidden honeypot field.
- **File uploads**: Career form restricts `.pdf/.doc/.docx` and 5MB max client-side. **Server must re-validate.**
- **HTTPS check**: API client warns/errors if `VITE_API_BASE_URL` is not HTTPS in production.
- **CSP**: Baseline `Content-Security-Policy` meta tag in `index.html`. Tighten for production.
- **localStorage**: Only non-sensitive UI state (language) is stored. No tokens or PII.

---

## Deployment

### Production Build
```bash
npm run build
# Output: dist/
```

### Preview Build Locally
```bash
npm run preview
```

### Production Configuration
1. Update `VITE_API_BASE_URL` in `.env.production` to your real backend HTTPS URL.
2. The `json-server` mock API is **development only** — you need a real backend in production.
3. Configure your server to serve `index.html` for all routes (SPA routing).
4. Tighten the CSP meta tag for your production domains.
5. Ensure Myanmar font WOFF2 files are present in `public/fonts/`.

### CI/CD Pipeline Example
```yaml
- run: npm ci
- run: npm run typecheck
- run: npm run lint
- run: npm run test
- run: npm run build
- run: npm run security-check
```

---

## Accessibility (a11y)

- Semantic HTML with proper heading hierarchy on every page.
- All icon-only buttons have `aria-label`.
- All images should have bilingual `alt` text.
- shadcn/ui components handle keyboard navigation and focus management.
- Focus-visible outlines enabled globally in CSS.
- Form fields use `aria-invalid`, `aria-describedby`, and `role="alert"` for errors.

---

## Analytics

`src/lib/analytics.ts` exports a no-op `analytics.trackEvent()` and `analytics.trackPageView()`. Wire up Google Analytics, Plausible, or any provider here without modifying page components.
