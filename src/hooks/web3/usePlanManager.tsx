import { parseEther } from '@ethersproject/units'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import ToastBody from 'components/ToastBody'
import { getContractErrorData } from 'utils/errorHandler'

import { usePlanManagerContract } from './useContract'
import usePollCheckingConfirmations from './usePollCheckingConfirmations'

const usePlanManager = (token0: string, token1: string) => {
  const [submitting, setSubmitting] = useState(false)
  const planManagerContract = usePlanManagerContract(true)
  const pollCheckingConfirmations = usePollCheckingConfirmations()

  const handleResult = useCallback(
    async (func: () => Promise<{ hash: string }>, successMsg?: string) => {
      try {
        const result = await func()
        if (result.hash) {
          await pollCheckingConfirmations(result.hash)
          toast.success(
            <ToastBody title="Success" message={successMsg ?? 'Transaction has been executed successfully'} />
          )
          setSubmitting(false)
          return true
        }
        setSubmitting(false)
        return false
      } catch (err) {
        setSubmitting(false)
        if (err.data || err.error) {
          const errorData = getContractErrorData(err.error ? err.error : err)
          toast.error(<ToastBody title={errorData.name} message={errorData.message} />)
        } else {
          toast.error(<ToastBody title={err.name} message={err.message} />)
        }
        return false
      }
    },
    [pollCheckingConfirmations]
  )

  const subscribe = useCallback(
    ({
      investor,
      amount,
      frequency,
      period,
    }: {
      investor: string
      amount: number
      frequency: number
      period: number
    }) => {
      if (!planManagerContract) return
      return handleResult(
        () =>
          planManagerContract.mint({
            investor,
            token0,
            token1,
            frequency,
            tickAmount: parseEther(amount.toString()),
            periods: period,
          }),
        'Create plan successful'
      )
    },
    [handleResult, planManagerContract, token0, token1]
  )
  const unsubscribe = useCallback(
    (planIndex: number) => {
      if (!planManagerContract) return
      return handleResult(() => planManagerContract.burn(planIndex), 'Cancel plan successful')
    },
    [handleResult, planManagerContract]
  )
  const extend = useCallback(
    (planIndex: number, periods: number) => {
      if (!planManagerContract) return
      return handleResult(() => planManagerContract.extend(planIndex, periods), 'Extend plan successful')
    },
    [handleResult, planManagerContract]
  )
  const withdraw = useCallback(
    (planIndex: number) => {
      if (!planManagerContract) return
      return handleResult(() => planManagerContract.withdraw(planIndex), 'Withdraw token successful')
    },
    [handleResult, planManagerContract]
  )
  return { submitting, subscribe, unsubscribe, extend, withdraw }
}

export default usePlanManager
