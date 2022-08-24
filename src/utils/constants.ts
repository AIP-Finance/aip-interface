export { messages as DEFAULT_MESSAGES } from 'locales/en/messages'
export const SUPPORTED_LOCALES = ['en']
export const DEFAULT_LOCALE = 'en'

export const CONNECTOR_STORAGE_KEY = 'connector'

export enum ChainId {
  TESTNET = 3,
  MAINNET = 1,
}
export const DEFAULT_CHAIN_ID = ChainId.MAINNET
export const CHAIN_ID = +(process.env.REACT_APP_CHAIN_ID ?? DEFAULT_CHAIN_ID)

export const LINKS = {
  telegramChannel: 'https://t.me/aip_finance',
  telegramGroup: 'https://t.me/aip_finance',
  twitter: 'https://twitter.com/0xAutoInvest',
  medium: 'https://medium.com/@autoinvest',
  github: 'https://github.com/AIP-Finance',
  whitepaper: '',
  pinksale: '',
  pancakeswap: '',
  privacy: '',
}

export type StableCoin = 'USDT' | 'USDC' | 'DAI'

export const DATE_FORMAT = 'YYYY-MM-DD hh:mm'
export const DEFAULT_LIMIT = 12
export const MIN_PARSE_ETHER = 0.00000001
