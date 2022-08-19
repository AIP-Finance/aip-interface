import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import { en } from 'make-plural/plurals'
import { ReactNode, useEffect } from 'react'

import { useActiveLocale, useUserLocaleManager } from 'hooks/store/state/useLocale'
import { DEFAULT_LOCALE, DEFAULT_MESSAGES } from 'utils/constants'

const plurals = {
  en,
}

export async function dynamicActivate(locale: string) {
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale as 'en'] })
  const { messages } =
    locale === DEFAULT_LOCALE ? { messages: DEFAULT_MESSAGES } : await import(`./locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

// dynamicActivate(initialLocale)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useActiveLocale()
  const [userLocale, setUserLocale] = useUserLocaleManager()

  useEffect(() => {
    dynamicActivate(locale)
      .then(() => {
        document.documentElement.setAttribute('lang', locale)
        dayjs.locale(locale)
        if (!userLocale) {
          setUserLocale(locale)
          dayjs.locale(locale)
        }
      })
      .catch(() => {
        // console.error('Failed to activate locale', locale, error)
      })
  }, [locale, setUserLocale, userLocale])

  return (
    <I18nProvider forceRenderOnLocaleChange={false} i18n={i18n}>
      {children}
    </I18nProvider>
  )
}
