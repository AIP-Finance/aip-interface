import dayjs from 'dayjs'

import { DATE_FORMAT } from './constants'

export function formatNumber(num?: number | string, maxDigit = 2, minDigit?: number) {
  if (num == null) return ''
  if (typeof num === 'string') num = Number(num)
  // if (num > 1000000000) return t`${(num / 1000000000).toFixed(0)} tỷ`
  return `${num.toLocaleString('en-US', { minimumFractionDigits: minDigit, maximumFractionDigits: maxDigit })}`
}

export const addressShorten = (address: string, num?: number) => {
  if (!address) return ''
  if (!num) num = 4
  if (num >= address.length / 2) return address
  const prefix = address.slice(0, num + 2)
  const suffix = address.slice(-num, address.length)
  return `${prefix}...${suffix}`
}

export const formatDate = (timestamp: number, format: string = DATE_FORMAT) => dayjs.unix(timestamp).format(format)
