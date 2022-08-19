import { MaxUint256 } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import ToastBody from 'components/ToastBody'
import { MIN_PARSE_ETHER } from 'utils/constants'
import { getContractErrorData } from 'utils/errorHandler'

import { useERC20Contract } from './useContract'
import usePollCheckingConfirmations from './usePollCheckingConfirmations'

const useERC20Approval = (account: string, contract?: string) => {
  const accountRef = useRef<string>()
  const [approving, setApproving] = useState(false)
  const [allowance, setAllowance] = useState(BigNumber.from(0))
  const pollCheckingConfirmations = usePollCheckingConfirmations()
  const tokenContract = useERC20Contract(process.env.REACT_APP_TOKEN_CONTRACT, true)

  const load = useCallback(() => {
    if (!tokenContract || !account) return
    const getAllowance = async () => {
      try {
        const amount = await tokenContract.allowance(account, contract)
        setAllowance(amount)
      } catch (err) {
        //
      }
    }
    getAllowance()
  }, [account, contract, tokenContract])

  useEffect(() => {
    if (account && accountRef.current !== account && tokenContract) {
      accountRef.current = account
      load()
    }
  }, [load, account, tokenContract])

  const isTokenAllowanceEnough = useCallback(
    (amount?: number) => {
      if (!amount || amount < MIN_PARSE_ETHER) return true
      return allowance.gte(parseEther(amount.toString()))
    },
    [allowance]
  )

  const handleResult = useCallback(
    async (func: () => Promise<{ hash: string }>) => {
      try {
        const result = await func()
        if (result.hash) {
          await pollCheckingConfirmations(result.hash)
          toast.success(<ToastBody title="Success" message="The approval has been succeeded" />)
          setApproving(false)
          load()
          return true
        }
        setApproving(false)
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
      return false
    },
    [load, pollCheckingConfirmations]
  )

  const approveToken = useCallback(async () => {
    if (!tokenContract || !contract) return
    setApproving(true)
    return handleResult(() => tokenContract.approve(contract, MaxUint256))
  }, [contract, handleResult, tokenContract])
  return { approving, approveToken, allowance, isTokenAllowanceEnough, load }
}

export default useERC20Approval
