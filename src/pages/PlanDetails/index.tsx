import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { PlanData } from 'entities/plan'
import { usePlanManagerContract } from 'hooks/web3/useContract'
import { Box, Type } from 'theme/base'
import { getPlanData } from 'utils/plan'
import ROUTES from 'utils/routes'

import History from './History'

const PlanDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [plan, setPlan] = useState<PlanData>()
  const planManagerContract = usePlanManagerContract(false)

  useEffect(() => {
    if (!planManagerContract) return
    const load = async () => {
      const result = await planManagerContract.getPlan(id)
      setPlan(getPlanData(Number(id), result))
    }
    load()
  }, [id, planManagerContract])

  return (
    <DefaultLayout>
      <Breadcrumb
        items={[
          { title: 'Home', path: ROUTES.HOME.path },
          { title: 'My Plans', path: ROUTES.PLAN_MANAGEMENT.path },
          { title: `#${id}` },
        ]}
      />

      <Type.H5 mb={32}>History</Type.H5>

      <Box>{!!plan && <History plan={plan} />}</Box>
    </DefaultLayout>
  )
}

export default PlanDetails
