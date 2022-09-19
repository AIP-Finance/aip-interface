import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

import { StableCoin } from 'utils/constants'

import {
  GlobalContextValue,
  GlobalState,
  SelectorFn,
  Subscription,
  SubscriptionCallback,
  SubscriptionContext,
} from './types'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect

export const GLOBAL_INITIAL_STATE: GlobalState = {
  balances: {
    ETH: undefined,
    USDT: undefined,
    DAI: undefined,
    USDC: undefined,
  },
  stableCoin: process.env.REACT_APP_STABLE_COIN as StableCoin,
}

export const GlobalStoreContext = React.createContext({} as any)

const safeSelector = (selector: SelectorFn) => (args: SelectorFn) => {
  try {
    return selector(args)
  } catch {
    return null
  } // return undefined
}

export function GlobalStoreProvider({
  children,
  initialState = {} as GlobalState,
}: {
  children: ReactNode
  initialState: GlobalState
}) {
  const store = useRef<GlobalState>({ ...initialState })
  const subscriptionsRef = useRef<Subscription>({} as Subscription)
  const notifyChanges = useCallback(() => {
    const subscriptions = subscriptionsRef.current
    for (const key in subscriptions) {
      subscriptions[key]()
    }
  }, [])
  const contextValue: GlobalContextValue = useMemo(() => {
    return {
      setState: (obj: GlobalState) => {
        const oldValue = store.current
        const newValue = cloneDeep(oldValue)
        mergeWith(newValue, obj, (newValue, obj) => {
          if (newValue && Object.getPrototypeOf(newValue) === Object.prototype) {
            if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
              return {}
            }
            return merge(newValue, obj)
          }
          return obj
        })
        if (isEqual(newValue, oldValue)) return
        store.current = newValue as GlobalState
        notifyChanges()
      },
      getState: () => store.current,
      subscription: {
        subscribe: (key: string, cb: SubscriptionCallback) => {
          subscriptionsRef.current[key] = cb
        },
        unsubscribe: (key: string) => {
          delete subscriptionsRef.current[key]
        },
      },
    }
  }, [notifyChanges])

  return <GlobalStoreContext.Provider value={contextValue}>{children}</GlobalStoreContext.Provider>
}

function useSelectorWithStoreAndSubscription(
  getState: () => GlobalState,
  subscription: SubscriptionContext,
  selector: SelectorFn
) {
  const [, forceRender] = useReducer((s) => s + 1, 0)
  const latestSubscriptionCallbackError = useRef<Error>()
  const latestSelectedState = useRef<any>()
  const latestStoreState = useRef<GlobalState>()
  const storeState = getState()
  let selectedState: any | undefined

  try {
    if (storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      const newSelectedState = selector(storeState)
      // ensure latest selected state is reused so that a custom equality function can result in identical references
      if (latestSelectedState.current === undefined || !isEqual(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState
      } else {
        selectedState = latestSelectedState.current
      }
    } else {
      selectedState = latestSelectedState.current
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`
    }

    throw err
  }

  useIsomorphicLayoutEffect(() => {
    latestStoreState.current = storeState
    latestSelectedState.current = selectedState
    latestSubscriptionCallbackError.current = undefined
  })

  useIsomorphicLayoutEffect(() => {
    const checkForUpdates = () => {
      try {
        const newStoreState = getState()
        if (newStoreState === latestStoreState.current) {
          return
        }
        const newSelectedState: any = selector(newStoreState)
        if (isEqual(newSelectedState, latestSelectedState.current)) {
          return
        }
        latestSelectedState.current = newSelectedState
        latestStoreState.current = newStoreState
      } catch (err) {
        latestSubscriptionCallbackError.current = err
      }
      forceRender()
    }
    checkForUpdates()
    const key = uuidv4()
    subscription.subscribe(key, () => checkForUpdates())
    // forceRender()
    return () => subscription.unsubscribe(key)
  }, [getState])
  return selectedState
}
export const useGlobalStoreContext = () => useContext(GlobalStoreContext)
export function useGlobalStoreSelector(selector: SelectorFn) {
  const storeContext = useGlobalStoreContext()
  const selectedState = useSelectorWithStoreAndSubscription(
    storeContext.getState,
    storeContext.subscription,
    safeSelector(selector)
  )
  return selectedState
}
