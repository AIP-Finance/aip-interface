// import { GlobalState } from 'hooks/store/types'
import { useCallback } from 'react'

import { useLocalStoreContext, useLocalStoreSelector } from 'hooks/store/useLocalStore'

import { LocalState } from '../types'

export const useIsDarkMode = () => {
  const { userDarkMode, matchesDarkMode } =
    useLocalStoreSelector(({ setting: { matchesDarkMode, userDarkMode } }: LocalState) => ({
      userDarkMode,
      matchesDarkMode,
    })) ?? {}

  return (userDarkMode === null ? matchesDarkMode : userDarkMode) as boolean
}

export function useDarkModeManager() {
  const isDarkMode = useIsDarkMode()
  const { setState } = useLocalStoreContext()
  const setUserDarkMode = useCallback(
    (userDarkMode) => {
      setState({ setting: { userDarkMode } })
    },
    [setState]
  )
  const setMatchesDarkMode = useCallback(
    (matchesDarkMode) => {
      setState({ setting: { matchesDarkMode } })
    },
    [setState]
  )

  return { isDarkMode, setUserDarkMode, setMatchesDarkMode }
}
