import { useEffect } from 'react'

import { getBnbPrice } from 'apis/coingecko'
import { GlobalState } from 'hooks/store/types'
import { useGlobalStoreContext, useGlobalStoreSelector } from 'hooks/store/useGlobalStore'
import { pollEvery } from 'utils/pollEvery'

const useBnbPrice = () => {
  const usdPrice: number | null = useGlobalStoreSelector((state: GlobalState) => state.bnbInUsd)
  return usdPrice
}
export const usePollingBnbPrice = () => {
  const { setState } = useGlobalStoreContext()
  useEffect(() => {
    let cancel = false
    const pollBalance = pollEvery((onUpdate: (data: { bnbInUsd: number }) => void) => {
      return {
        async request() {
          return getBnbPrice()
        },
        onResult(result: number | null) {
          if (cancel || !result) return
          onUpdate({ bnbInUsd: result })
        },
      }
    }, 30_000)

    // start polling balance every x time
    const stopPollingBalance = pollBalance(setState)

    return () => {
      cancel = true
      stopPollingBalance()
      setState({ bnbUsdPrice: undefined })
    }
  }, [setState])
}

export default useBnbPrice
