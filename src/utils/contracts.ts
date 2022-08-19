import { Signer } from '@ethersproject/abstract-signer'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { Provider, Web3Provider } from '@ethersproject/providers'

import MULTICALL_ABI from 'abis/Multicall.json'
import PAIR_ABI from 'abis/Pair.json'
import { simpleRpcProvider } from 'utils/providers'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): Signer {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string | null): Provider | Signer {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, signer?: Signer | Provider): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer ?? simpleRpcProvider)
}

export const getMulticallContract = () => {
  return getContract(
    process.env.REACT_APP_MULTICALL_CONTRACT ?? '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    MULTICALL_ABI,
    simpleRpcProvider
  )
}
