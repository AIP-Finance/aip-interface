import { useEffect } from 'react'

import { useDarkModeManager } from 'hooks/store/state/useDarkMode'

export default function DarkModeUpdater() {
  const { setMatchesDarkMode } = useDarkModeManager()

  // keep dark mode in sync with the system
  useEffect(() => {
    const darkHandler = (match: MediaQueryListEvent) => {
      setMatchesDarkMode(match.matches)
    }
    const match = window?.matchMedia('(prefers-color-scheme: dark)')
    setMatchesDarkMode(match.matches)

    if (match?.addListener) {
      match?.addListener(darkHandler)
    } else if (match?.addEventListener) {
      match?.addEventListener('change', darkHandler)
    }

    return () => {
      if (match?.removeListener) {
        match?.removeListener(darkHandler)
      } else if (match?.removeEventListener) {
        match?.removeEventListener('change', darkHandler)
      }
    }
  }, [setMatchesDarkMode])

  return null
}
