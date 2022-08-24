import { parseUnits } from '@ethersproject/units'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import ToastBody from 'components/ToastBody'
import { MIN_PARSE_ETHER } from 'utils/constants'
import { getContractErrorData } from 'utils/errorHandler'

import { useERC20Contract } from './useContract'
import usePollCheckingConfirmations from './usePollCheckingConfirmations'

const useERC20Approval = (account: string, contract?: string, spender?: string, decimals = 18) => {
  const [approving, setApproving] = useState(false)
  const pollCheckingConfirmations = usePollCheckingConfirmations()
  const erc20Contract = useERC20Contract(contract, true)

  const loadAllowance = useCallback(async () => {
    if (!erc20Contract || !account) return
    try {
      const amount = await erc20Contract.allowance(account, spender)
      return amount
    } catch (err) {
      //
    }
  }, [account, spender, erc20Contract])

  const isTokenAllowanceEnough = useCallback(
    async (amount?: number) => {
      if (!amount || amount < MIN_PARSE_ETHER) return true
      const allowance = await loadAllowance()
      if (!allowance) return false
      return allowance.gte(parseUnits(amount.toString(), decimals))
    },
    [decimals, loadAllowance]
  )

  const handleResult = useCallback(
    async (func: () => Promise<{ hash: string }>) => {
      try {
        const result = await func()
        if (result.hash) {
          await pollCheckingConfirmations(result.hash)
          toast.success(<ToastBody title="Success" message="The approval has been succeeded" />)
          setApproving(false)
          return true
        }
        setApproving(false)
        return false
      } catch (err) {
        setApproving(false)
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

  const approveToken = useCallback(
    async (amount: number) => {
      if (!erc20Contract || !spender) return
      setApproving(true)
      return handleResult(() => erc20Contract.approve(spender, parseUnits(amount.toString(), decimals)))
    },
    [erc20Contract, handleResult, spender, decimals]
  )
  return { approving, approveToken, isTokenAllowanceEnough }
}

export default useERC20Approval
