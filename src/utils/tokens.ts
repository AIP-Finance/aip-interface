import { CHAIN_ID, ChainId } from './constants'

export const STABLE_COINS: TokenData[] = [
  {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    addresses: {
      [ChainId.TESTNET]: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
      [ChainId.MAINNET]: '',
    },
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 18,
    addresses: {
      [ChainId.TESTNET]: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
      [ChainId.MAINNET]: '',
    },
  },
  {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 18,
    addresses: {
      [ChainId.TESTNET]: '0x944c7626b5074F423F4C00aa54b520c4d985578d',
      [ChainId.MAINNET]: '',
    },
  },
]
export const TOKENS: TokenData[] = [
  {
    name: 'Wrapped ETH',
    symbol: 'WETH',
    decimals: 18,
    addresses: {
      [ChainId.TESTNET]: '0x5bfC833BC041DCb65D8294C2DD9C817D71aEa9b8',
      [ChainId.MAINNET]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
  },
  // {
  //   name: 'TestInvest2',
  //   symbol: 'TI2',
  //   decimals: 5,
  //   addresses: {
  //     [ChainId.TESTNET]: '0xef68cEE62bc85650Ee96dbBaC7653B1BA103ADc6',
  //     [ChainId.MAINNET]: '',
  //   },
  // },
]

export const getTokenInfo = (address: string, chainId = CHAIN_ID) =>
  TOKENS.find((token: TokenData) => token.addresses[chainId].toLowerCase() === address.toLowerCase())

export const getStableCoinInfo = (address: string, chainId = CHAIN_ID) =>
  STABLE_COINS.find((token: TokenData) => token.addresses[chainId].toLowerCase() === address.toLowerCase())

export const getStableCoinAddress = (symbol: string, chainId = CHAIN_ID) =>
  STABLE_COINS.find((token: TokenData) => token.symbol === symbol)?.addresses[chainId]
