# CG-NET CMS — Marketing Website

A modern, multilingual **(English + Myanmar + Chinese)** CMS-style marketing website for **CG-NET ISP**, built with React 18, Vite, TypeScript, Tailwind CSS, and shadcn/ui.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Environment Variables](#environment-variables)
4. [Project Structure](#project-structure)
5. [Available Scripts](#available-scripts)
6. [Tech Stack](#tech-stack)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [Mock API](#mock-api)
9. [Testing](#testing)
10. [Security Notes](#security-notes)
11. [Deployment](#deployment)
12. [Accessibility](#accessibility)
13. [Analytics](#analytics)

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

| Tool | Minimum Version | Download |
|------|----------------|----------|
| **Node.js** | 18.x LTS or higher | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x or higher | Included with Node.js |
| **Git** | Any recent version | [git-scm.com](https://git-scm.com) |

Verify your versions:

```bash
node -v    # Should print v18.x.x or higher
npm -v     # Should print 9.x.x or higher
```

---

## Quick Start

Follow these steps in order to get the project running locally.

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-org/cg-net-cms.git
cd cg-net-cms
```

### Step 2 — Install dependencies

```bash
npm install
```

> This installs all production and development dependencies listed in `package.json`.

### Step 3 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values (see [Environment Variables](#environment-variables) below). The default values work for local development without any changes.

### Step 4 — Start the mock API server

```bash
npm run mock-api
```

This starts `json-server` on **http://localhost:4000** using the data in `api/db.json`. Keep this terminal running.

### Step 5 — Start the development server

Open a **second terminal** and run:

```bash
npm run dev
```

Vite will start on **http://localhost:3000**. All `/api/*` requests are automatically proxied to `http://localhost:4000`.

---

## Environment Variables

The project uses a `.env` file for configuration. Never commit the real `.env` to version control — it is listed in `.gitignore`.

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:4000` | Base URL for the backend API |
| `VITE_APP_NAME` | `CG-NET` | Application name used in page titles |
| `VITE_APP_DESCRIPTION` | *(see .env.example)* | Meta description for SEO |

Create your environment file:

```bash
cp .env.example .env
```

Example `.env`:

```ini
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_NAME=CG-NET
VITE_APP_DESCRIPTION=Myanmar's leading Internet Service Provider
```

> **Production note:** Set `VITE_API_BASE_URL` to your real backend HTTPS URL before building for production. The API client will throw an error if it detects a non-HTTPS URL in a production build.

---

## Project Structure

```
cg-net-cms/
├── api/
│   └── db.json                  # Mock API data (json-server)
├── public/
│   ├── fonts/                   # Self-hosted Myanmar Unicode fonts
│   ├── locales/
│   │   ├── en/translation.json  # English UI strings
│   │   ├── my/translation.json  # Myanmar UI strings
│   │   └── zh/translation.json  # Simplified Chinese UI strings
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                  # Static assets imported in code
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitive components
│   │   ├── layout/              # Header, NavBar, Footer, LanguageSwitcher, PackageDropdown
│   │   ├── common/              # PageHeader, SectionWrapper, EmptyState, ErrorBoundary, AnimatedCard
│   │   └── forms/               # ContactForm (react-hook-form + zod)
│   ├── features/
│   │   ├── home/                # Home page + HeroBanner slider
│   │   ├── services/            # Services list page
│   │   ├── packages/            # Package list + Package detail page
│   │   ├── news/                # News list + News article detail
│   │   ├── career/              # Careers list + Career detail
│   │   ├── app-guide/           # App download guide
│   │   ├── about/               # About us page
│   │   ├── contact/             # Contact page with form
│   │   └── not-found/           # 404 page
│   ├── hooks/                   # React Query data hooks + useInView + usePageTitle
│   ├── lib/
│   │   ├── api/                 # Typed axios API clients per resource
│   │   ├── i18n/                # i18next configuration
│   │   ├── analytics.ts         # Analytics integration point (no-op default)
│   │   └── utils.ts             # Shared helpers: getLocalized, formatDate, cn, etc.
│   ├── routes/
│   │   └── AppRoutes.tsx        # Lazy-loaded route definitions
│   ├── test/
│   │   ├── setup.ts             # Vitest global setup + mocks
│   │   ├── utils.test.ts        # Unit tests for lib/utils
│   │   ├── ContactForm.test.tsx # Component test for contact form
│   │   └── LanguageSwitcher.test.tsx
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
│   ├── App.tsx                  # Root component
│   ├── index.css                # Tailwind layers + custom animations + Myanmar font @font-face
│   └── main.tsx                 # React entry point
├── .env.example                 # Environment variable template
├── .eslintrc.cjs                # ESLint rules
├── .gitignore
├── .prettierrc                  # Prettier config
├── components.json              # shadcn/ui config
├── index.html                   # HTML shell with CSP meta + Google Fonts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Available Scripts

Run these from the project root with `npm run <script>`.

| Script | Description |
|--------|-------------|
| `dev` | Start Vite dev server at http://localhost:3000 |
| `build` | TypeScript compile check + Vite production build → `dist/` |
| `preview` | Serve the production `dist/` build locally |
| `mock-api` | Start json-server mock API at http://localhost:4000 |
| `lint` | Run ESLint across all source files |
| `lint:fix` | Run ESLint and auto-fix fixable issues |
| `format` | Format all files with Prettier |
| `typecheck` | Run TypeScript type checker (no emit) |
| `test` | Run the full test suite once (vitest) |
| `test:watch` | Run tests in watch mode |
| `security-check` | Run `npm audit` to detect known vulnerabilities |

---

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| TypeScript | 5 | Static typing |
| Tailwind CSS | 3 | Utility-first styling |
| shadcn/ui | — | Accessible component library |
| react-router-dom | 6 | Client-side routing |
| @tanstack/react-query | 5 | Server state management & caching |
| axios | — | HTTP client |
| react-i18next | — | Internationalization |
| react-hook-form | — | Form state management |
| zod | — | Schema validation |
| lucide-react | — | Icon library |
| DOMPurify | — | HTML sanitization |
| json-server | — | Mock REST API (dev only) |
| vitest | — | Unit test runner |
| @testing-library/react | — | Component testing utilities |

---

## Internationalization (i18n)

The site supports **English (en)**, **Myanmar (my)**, and **Simplified Chinese (zh)**.

### Switching Language

Click the globe icon **🌐** in the navigation bar. The selection is saved to `localStorage` (key: `cgnet_language`) and persists across sessions.

### Adding / Editing Translations

UI strings are stored as JSON files:

```
public/locales/
├── en/translation.json   ← English
├── my/translation.json   ← Myanmar
└── zh/translation.json   ← Simplified Chinese
```

Edit these files to change any button label, heading, or static text. The keys are namespaced by page/section (e.g., `home.hero.title`, `contact.form.submit`).

### Bilingual API Content

API data uses a multilingual shape:

```json
{ "title": { "en": "Fiber Plan", "my": "ဖိုင်ဘာ အစီအစဉ်", "zh": "光纤套餐" } }
```

Always use the `getLocalized(field, lang)` helper from `src/lib/utils.ts` to extract the correct language:

```ts
import { getLocalized } from '@/lib/utils'

const title = getLocalized(package.title, lang) // "Fiber Plan" / "ဖိုင်ဘာ အစီအစဉ်" / "光纤套餐"
```

### Myanmar Font Setup

The Myanmar font (`Noto Sans Myanmar`) is referenced via `@font-face` in `src/index.css`. The font files must be placed in `public/fonts/`:

```
public/fonts/
├── NotoSansMyanmar-Regular.woff2
├── NotoSansMyanmar-Medium.woff2
├── NotoSansMyanmar-Bold.woff2
├── Pyidaungsu.woff2          (fallback)
└── Padauk-Regular.woff2      (fallback)
```

Download the fonts from:
- [Google Fonts — Noto Sans Myanmar](https://fonts.google.com/noto/specimen/Noto+Sans+Myanmar)
- [Pyidaungsu (NLM)](https://software.nlm.gov.mm/)

The Myanmar font is applied automatically when `<html lang="my">` is set. This is handled by `App.tsx` whenever the user switches language.

### Chinese Font Setup

Simplified Chinese uses **Noto Sans SC** loaded from Google Fonts in `index.html`. System fallbacks (`PingFang SC`, `Microsoft YaHei`) apply when the Google Font is unavailable. The font is applied automatically when `<html lang="zh">` is set.

---

## Mock API

The development API is powered by [`json-server`](https://github.com/typicode/json-server) reading from `api/db.json`.

### Starting the mock API

```bash
npm run mock-api
# → http://localhost:4000
```

### Available endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /services` | All internet service plans |
| `GET /packages` | All packages |
| `GET /packages/:id` | Single package |
| `GET /news` | All news articles |
| `GET /news/:id` | Single news article |
| `GET /careers` | All job postings |
| `GET /careers/:id` | Single job posting |
| `GET /guides` | App installation guide steps |
| `GET /aboutContent` | About page content |
| `GET /contactInfo` | Contact details |
| `GET /heroSlides` | Home page banner slides |
| `POST /contactSubmissions` | Submit contact form |

> In development, Vite proxies all `/api/*` requests to `http://localhost:4000`, so you never need to specify the port in your code.

### Editing mock data

Open `api/db.json` to add, remove, or modify any content. json-server watches for file changes and reloads automatically.

---

## Testing

The project uses **Vitest** with **@testing-library/react**.

### Run all tests

```bash
npm run test
```

### Run in watch mode

```bash
npm run test:watch
```

### Test files

```
src/test/
├── setup.ts                     # Global mocks (i18next, react-router-dom)
├── utils.test.ts                # Pure function tests
├── ContactForm.test.tsx         # Form validation & submission
└── LanguageSwitcher.test.tsx    # Language toggle component
```

### Writing new tests

Place test files next to the component or inside `src/test/`. Name them `*.test.ts` or `*.test.tsx`. Global mocks for `react-i18next` and `react-router-dom` are pre-configured in `src/test/setup.ts`.

---

## Security Notes

| Concern | Mitigation |
|---------|-----------|
| Sensitive config | All secrets in `.env` — never committed (`.gitignore`) |
| XSS in dynamic HTML | News article HTML sanitized with `DOMPurify` before `dangerouslySetInnerHTML` |
| XSS in general | React escapes all JSX output by default |
| Form spam | Hidden honeypot field on contact form (bots fill it; server rejects) |
| Form validation | Client-side: `zod` schema. **Server must independently re-validate all inputs.** |
| File uploads | Client restricts to `.pdf/.doc/.docx` and 5 MB max — **server must re-validate.** |
| API base URL | Production build enforces HTTPS; HTTP URL triggers a runtime error |
| Content Security Policy | Baseline CSP `<meta>` tag in `index.html` — tighten allowed domains for production |
| localStorage | Only stores non-sensitive UI state (language preference) — no tokens or PII |

---

## Deployment

### 1. Build for production

```bash
npm run build
```

Output is placed in `dist/`. This also runs the TypeScript type check before building.

### 2. Preview the production build locally

```bash
npm run preview
```

### 3. Configure production environment

Create `.env.production` (or set variables in your hosting platform's dashboard):

```ini
VITE_API_BASE_URL=https://api.your-domain.com
VITE_APP_NAME=CG-NET
VITE_APP_DESCRIPTION=Myanmar's leading Internet Service Provider
```

### 4. Server configuration

Because this is a Single Page Application (SPA), your web server must redirect all routes to `index.html`.

**Nginx example:**

```nginx
server {
    listen 80;
    root /var/www/cg-net-cms/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache `.htaccess` example:**

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

### 5. Myanmar fonts

Ensure all WOFF2 files listed under [Myanmar Font Setup](#myanmar-font-setup) are present in `public/fonts/` before building. They will be copied to `dist/fonts/` automatically.

### 6. Tighten CSP

Update the `Content-Security-Policy` meta tag in `index.html` to restrict `script-src`, `img-src`, and `connect-src` to only your production domains.

### CI/CD Pipeline (GitHub Actions example)

```yaml
- name: Install
  run: npm ci

- name: Type check
  run: npm run typecheck

- name: Lint
  run: npm run lint

- name: Test
  run: npm run test

- name: Security audit
  run: npm run security-check

- name: Build
  run: npm run build
  env:
    VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
    VITE_APP_NAME: CG-NET

- name: Deploy
  run: # upload dist/ to your hosting (S3, Nginx, Vercel, etc.)
```

---

## Accessibility

- Semantic HTML with correct heading hierarchy (`h1 → h2 → h3`) on every page
- Icon-only interactive elements always have `aria-label`
- Form fields use `aria-invalid`, `aria-describedby`, and `role="alert"` for error messages
- `shadcn/ui` components handle keyboard navigation and focus management
- Focus-visible outlines enabled globally in `src/index.css`
- Language change updates `<html lang>` for screen readers and Myanmar font rendering
- Lazy-loaded routes wrapped in `<Suspense>` with accessible skeleton loaders

---

## Analytics

`src/lib/analytics.ts` exports a no-op stub:

```ts
analytics.trackPageView(path)
analytics.trackEvent(category, action, label?)
```

To integrate a real analytics provider (Google Analytics 4, Plausible, etc.), replace the stubs in this file. All page components call these helpers automatically on route change — no component changes required.

---

## License

Internal project — © CG-NET. All rights reserved.
