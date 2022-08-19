import { useEffect } from 'react'

import { useAuthContext } from 'hooks/web3/useAuth'
import { CONNECTOR_STORAGE_KEY } from 'utils/constants'

const useEagerConnect = () => {
  const { connect } = useAuthContext()
  useEffect(() => {
    const tryLogin = (connectorName: 'injected' | 'walletconnect') => {
      setTimeout(() => connect(connectorName))
    }
    const connectorName = window?.localStorage?.getItem(CONNECTOR_STORAGE_KEY)
    if (connectorName !== 'injected' && connectorName !== 'walletconnect') return
    tryLogin(connectorName)
    // connect()
  }, [connect])
}

export default useEagerConnect
