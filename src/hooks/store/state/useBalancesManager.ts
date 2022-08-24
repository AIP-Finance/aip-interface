// import { BigNumber } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { useCallback, useEffect } from 'react'

import { GlobalState } from 'hooks/store/types'
import { useGlobalStoreContext, useGlobalStoreSelector } from 'hooks/store/useGlobalStore'
import useActiveWeb3React from 'hooks/web3/useActiveWeb3React'
import { useERC20Contract } from 'hooks/web3/useContract'
import { StableCoin } from 'utils/constants'
import { pollEvery } from 'utils/pollEvery'
import { getStableCoinAddress } from 'utils/tokens'
import { getAccountBalance } from 'utils/wallet'

// import { getAccountBalance } from 'utils/wallet'

const useBalancesManager = () => {
  const balances = useGlobalStoreSelector((state: GlobalState) => state.balances)
  const { setState } = useGlobalStoreContext()
  const setBalance = useCallback(
    (asset, amount) => {
      setState({
        balances: {
          [asset]: amount,
        },
      })
    },
    [setState]
  )
  return { balances, setBalance }
}

export const usePollingBalance = (stableCoin: StableCoin) => {
  const { setBalance } = useBalancesManager()
  const { account } = useActiveWeb3React()
  const tokenContract = useERC20Contract(getStableCoinAddress(stableCoin), true)

  useEffect(() => {
    // console.log('go again')
    let cancel = false
    const getBalanceETH = async () => {
      if (!account) return { asset: 'ETH', balance: null }
      const data = await getAccountBalance(account)
      return { asset: 'ETH', balance: data ? Number(formatEther(data as BigNumber)) : null }
    }
    const getBalanceStableCoin = async () => {
      if (!tokenContract) return { asset: stableCoin, balance: null }
      try {
        const data = await tokenContract.balanceOf(account)
        return { asset: stableCoin, balance: Number(formatEther(data)) }
      } catch (err) {
        return { asset: stableCoin, balance: null }
      }
    }
    // Poll wallet balance
    const pollBalance = pollEvery((onUpdate: (asset: string, balance: number | null) => void) => {
      return {
        async request() {
          // onUpdate('TOKEN', null)
          // return await getBalanceTOKEN()
          return Promise.all([getBalanceETH(), getBalanceStableCoin()])
        },
        onResult(results?: [{ asset: string; balance: number | null }]) {
          if (cancel || !results) return

          results?.forEach((result) => {
            if (!result) return
            onUpdate(result.asset, result.balance)
          })
        },
      }
    }, 30_000)

    // start polling balance every x time
    const stopPollingBalance = pollBalance(setBalance)

    return () => {
      cancel = true
      stopPollingBalance()
      setBalance('ETH', null)
      setBalance(stableCoin, null)
    }
  }, [account, setBalance, stableCoin, tokenContract])
}

export default useBalancesManager
