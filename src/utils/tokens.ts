import { CHAIN_ID, ChainId } from './constants'

export const STABLE_COINS: TokenData[] = [
  {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    addresses: {
      [ChainId.TESTNET]: '0xd6e992c9A794A599DA83812b9D27B14876C25F73',
      [ChainId.MAINNET]: '',
    },
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    addresses: {
      [ChainId.TESTNET]: '0xc1A2e73109201214AD9F695eB56B9bC6EC7471cF',
      [ChainId.MAINNET]: '',
    },
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    addresses: {
      [ChainId.TESTNET]: '0xD3F4aB2AA30a4B9254476b8e35536f218D2C10cA',
      [ChainId.MAINNET]: '',
    },
  },
]
export const TOKENS: TokenData[] = [
  {
    name: 'Uniswap',
    symbol: 'UNI',
    addresses: {
      [ChainId.TESTNET]: '0xE06c2497422b6428350E2E7da24d3FE816166983',
      [ChainId.MAINNET]: '',
    },
  },
  {
    name: 'Test',
    symbol: 'TEST',
    addresses: {
      [ChainId.TESTNET]: '0xb8E688e6fDAf4512f4bE1E43375c124c6BE2abaf',
      [ChainId.MAINNET]: '',
    },
  },
]

export const getTokenInfo = (address: string, chainId = CHAIN_ID) =>
  TOKENS.find((token: TokenData) => token.addresses[chainId].toLowerCase() === address.toLowerCase())

export const getStableCoinInfo = (address: string, chainId = CHAIN_ID) =>
  STABLE_COINS.find((token: TokenData) => token.addresses[chainId].toLowerCase() === address.toLowerCase())
