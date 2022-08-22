import React from 'react'

import { PlanData } from 'apis/plan'
import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { Box } from 'theme/base'
import ROUTES from 'utils/routes'

import PlanItem from './PlanItem'
import Tabs from './Tabs'

const plan: PlanData = {
  tokenName: 'Binance',
  startTime: 'Mon Aug 22 2022 13:56:09 GMT+0700',
  amount: 1,
  frequency: 2,
  period: 10,
  tokenAmount: 4,
  status: 'live',
  periodRemaining: 4,
  amountRemaining: 200,
}

const PlanCreate = () => {
  return (
    <DefaultLayout>
      <Container sx={{ background: '#23262F' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'Plan Management' }]} />
      </Container>
      <Box>
        <Tabs active={0} />
        <PlanItem plan={plan} />
      </Box>
    </DefaultLayout>
  )
}

export default PlanCreate
