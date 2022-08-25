import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PlanData } from 'entities/plan'
import { usePlanManagerContract } from 'hooks/web3/useContract'
import { getPlanData } from 'utils/plan'

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
    <div>
      PlanDetails
      {!!plan && <History plan={plan} />}
    </div>
  )
}

export default PlanDetails
