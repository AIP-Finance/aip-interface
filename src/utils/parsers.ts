import { SUPPORTED_LOCALES } from './constants'

// dayjs.extend(duration)

/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param maybeSupportedLocale the fuzzy locale identifier
 */
export function parseLocale(maybeSupportedLocale: string) {
  if (typeof maybeSupportedLocale !== 'string') return undefined
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase()
  return SUPPORTED_LOCALES.find(
    (locale) => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split('-')[0] === lowerMaybeSupportedLocale
  )
}

export function floorNumber(num: number, decimals: number) {
  const multipler = Number('1'.padEnd(1 + decimals, '0'))
  return Math.floor(num * multipler) / multipler
}

export const pageToOffset = (page: number, limit: number) => (page - 1) * limit
export const offsetToPage = (offset: number, limit: number) => offset / limit + 1
