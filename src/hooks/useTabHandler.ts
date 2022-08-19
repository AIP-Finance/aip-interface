import { useCallback, useState } from 'react'

import useLocationHash from 'hooks/router/useLocationHash'

const useTabHandler = (defaultTab: string) => {
  const { hash, setHash } = useLocationHash()
  const [tab, setTab] = useState<string>(hash || defaultTab)
  const handleTab = useCallback(
    (t: string) => {
      setTab(t)
      setHash(t)
    },
    [setHash]
  )
  return { tab, handleTab }
}

export default useTabHandler
