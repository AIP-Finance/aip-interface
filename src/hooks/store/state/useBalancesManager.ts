// import { BigNumber } from '@ethersproject/bignumber'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { useCallback, useEffect } from 'react'

import { GlobalState } from 'hooks/store/types'
import { useGlobalStoreContext, useGlobalStoreSelector } from 'hooks/store/useGlobalStore'
import useActiveWeb3React from 'hooks/web3/useActiveWeb3React'
import { useERC20Contract } from 'hooks/web3/useContract'
import { pollEvery } from 'utils/pollEvery'
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
  return [balances, setBalance]
}

export const usePollingBalance = () => {
  const [, setBalance] = useBalancesManager()
  const { account } = useActiveWeb3React()
  const tokenContract = useERC20Contract(process.env.REACT_APP_TOKEN_CONTRACT, true)

  useEffect(() => {
    // console.log('go again')
    let cancel = false
    const getBalanceBNB = async () => {
      if (!account) return { asset: 'BNB', balance: null }
      const data = await getAccountBalance(account)
      return { asset: 'BNB', balance: data ? Number(formatEther(data as BigNumber)) : null }
    }
    const getBalanceTOKEN = async () => {
      if (!tokenContract) return { asset: 'TOKEN', balance: null }
      try {
        const data = await tokenContract.balanceOf(account)
        return { asset: 'TOKEN', balance: Number(formatEther(data)) }
      } catch (err) {
        return { asset: 'TOKEN', balance: null }
      }
    }
    // Poll wallet balance
    const pollBalance = pollEvery((onUpdate: (asset: string, balance: number | null) => void) => {
      return {
        async request() {
          // onUpdate('TOKEN', null)
          // return await getBalanceTOKEN()
          return Promise.all([getBalanceBNB(), getBalanceTOKEN()])
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
      setBalance('BNB', null)
      setBalance('TOKEN', null)
    }
  }, [account, setBalance, tokenContract])
}

export default useBalancesManager
