import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import ToastBody from 'components/ToastBody'
import { useUSDTContract } from 'hooks/web3/useContract'
import { getContractErrorData } from 'utils/errorHandler'
import { getStableCoinAddress } from 'utils/tokens'

const useUSDT = (account: string) => {
  const [mintable, setMintable] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const usdtContract = useUSDTContract(getStableCoinAddress('USDT'), true)
  const accountRef = useRef<string>()
  useEffect(() => {
    if (!account || !usdtContract) return
    if (accountRef.current === account) return
    accountRef.current = account
    const load = async () => {
      try {
        await usdtContract.callStatic.mint()
        setMintable(true)
      } catch (err) {}
    }
    load()
  }, [account, usdtContract])
  const mint = useCallback(async () => {
    if (!usdtContract) return
    setSubmitting(true)
    try {
      const tx = await usdtContract.mint()
      const receipt = await tx.wait()
      if (receipt.status > 0) {
        setMintable(false)
        toast.success(<ToastBody title="Success" message="TestUSDT has been transfered to your wallet" />)
      } else if (receipt.status === 0) {
        toast.error(<ToastBody title="Error" message="Transaction failed. Please try again" />)
      }
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      if (err.data || err.error) {
        const errorData = getContractErrorData(err.error ? err.error : err)
        toast.error(<ToastBody title={errorData.name} message={errorData.message} />)
      } else {
        toast.error(<ToastBody title={err.name} message={err.message} />)
      }
    }
  }, [usdtContract])
  return { mintable, submitting, mint }
}

export default useUSDT
