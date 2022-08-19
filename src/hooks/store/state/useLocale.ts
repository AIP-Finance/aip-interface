import { useCallback, useMemo } from 'react'

import { LocalState } from 'hooks/store/types'
import { useLocalStoreContext, useLocalStoreSelector } from 'hooks/store/useLocalStore'
import { DEFAULT_LOCALE } from 'utils/constants'
import { parseLocale } from 'utils/parsers'

// import { parsedQueryString } from "./useParsedQueryString";

/**
 * Returns the supported locale read from the user agent (navigator)
 */
export function navigatorLocale() {
  if (!navigator.language) return undefined

  const [language, region] = navigator.language.split('-')

  if (region) {
    return parseLocale(`${language}-${region.toUpperCase()}`) ?? parseLocale(language)
  }

  return parseLocale(language)
}
// parseLocale(parsedQueryString().lang) ?? navigatorLocale() ?? DEFAULT_LOCALE;

export function useUserLocale(): string {
  return useLocalStoreSelector((state: LocalState) => state.setting.userLocale) as string
}

export function useUserLocaleManager() {
  const locale = useUserLocale()
  const { setState } = useLocalStoreContext()
  const setLocale = useCallback(
    (newLocale: string) => {
      setState({ setting: { userLocale: newLocale } })
    },
    [setState]
  )

  return [locale, setLocale] as const
}

/**
 * Returns the currently active locale, from a combination of user agent, query string, and user settings stored in redux
 * Stores the query string locale in redux (if set) to persist across sessions
 */
export function useActiveLocale(): string {
  const userLocale = useUserLocale()
  return useMemo(() => userLocale ?? navigatorLocale() ?? DEFAULT_LOCALE, [userLocale])
}
