// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'

import ERC20_ABI from 'abis/ERC20.json'
import PlanManager_ABI from 'abis/PlanManager.json'
import Pool_ABI from 'abis/Pool.json'
import useActiveWeb3React from 'hooks/web3/useActiveWeb3React'
import { getContract, getProviderOrSigner } from 'utils/contracts'

// returns null on errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, withSignerIfPossible ? getProviderOrSigner(library, account) : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account]) as T
}

export function useERC20Contract(erc20Address?: string, withSignerIfPossible?: boolean) {
  return useContract(erc20Address, ERC20_ABI, withSignerIfPossible)
}

export function usePlanManagerContract(withSignerIfPossible?: boolean) {
  return useContract(process.env.REACT_APP_PLAN_MANAGER, PlanManager_ABI, withSignerIfPossible)
}

export function usePoolContract(poolAddress: string, withSignerIfPossible?: boolean) {
  return useContract(poolAddress, Pool_ABI, withSignerIfPossible)
}
