import React from 'react'

import { PlanData } from 'entities/plan'

import usePlanHistory from './usePlanHistory'

const History = ({ plan }: { plan: PlanData }) => {
  const data = usePlanHistory(plan)
  console.log('data', data)
  return <div>History</div>
}

export default History
