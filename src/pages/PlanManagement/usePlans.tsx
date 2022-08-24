import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import PlanManager_ABI from 'abis/PlanManager.json'
import { PlanData } from 'entities/plan'
import { useAuthContext } from 'hooks/web3/useAuth'
import { usePlanManagerContract } from 'hooks/web3/useContract'
import { multicallv2 } from 'utils/multicall'
import { getStableCoinInfo, getTokenInfo } from 'utils/tokens'

const LIMIT = 6

const usePlans = () => {
  const [planIndexes, setPlanIndexes] = useState<number[]>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const loadedPageRef = useRef<number[]>([])
  const [plansInfo, setPlansInfo] = useState<{ [key: number]: PlanData }>({})
  const { account } = useAuthContext()
  const planManagerContract = usePlanManagerContract(true)
  const accountRef = useRef<string>()
  const data: PlanData[] | undefined = useMemo(
    () => planIndexes?.slice((currentPage - 1) * LIMIT, currentPage * LIMIT).map((planIndex) => plansInfo[planIndex]),
    [currentPage, planIndexes, plansInfo]
  )
  const total = useMemo(() => (planIndexes ? Math.ceil(planIndexes.length / LIMIT) : null), [planIndexes])
  const loadPlansInfo = useCallback(
    async (indexes) => {
      if (!planManagerContract) return
      const calls = indexes.map((planIndex: BigNumber) => ({
        address: planManagerContract.address,
        name: 'getPlan',
        params: [planIndex],
      }))
      const data: PlanData[] = await multicallv2(PlanManager_ABI, calls).then((results) => {
        return results.map((result: any, index: number) => {
          const token: TokenData | undefined = getTokenInfo(result.plan.token1)
          const stableCoin: TokenData | undefined = getStableCoinInfo(result.plan.token0)

          return {
            index: indexes[index],
            stableCoinAddress: result.plan.token0,
            tokenAddress: result.plan.token1,
            token,
            stableCoin,
            createdTime: result.plan.createdTime.toNumber(),
            startedTime: result.statistics?.startedTime?.toNumber(),
            endedTime: result.statistics?.endedTime?.toNumber(),
            lastTriggerTime: result.statistics?.lastTriggerTime?.toNumber(),
            tickAmount: Number(formatUnits(result.plan?.tickAmount, stableCoin?.decimals)),
            frequency: result.plan?.frequencyD,
            ticks: result.statistics?.ticks?.toNumber(),
            remainingTicks: result.statistics?.remainingTicks?.toNumber(),
            tokenAmount: Number(formatUnits(result.statistics?.swapAmount1, token?.decimals)),
            claimedTokenAmount: Number(formatUnits(result.statistics?.claimedAmount1, token?.decimals)),
          }
        })
      })
      setPlansInfo((info) => ({
        ...info,
        ...data.reduce((prev, cur) => {
          prev[cur.index] = cur
          return prev
        }, {} as { [key: number]: PlanData }),
      }))
    },
    [planManagerContract]
  )
  const loadPage = useCallback(
    (page: number) => {
      if (!planIndexes || planIndexes.length < (page - 1) * LIMIT) return
      setCurrentPage(page)
      if (!loadedPageRef.current.includes(page)) {
        loadPlansInfo(planIndexes.slice((page - 1) * LIMIT, page * LIMIT))
      }
    },
    [loadPlansInfo, planIndexes]
  )
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
    const init = async () => {
      let indexes = await planManagerContract.plansOf(account)

      if (indexes?.length > 0) indexes = indexes.map((i: BigNumber) => i.toNumber()).reverse()
      console.log(indexes)
      setPlanIndexes(indexes)
      loadPlansInfo(indexes.slice(0, LIMIT))
      loadedPageRef.current.push(1)
    }
    init()
  }, [account, loadPlansInfo, planManagerContract])
  return { data, currentPage, total, loadPage }
}

export default usePlans
