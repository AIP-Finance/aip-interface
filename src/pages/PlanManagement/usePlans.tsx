import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import React, { useEffect, useRef, useState } from 'react'

import PlanManager_ABI from 'abis/PlanManager.json'
import { PlanData } from 'entities/plan'
import { useAuthContext } from 'hooks/web3/useAuth'
import { usePlanManagerContract } from 'hooks/web3/useContract'
import { multicallv2 } from 'utils/multicall'

const usePlans = () => {
  const [plans, setPlans] = useState<PlanData[]>()
  const { account } = useAuthContext()
  const planManagerContract = usePlanManagerContract(true)
  const accountRef = useRef<string>()
  useEffect(() => {
    if (!planManagerContract || !account || account == accountRef.current) return

    // const calls = [
    //   {
    //     planAddress,
    //     name: 'balanceOf',
    //     params: [insuranceAddress],
    //   },
    //   {
    //     planAddress,
    //     name: 'totalSupply',
    //     params: [],
    //   },
    // ]
    const load = async () => {
      const planIndexes = await planManagerContract.plansOf(account)
      if (planIndexes?.length > 0) {
        const calls = planIndexes.map((planIndex: BigNumber) => ({
          address: planManagerContract.address,
          name: 'getPlan',
          params: [planIndex],
        }))
        const data: PlanData[] = await multicallv2(PlanManager_ABI, calls).then((results) => {
          return results.map((result: any) => {
            return {
              stableCoinAddress: result.plan.token0,
              tokenAddress: result.plan.token1,
              startedTime: result.statistics?.startedTime?.toNumber(),
              endedTime: result.statistics?.endedTime?.toNumber(),
              lastTriggerTime: result.statistics?.lastTriggerTime?.toNumber(),
              tickAmount: formatEther(result.plan?.tickAmount),
              frequency: result.plan?.frequencyD,
              ticks: result.statistics?.ticks?.toNumber(),
              remainingTicks: result.statistics?.remainingTicks?.toNumber(),
              tokenAmount: formatEther(result.statistics?.swapAmount1),
              claimedTokenAmount: formatEther(result.statistics?.claimedAmount1),
            }
          })
        })
        setPlans(data)
      } else {
        setPlans([])
      }
    }
    load()
  }, [account, planManagerContract])
  return { plans }
}

export default usePlans
