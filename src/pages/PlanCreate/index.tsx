import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import FAQContainer from 'components/FAQContainer'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { useAuthContext } from 'hooks/web3/useAuth'
import ROUTES from 'utils/routes'

import CreatePlanForm from './CreatePlanForm'

const PlanCreate = () => {
  const { account } = useAuthContext()
  return (
    <DefaultLayout>
      <Container sx={{ background: 'neutral2' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'Plan Create' }]} />
        {!!account && <CreatePlanForm account={account} />}
        <FAQContainer />
      </Container>
    </DefaultLayout>
  )
}

export default PlanCreate
