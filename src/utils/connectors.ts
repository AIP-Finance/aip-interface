import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { CHAIN_ID } from './constants'
import getNodeUrl from './getRpcUrl'

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [CHAIN_ID],
  rpc: {
    [CHAIN_ID]: getNodeUrl() ?? '',
  },
  qrcode: true,
})

export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID],
})

const connectors = { walletconnect, injected }

export default connectors
