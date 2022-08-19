import React from 'react'
import { Redirect } from 'react-router-dom'

import { useAuthContext } from 'hooks/web3/useAuth'

const AuthedRoute = ({ children }: any) => {
  const { account } = useAuthContext()
  return account ? children : <Redirect to={'/'} />
}

export default AuthedRoute
