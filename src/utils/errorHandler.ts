// eslint-disable-next-line no-restricted-imports
import { t } from '@lingui/macro'
import { AxiosError } from 'axios'

export const getErrorMessage = (error: AxiosError): string => {
  if (!error?.response?.data) return t`An error occurs. Please try again`
  return (error.response.data as any).message
}

export const getContractErrorData = (error: {
  code: number
  message: number
  data: { code: number; message: string }
}): { name: string; message: string } => {
  return { name: 'Error', message: error.data.message.replace('execution reverted: ', '') }
}
