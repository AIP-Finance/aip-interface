export { messages as DEFAULT_MESSAGES } from 'locales/en/messages'
export const SUPPORTED_LOCALES = ['en']
export const DEFAULT_LOCALE = 'en'
export const DEFAULT_CHAIN_ID = '56'
export const CONNECTOR_STORAGE_KEY = 'connector'
export const CHAIN_ID = +(process.env.REACT_APP_CHAIN_ID ?? DEFAULT_CHAIN_ID)

export const LINKS = {
  telegramChannel: '',
  telegramGroup: '',
  twitter: '',
  medium: '',
  whitepaper: '',
  pinksale: '',
  pancakeswap: '',
}

export const DATE_FORMAT = 'MMM D, YYYY - HH:mm'
export const DEFAULT_LIMIT = 12
export const MIN_PARSE_ETHER = 0.00000001
