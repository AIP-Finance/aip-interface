import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import ToastBody from 'components/ToastBody'
import WalletModal from 'components/WalletModal'
import connectors from 'utils/connectors'
import { CONNECTOR_STORAGE_KEY } from 'utils/constants'
import { setupNetwork } from 'utils/wallet'

import useActiveWeb3React from './useActiveWeb3React'

export const AuthContext = createContext({} as any)

export function AuthProvider({ children }: { children: JSX.Element }) {
  const { account, activate, deactivate, setError } = useActiveWeb3React()
  const [openingModal, setOpeningModal] = useState(false)
  const connect = useCallback(
    async (connectorName: 'injected' | 'walletconnect') => {
      const connector = connectors[connectorName]
      if (!connector) return
      window?.localStorage?.setItem(CONNECTOR_STORAGE_KEY, connectorName)
      activate(connector, async (error: Error) => {
        window?.localStorage?.removeItem(CONNECTOR_STORAGE_KEY)
        if (error instanceof UnsupportedChainIdError) {
          setError(error)
          const provider = await connector.getProvider()
          const hasSetup = await setupNetwork(provider)
          if (hasSetup) {
            activate(connector)
          }
        } else {
          if (error instanceof NoEthereumProviderError) {
            toast.error(<ToastBody title="Provider Error" message="No provider was found" />)
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = undefined
            }
            toast.error(<ToastBody title="Authorization Error" message="Please authorize to access your account" />)
          } else {
            toast.error(<ToastBody title={error.name} message={error.message} />)
          }
        }
      })
    },
    [activate, setError]
  )

  const disconnect = useCallback(() => {
    deactivate()
    window?.localStorage?.removeItem(CONNECTOR_STORAGE_KEY)
  }, [deactivate])

  const contextValue = useMemo(() => {
    return { account, connect, disconnect, openModal: setOpeningModal }
  }, [account, connect, disconnect])
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <WalletModal isOpen={openingModal} onDismiss={() => setOpeningModal(false)} onConnect={connect}></WalletModal>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
