import { PlanData } from 'entities/plan'

import { PlanStatus } from './constants'

export const getPlanStatus = (plan: PlanData): PlanStatus => {
  //not running
  if (plan.remainingTicks == 0) return PlanStatus.ENDED
  if (!plan.lastTriggerTime) {
    return PlanStatus.NOT_RUNNING
  }
  if (plan.lastTriggerTime < plan.endedTime) {
    return PlanStatus.ON_GOING
  }
  return PlanStatus.ENDED
}
