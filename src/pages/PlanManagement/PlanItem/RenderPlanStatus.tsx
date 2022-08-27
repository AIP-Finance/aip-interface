import React from 'react'

import { PlanData } from 'entities/plan'
import { Type } from 'theme/base'
import { PlanStatus } from 'utils/constants'
import { getPlanStatus } from 'utils/func'

const RenderPlanStatus = ({ plan }: { plan: PlanData }) => {
  const planStatus = getPlanStatus(plan)

  if (planStatus == PlanStatus.NOT_RUNNING) {
    return <Type.SmallBold color="primary2">Not Running</Type.SmallBold>
  }

  if (planStatus == PlanStatus.ON_GOING) {
    return (
      <Type.SmallBold color="primary1">
        Ongoing ({plan.ticks - plan.remainingTicks} / {plan.ticks})
      </Type.SmallBold>
    )
  }
  return (
    <Type.SmallBold color="neutral5">
      Ended ({plan.ticks - plan.remainingTicks} / {plan.ticks})
    </Type.SmallBold>
  )
}

export default RenderPlanStatus
