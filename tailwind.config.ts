import type { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // ISP brand colors
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        //Custom colors
        hero: {
          title: 'var(--color-title-white-hero)',
          subtitle: 'var(--color-subtitle-white-hero)',
          'gradient-bg': 'var(--gradient-bg)',
          'gradient-font': 'var(--gradient-font)',
        },
        app: {
          primary: 'var(--color-primary)', //primary color
          secondary: 'var(--color-secondary)',
          hover: 'var(--color-hover)', //button hover
          bar: 'var(--color-bar)', //stat bar
          footer: 'var(--color-footer)', //footer
          card: 'var(--color-card-bg)', //card bg
          yellow: 'var(--color-yellow)',
        },
        font: {
          black: 'var(--color-font-black)',
          secondary: 'var(--color-font-secondary-black)',
          blue: 'var(--color-font-blue)',
          'light-blue': 'var(--color-font-light-blue)',
          white: 'var(--color-font-white)',
          muted: 'var(--color-font-muted)',
          hover: 'var(--color-font-hover)',
        },
        icon: {
          lightning: 'var(--color-icon-lightning)',
          shield: 'var(--color-icon-shield)',
          clock: 'var(--color-icon-clock)',
          data: 'var(--color-icon-data)',
          router: 'var(--color-icon-router)',

          award: 'var(--color-icon-award)',
          activity: 'var(--color-icon-activity)',
          map: 'var(--color-icon-map)',
          user: 'var(--color-icon-user)',
          calendar: 'var(--color-icon-calendar)',

          abg: 'var(--color-icon-a-bg)',
          bbg: 'var(--color-icon-b-bg)',
          cbg: 'var(--color-icon-c-bg)',
          dbg: 'var(--color-icon-d-bg)',
          ebg: 'var(--color-icon-e-bg)',

          'a-hover': 'var(--color-icon-lightning)',
          'b-hover': 'var(--color-icon-shield)',
          'c-hover': 'var(--color-icon-clock)',
          'd-hover': 'var(--color-icon-data)',
          'e-hover': 'var(--color-icon-router)',

          'lightning-hover': 'var(--color-font-white)',
          'shield-hover': 'var(--color-font-white)',
          'clock-hover': 'var(--color-font-white)',
          'data-hover': 'var(--color-font-white)',
          'router-hover': 'var(--color-font-white)',
        },
      },
      backgroundImage: {
        'gradient-font': 'var(--gradient-font)',
        'gradient-bg': 'var(--gradient-bg)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
      },
      fontFamily: {
        myanmar: ['"Noto Sans Myanmar"', '"Pyidaungsu"', '"Padauk"', 'sans-serif'],
        chinese: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        head: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
