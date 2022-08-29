import { formatUnits } from '@ethersproject/units'

import { PlanData } from 'entities/plan'

import { getStableCoinInfo, getTokenInfo } from './tokens'

export const getPlanData = (planIndex: number, raw: any): PlanData => {
  const token: TokenData | undefined = getTokenInfo(raw.plan.token1)
  const stableCoin: TokenData | undefined = getStableCoinInfo(raw.plan.token0)

  return {
    index: planIndex,
    poolPlanIndex: raw.plan.index,
    stableCoinAddress: raw.plan.token0,
    tokenAddress: raw.plan.token1,
    token,
    stableCoin,
    createdTime: raw.plan.createdTime.toNumber(),
    startedTime: raw.statistics?.startedTime?.toNumber(),
    endedTime: raw.statistics?.endedTime?.toNumber(),
    lastTriggerTime: raw.statistics?.lastTriggerTime?.toNumber(),
    tickAmount: Number(formatUnits(raw.plan?.tickAmount, stableCoin?.decimals)),
    frequency: raw.plan?.frequency,
    ticks: raw.statistics?.ticks?.toNumber(),
    remainingTicks: raw.statistics?.remainingTicks?.toNumber(),
    tokenAmount: Number(formatUnits(raw.statistics?.swapAmount1, token?.decimals)),
    claimedTokenAmount: Number(formatUnits(raw.statistics?.claimedAmount1, token?.decimals)),
  }
}
