import * as yup from 'yup'

import { StableCoin } from 'utils/constants'

export type LocalState = {
  setting: {
    userDarkMode: boolean | null
    userLocale: string | null
    matchesDarkMode: boolean | null
  }
}

export type GlobalState = {
  balances: {
    ETH?: number
    USDT?: number
    DAI?: number
    USDC?: number
  }
  stableCoin: StableCoin
}

export const localStateSchema = yup.object({
  setting: yup.object({
    userDarkMode: yup.boolean().nullable(),
    userLocale: yup.string().nullable(),
    matchesDarkMode: yup.boolean().nullable(),
  }),
})

export type SelectorFn = (state: any) => any

export type SubscriptionCallback = () => void

export type Subscription = { [key: string]: SubscriptionCallback }

export type SubscriptionContext = {
  subscribe: (key: string, cb: SubscriptionCallback) => void
  unsubscribe: (key: string) => void
}

export type LocalContextValue = {
  setState: (obj: LocalState) => void
  getState: () => LocalState
  subscription: SubscriptionContext
}

export type GlobalContextValue = {
  setState: (obj: GlobalState) => void
  getState: () => GlobalState
  subscription: SubscriptionContext
}
