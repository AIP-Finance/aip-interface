import { Web3Provider } from '@ethersproject/providers'
import '@reach/dialog/styles.css'
import { Web3ReactProvider } from '@web3-react/core'
import { LanguageProvider } from 'i18n'
import 'rc-slider/assets/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
// eslint-disable-next-line no-restricted-imports
import 'react-toastify/dist/ReactToastify.css'
import reportWebVitals from 'reportWebVitals'
import ThemeProvider from 'theme'

import { GLOBAL_INITIAL_STATE, GlobalStoreProvider } from 'hooks/store/useGlobalStore'
import { LOCAL_INITIAL_STATE, LocalStoreProvider } from 'hooks/store/useLocalStore'
import { AuthProvider } from 'hooks/web3/useAuth'
// import createMirageServer from 'mirage'
import App from 'pages/App'
// import DarkModeUpdater from 'pages/DarkModeUpdater'
import ThemedGlobalStyle from 'theme/styles'

// function Updaters() {
//   return (
//     <>
//       <DarkModeUpdater />
//     </>
//   )
// }
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
    },
  },
})

function getLibrary(provider?: any) {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  )
  library.pollingInterval = 5_000
  return library
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ThemeProvider>
      <AuthProvider>
        <GlobalStoreProvider initialState={GLOBAL_INITIAL_STATE}>
          <LocalStoreProvider initialState={LOCAL_INITIAL_STATE}>
            <QueryClientProvider client={queryClient}>
              {/* <Updaters /> */}

              <ThemedGlobalStyle />
              <BrowserRouter>
                <LanguageProvider>
                  <App />
                </LanguageProvider>
              </BrowserRouter>
            </QueryClientProvider>
          </LocalStoreProvider>
        </GlobalStoreProvider>
      </AuthProvider>
    </ThemeProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
