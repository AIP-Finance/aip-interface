import { ExternalProvider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'

import METAMASK_ICON_URL from 'assets/images/metamask.png'
import WALLETCONNECT_ICON_URL from 'assets/images/walletconnect.png'

import { injected, walletconnect } from './connectors'
import { CHAIN_ID, ChainId } from './constants'
import { nodes } from './getRpcUrl'
import { simpleRpcProvider } from './providers'

interface WalletInfo {
  connector?: AbstractConnector
  connectorName: 'injected' | 'walletconnect'
  name: string
  iconURL: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    connectorName: 'injected',
    name: 'Metamask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    connectorName: 'walletconnect',
    name: 'Wallet Connect',
    iconURL: WALLETCONNECT_ICON_URL,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
}

const NETWORK_NAME = {
  [ChainId.TESTNET]: 'Ropsten Test Network',
  [ChainId.MAINNET]: 'Ethereum Mainnet',
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum
  if (provider && provider.request) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${CHAIN_ID.toString(16)}`,
          },
        ],
      })
      return true
    } catch (err) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${CHAIN_ID.toString(16)}`,
              chainName: NETWORK_NAME[CHAIN_ID as ChainId],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'eth',
                decimals: 18,
              },
              rpcUrls: nodes,
              blockExplorerUrls: [`${process.env.REACT_APP_SCAN_URL}/`],
            },
          ],
        })
        return true
      } catch (error) {
        console.error('Failed to setup the network in Metamask:', error)
        return false
      }
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

function isUnwrappedRpcResult(response: unknown): response is {
  error?: string
  result?: unknown
} {
  return typeof response === 'object' && response !== null && 'jsonrpc' in response
}

export function rpcResult(response: unknown): unknown | null {
  // Some providers don’t wrap the response
  if (isUnwrappedRpcResult(response)) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result || null
  }

  return response || null
}

export const getAccountBalance = async (account: string) => {
  if (simpleRpcProvider) return simpleRpcProvider.getBalance(account)
  const provider = window.ethereum
  if (provider && provider.request) {
    try {
      return provider
        .request({
          method: 'eth_getBalance',
          params: [account, 'latest'],
        })
        .then(rpcResult)
    } catch (error) {
      console.error('Failed to get balance from Metamask:', error)
      return null
    }
  } else {
    console.error("Can't get balance from metamask because window.ethereum is undefined")
    return false
  }
}

export const registerToken = async () => {
  // better leave this undefined for default image instead of broken image url
  const provider = window.ethereum
  if (provider && provider.request) {
    const tokenAdded = await provider.request({
      method: 'wallet_watchAsset',
      params: [
        {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_TOKEN_CONTRACT,
            symbol: 'TOKEN',
            decimals: 18,
            image: `${process.env.REACT_APP_URL}/images/token_logo.png`,
          },
        },
      ],
    })
    return tokenAdded
  } else {
    console.error("Can't get balance from metamask because window.ethereum is undefined")
    return false
  }
}
