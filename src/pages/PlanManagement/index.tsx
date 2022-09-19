import React from 'react'

import Breadcrumb from 'components/Breadcrumb'
import DataLoading from 'components/DataLoading'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { useAuthContext } from 'hooks/web3/useAuth'
import Pagination from 'theme/Pagination'
import { Grid } from 'theme/base'
import ROUTES from 'utils/routes'

import PlanItem from './PlanItem'
import Tabs from './Tabs'
import usePlans from './usePlans'

const PlanManagement = () => {
  const { data, total, currentPage, loadPage, isLoading } = usePlans()
  const { account } = useAuthContext()

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ title: 'Home', path: ROUTES.HOME.path }, { title: 'My Plans' }]} />

      <Tabs active={0} />
      {<DataLoading data={data} isLoading={isLoading} />}
      <Grid
        sx={{ gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr'], gridAutoRows: 'auto', gap: '16px' }}
      >
        {data?.map((plan, index) =>
          plan ? <PlanItem account={account} plan={plan} key={index} /> : <div key={index}></div>
        )}
      </Grid>

      <Pagination
        totalPage={total || 0}
        onPageChange={(page) => {
          if (currentPage !== page) {
            loadPage(page)
          }
        }}
        currentPage={currentPage}
        sx={{
          mt: 66,
          justifyContent: 'center',
        }}
      />
    </DefaultLayout>
  )
}

export default PlanManagement
