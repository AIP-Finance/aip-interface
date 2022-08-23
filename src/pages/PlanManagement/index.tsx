import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { PlanData } from 'entities/plan'
import { Box } from 'theme/base'
import ROUTES from 'utils/routes'

import PlanItem from './PlanItem'
import Tabs from './Tabs'
import usePlans from './usePlans'

const PlanCreate = () => {
  const { plans } = usePlans()
  return (
    <DefaultLayout>
      <Container sx={{ background: 'neutral2' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'Plan Management' }]} />
      </Container>
      <Box>
        <Tabs active={0} />
        {plans?.map((plan, index) => (
          <PlanItem plan={plan} key={index} />
        ))}
        {/* <PlanItem plan={plan} /> */}
      </Box>
    </DefaultLayout>
  )
}

export default PlanCreate
