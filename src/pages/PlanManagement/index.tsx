import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import Container from 'components/Container'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { Box, Grid } from 'theme/base'
import ROUTES from 'utils/routes'

import PlanItem from './PlanItem'
import Tabs from './Tabs'
import usePlans from './usePlans'

const PlanManagement = () => {
  const { data } = usePlans()
  return (
    <DefaultLayout>
      <Container sx={{ background: 'neutral2' }}>
        <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'Plan Management' }]} />
      </Container>
      <Box>
        <Tabs active={0} />
        <Grid
          sx={{ gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr'], gridAutoRows: 'auto', gap: '16px' }}
        >
          {data?.map((plan, index) => (plan ? <PlanItem plan={plan} key={index} /> : <div key={index}></div>))}
        </Grid>
        {/* <PlanItem plan={plan} /> */}
      </Box>
    </DefaultLayout>
  )
}

export default PlanManagement
