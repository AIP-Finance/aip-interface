import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navbar from 'components/Navbar'
// import { useIsDarkMode } from 'hooks/store/state/useDarkMode'
import useEagerConnect from 'hooks/web3/useEagerConnect'
import Loading from 'theme/Loading'
import { Box } from 'theme/base'
import ROUTES from 'utils/routes'

import QSReader from './QSReader'
import ScrollToTop from './ScrollToTop'

const Home = lazy(() => import('pages/Home/index'))
const PlanManagement = lazy(() => import('pages/PlanManagement/index'))

console.log(process.env.REACT_APP_TOKEN_CONTRACT)

function App() {
  // const isDarkMode = useIsDarkMode()
  useEagerConnect()

  return (
    <div>
      <Navbar />
      <Suspense
        fallback={
          <Box p={4}>
            <Loading />
          </Box>
        }
      >
        <ScrollToTop />
        <QSReader />
        <Switch>
          <Route exact path={ROUTES.HOME.path} component={Home}></Route>
          <Route exact path={ROUTES.PLAN_MANAGEMENT.path} component={PlanManagement}></Route>
        </Switch>
      </Suspense>

      <ToastContainer theme="light" limit={3} />
    </div>
  )
}

export default App
