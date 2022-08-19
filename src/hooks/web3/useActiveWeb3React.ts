import { useWeb3React } from '@web3-react/core'
import { useEffect, useRef, useState } from 'react'

import { DEFAULT_CHAIN_ID } from 'utils/constants'
import { simpleRpcProvider } from 'utils/providers'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React()
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library])

  return {
    library: provider,
    chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID ?? DEFAULT_CHAIN_ID, 10),
    ...web3React,
  }
}

export default useActiveWeb3React
