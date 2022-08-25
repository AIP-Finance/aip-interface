import { defaultAbiCoder } from '@ethersproject/abi'
import { getAddress } from '@ethersproject/address'
import { keccak256 } from '@ethersproject/keccak256'

export const getPoolAddress = (token0: string, token1: string, frequency: number) => {
  const constructorArgumentsEncoded = defaultAbiCoder.encode(
    ['address', 'address', 'uint24'],
    [token0, token1, frequency]
  )
  const create2Inputs = [
    '0xff',
    process.env.REACT_APP_FACTORY_CONTRACT ?? '',
    // salt
    keccak256(constructorArgumentsEncoded),
    // init code. bytecode + constructor arguments
    process.env.REACT_APP_POOL_INIT_CODE_HASH ?? '',
  ]
  const sanitizedInputs = `0x${create2Inputs.map((i) => i.slice(2)).join('')}`
  return getAddress(`0x${keccak256(sanitizedInputs).slice(-40)}`)
}
