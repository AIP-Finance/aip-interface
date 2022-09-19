// import { BigNumber } from '@ethersproject/bignumber'
import { useCallback } from 'react'

import { GlobalState } from 'hooks/store/types'
import { useGlobalStoreContext, useGlobalStoreSelector } from 'hooks/store/useGlobalStore'
import { StableCoin } from 'utils/constants'

// import { getAccountBalance } from 'utils/wallet'

const useStableCoinManager = () => {
  const stableCoin = useGlobalStoreSelector((state: GlobalState) => state.stableCoin)
  const { setState } = useGlobalStoreContext()
  const setStableCoin = useCallback(
    (coin: StableCoin) => {
      setState({ stableCoin: coin })
    },
    [setState]
  )
  return { stableCoin, setStableCoin }
}

export default useStableCoinManager
