import * as yup from 'yup'

export type LocalState = {
  setting: {
    userDarkMode: boolean | null
    userLocale: string | null
    matchesDarkMode: boolean | null
  }
}

export type GlobalState = {
  bnbInUsd?: number
  balances: {
    BNB?: number
    TOKEN?: number
  }
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
