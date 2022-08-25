import { formatUnits } from '@ethersproject/units'
import { useEffect, useState } from 'react'

import SwapManager_ABI from 'abis/SwapManager.json'
import useStableCoinManager from 'hooks/store/state/useStableCoinManager'
import { CHAIN_ID } from 'utils/constants'
import { multicallv2 } from 'utils/multicall'
import { TOKENS, getStableCoinAddress } from 'utils/tokens'

const usePrices = () => {
  const { stableCoin } = useStableCoinManager()
  const [prices, setPrices] = useState<{ [key: string]: number }>({})
  useEffect(() => {
    const load = async () => {
      const calls = TOKENS.map((token: TokenData) => ({
        address: process.env.REACT_APP_SWAP_MANAGER ?? '',
        name: 'poolPrice',
        params: [getStableCoinAddress(stableCoin), token.addresses[CHAIN_ID] ?? '', 3000],
        // TODO get fee from pool
      }))
      const data: number[] = await multicallv2(SwapManager_ABI, calls).then((results) => {
        return results.map((result: any, index: number) => {
          return 1 / Number(formatUnits(result.price, TOKENS[index].decimals))
        })
      })
      const priceData: { [key: string]: number } = {}
      data.forEach((price, index) => (priceData[TOKENS[index].symbol] = price))
      setPrices(priceData)
    }
    load()
  }, [stableCoin])
  return { prices, stableCoin }
}

export default usePrices
