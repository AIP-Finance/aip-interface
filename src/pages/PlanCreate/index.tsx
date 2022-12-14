import React from 'react'
import { useParams } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import FAQContainer from 'components/FAQContainer'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import NotFound from 'components/NotFound'
import { useAuthContext } from 'hooks/web3/useAuth'
import { CHAIN_ID } from 'utils/constants'
import ROUTES from 'utils/routes'
import { TOKENS } from 'utils/tokens'

import CreatePlanForm from './CreatePlanForm'

const PlanCreate = () => {
  const { account } = useAuthContext()

  const { slug } = useParams<{ slug: string }>()
  const token: TokenData | undefined = TOKENS.find((t) => t.addresses[CHAIN_ID] == slug)
  if (token == undefined) {
    return <NotFound />
  }

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: `Plan Create (${token.symbol})` }]} />
      <CreatePlanForm token={token} account={account} tokenAddress={slug} />
      <FAQContainer />
    </DefaultLayout>
  )
}

export default PlanCreate
