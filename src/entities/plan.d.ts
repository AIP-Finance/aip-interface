export interface PlanData {
  index: number
  poolPlanIndex: number
  tokenAddress: string
  token?: TokenData
  stableCoin?: TokenData
  stableCoinAddress: string
  createdTime: number
  startedTime: number
  endedTime: number
  lastTriggerTime: number
  tickAmount: number
  frequency: number
  ticks: number
  tokenAmount: number
  withdrawnTokenAmount: number
  remainingTicks: number
}
