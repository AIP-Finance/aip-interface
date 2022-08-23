import { BigNumber } from '@ethersproject/bignumber'

export interface PlanData {
  tokenAddress: string
  stableCoinAddress: string
  startedTime: number
  endedTime: number
  lastTriggerTime: number
  tickAmount: BigNumber
  frequency: number
  ticks: number
  tokenAmount: BigNumber
  claimedTokenAmount: BigNumber
  remainingTicks: number
}
