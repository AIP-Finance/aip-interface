import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import DataLoading from 'components/DataLoading'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { useAuthContext } from 'hooks/web3/useAuth'
import { Box, Grid } from 'theme/base'
import ROUTES from 'utils/routes'

import PlanItem from './PlanItem'
import Tabs from './Tabs'
import usePlans from './usePlans'

const PlanManagement = () => {
  const { data } = usePlans()
  const { account } = useAuthContext()

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'My Plans' }]} />

      <Box>
        <Tabs active={0} />
        {<DataLoading data={data} />}
        <Grid
          sx={{ gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr'], gridAutoRows: 'auto', gap: '16px' }}
        >
          {data?.map((plan, index) =>
            plan ? <PlanItem account={account} plan={plan} key={index} /> : <div key={index}></div>
          )}
        </Grid>
        {/* <PlanItem plan={plan} /> */}
      </Box>
    </DefaultLayout>
  )
}

export default PlanManagement
