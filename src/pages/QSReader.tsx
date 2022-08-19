import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { parsedQueryString } from 'hooks/router/useParsedQueryString'
import { useDarkModeManager } from 'hooks/store/state/useDarkMode'
import { useUserLocaleManager } from 'hooks/store/state/useLocale'
import { parseLocale } from 'utils/parsers'

export default function QSReader() {
  const { setUserDarkMode } = useDarkModeManager()
  const [, setUserLocale] = useUserLocaleManager()
  const { search } = useLocation()

  const setDarkModeFromQuery = useCallback(
    (theme) => {
      if (typeof theme !== 'string') return
      if (theme.toLowerCase() === 'light') {
        setUserDarkMode(false)
      } else if (theme.toLowerCase() === 'dark') {
        setUserDarkMode(true)
      }
    },
    [setUserDarkMode]
  )

  const setLocaleFromQuery = useCallback(
    (locale) => {
      if (typeof locale !== 'string') return
      const parsedLocale = parseLocale(locale)
      if (parsedLocale) {
        setUserLocale(parsedLocale)
      }
    },
    [setUserLocale]
  )

  useEffect(() => {
    const parsed = parsedQueryString(search)
    setDarkModeFromQuery(parsed.theme)
    setLocaleFromQuery(parsed.lang)
  }, [search, setDarkModeFromQuery, setLocaleFromQuery])

  return null
}
