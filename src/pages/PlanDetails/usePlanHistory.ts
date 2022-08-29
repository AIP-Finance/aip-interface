import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { useEffect, useState } from 'react'

import Pool_ABI from 'abis/Pool.json'
import { HistoryData } from 'entities/history'
import { PlanData } from 'entities/plan'
import { usePoolContract } from 'hooks/web3/useContract'
import { formatDate } from 'utils/formats'
import { multicallv2 } from 'utils/multicall'
import { getPoolAddress } from 'utils/pool'

interface TickInfo {
  amount0: BigNumber
  amount1: BigNumber
  fee0: BigNumber
  time: BigNumber
}

const usePlanHistory = (plan: PlanData) => {
  const [data, setData] = useState<HistoryData[]>()
  const poolContract = usePoolContract(getPoolAddress(plan.stableCoinAddress, plan.tokenAddress, plan.frequency))
  useEffect(() => {
    if (!poolContract) return
    const load = async () => {
      const poolPlan = await poolContract.plans(plan.poolPlanIndex)
      if (poolPlan) {
        const startTick = poolPlan.startTick.toNumber()
        const endTick = poolPlan.endTick.toNumber()
        const currentEndTick = endTick - plan.remainingTicks
        if (currentEndTick >= startTick) {
          const calls = Array.from({ length: currentEndTick - startTick + 1 }, (_, i) => i + startTick).map(
            (tick: number) => ({
              address: poolContract.address,
              name: 'tickInfo',
              params: [tick],
            })
          )
          const data: HistoryData[] = await multicallv2(Pool_ABI, calls).then((results: TickInfo[]) => {
            return results.map((result: TickInfo) => {
              const tokenAmountBN = result.amount1
                .mul(parseUnits(plan.tickAmount.toString(), plan.stableCoin?.decimals))
                .div(result.amount0)
              const tokenAmount = Number(formatUnits(tokenAmountBN, plan.token?.decimals))
              const feeBN = result.fee0
                .mul(parseUnits(plan.tickAmount.toString(), plan.stableCoin?.decimals))
                .div(result.amount0)
              const fee = Number(formatUnits(feeBN, plan.stableCoin?.decimals))
              const time = formatDate(result.time.toNumber())
              return {
                time,
                tokenAmount,
                price: (plan.tickAmount - fee) / tokenAmount,
                fee,
              }
            })
          })
          setData(data)
          return
        }
      }
      setData([])
    }
    load()
  }, [plan, poolContract])
  return data
}

export default usePlanHistory
