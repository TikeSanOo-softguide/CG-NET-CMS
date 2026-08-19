import { describe, it, expect } from 'vitest'
import { getLocalized, getLocalizedArray, formatCurrency, isHttpsUrl, truncate } from '@/lib/utils'

describe('getLocalized', () => {
  it('returns the correct language string', () => {
    const field = { en: 'Hello', my: 'မင်္ဂလာပါ', zh: '你好' }
    expect(getLocalized(field, 'en')).toBe('Hello')
    expect(getLocalized(field, 'my')).toBe('မင်္ဂလာပါ')
    expect(getLocalized(field, 'zh')).toBe('你好')
  })

  it('falls back to English when language is missing', () => {
    const field = { en: 'Hello', my: '' }
    expect(getLocalized(field, 'my')).toBe('Hello')
    expect(getLocalized(field, 'zh')).toBe('Hello')
  })

  it('handles plain strings', () => {
    expect(getLocalized('plain', 'en')).toBe('plain')
  })

  it('returns empty string for undefined', () => {
    expect(getLocalized(undefined, 'en')).toBe('')
  })
})

describe('getLocalizedArray', () => {
  it('returns the correct language array', () => {
    const field = { en: ['a', 'b'], my: ['က', 'ခ'], zh: ['甲', '乙'] }
    expect(getLocalizedArray(field, 'en')).toEqual(['a', 'b'])
    expect(getLocalizedArray(field, 'my')).toEqual(['က', 'ခ'])
    expect(getLocalizedArray(field, 'zh')).toEqual(['甲', '乙'])
  })
})

describe('formatCurrency', () => {
  it('formats a number as MMK', () => {
    expect(formatCurrency(25000)).toBe('25,000 MMK')
  })
})

describe('isHttpsUrl', () => {
  it('returns true for https URLs', () => {
    expect(isHttpsUrl('https://example.com')).toBe(true)
  })
  it('returns false for http URLs', () => {
    expect(isHttpsUrl('http://localhost:4000')).toBe(false)
  })
  it('returns false for invalid URLs', () => {
    expect(isHttpsUrl('not-a-url')).toBe(false)
  })
})

describe('truncate', () => {
  it('truncates long strings', () => {
    const result = truncate('Hello World', 5)
    expect(result).toContain('...')
    expect(result.length).toBeLessThan(15)
  })
  it('does not truncate short strings', () => {
    expect(truncate('Hi', 10)).toBe('Hi')
  })
})
