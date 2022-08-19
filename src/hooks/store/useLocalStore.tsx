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

import {
  LocalContextValue,
  LocalState,
  SelectorFn,
  Subscription,
  SubscriptionCallback,
  SubscriptionContext,
  localStateSchema,
} from './types'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect

export const LOCAL_INITIAL_STATE: LocalState = {
  setting: { userDarkMode: null, userLocale: null, matchesDarkMode: null },
}

export const LocalStoreContext = React.createContext({} as any)

const get = (name: string, initialState: LocalState, value?: string | null): LocalState => {
  try {
    const storageState = localStorage.getItem(name) ?? '{}'
    const newState = JSON.parse(value ?? storageState)
    localStateSchema.validateSync(newState)
    return { ...initialState, ...newState }
  } catch (err) {
    if (!value) localStorage.removeItem(name)
  }
  return { ...initialState }
}

const set = (name: string, initialState: LocalState, value?: LocalState) => {
  localStorage.setItem(name, JSON.stringify({ ...initialState, ...value }))
}

const safeSelector = (selector: SelectorFn) => (args: SelectorFn) => {
  try {
    return selector(args)
  } catch {
    return null
  } // return undefined
}

export function LocalStoreProvider({
  children,
  initialState = {} as LocalState,
  name = 'store',
}: {
  children: ReactNode
  initialState: LocalState
  name?: string
}) {
  const store = useRef<LocalState>(get(name, initialState) as LocalState)
  const subscriptionsRef = useRef<Subscription>({} as Subscription)
  // const change = (event: StorageEvent) => {
  //   if (event.storageArea === localStorage && event.key === name && event.newValue !== event.oldValue) {
  //     store.current = get(name, initialState, event.newValue)
  //     notifyChanges()
  //   }
  // }
  const notifyChanges = useCallback(() => {
    const subscriptions = subscriptionsRef.current
    for (const key in subscriptions) {
      subscriptions[key]()
    }
  }, [])
  const contextValue: LocalContextValue = useMemo(() => {
    return {
      setState: (obj: LocalState) => {
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
        set(name, initialState, newValue)
        store.current = newValue as LocalState
        // setTimeout(() => {
        notifyChanges()
        // }, 1000)
      },
      getState: () => {
        return store.current
      },
      subscription: {
        subscribe: (key: string, cb: SubscriptionCallback) => {
          subscriptionsRef.current[key] = cb
        },
        unsubscribe: (key: string) => {
          delete subscriptionsRef.current[key]
        },
      },
    }
  }, [initialState, name, notifyChanges])

  // useIsomorphicLayoutEffect(() => {
  //   window.addEventListener('storage', change, false)
  //   return () => window.removeEventListener('storage', change)
  // }, [])

  return <LocalStoreContext.Provider value={contextValue}>{children}</LocalStoreContext.Provider>
}

function useSelectorWithStoreAndSubscription(
  getState: () => LocalState,
  subscription: SubscriptionContext,
  selector: SelectorFn
) {
  const [, forceRender] = useReducer((s) => s + 1, 0)
  const latestSubscriptionCallbackError = useRef<Error>()
  const latestSelectedState = useRef<any>()
  const latestStoreState = useRef<LocalState>()
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
export const useLocalStoreContext = () => useContext(LocalStoreContext)
export function useLocalStoreSelector(selector: SelectorFn) {
  const storeContext = useLocalStoreContext()
  const selectedState = useSelectorWithStoreAndSubscription(
    storeContext.getState,
    storeContext.subscription,
    safeSelector(selector)
  )
  return selectedState
}
