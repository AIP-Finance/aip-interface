import React, { useCallback, useState } from 'react'

import Divider from 'components/Divider'
import { PlanData } from 'entities/plan'
import usePlanManager from 'hooks/web3/usePlanManager'
import { Button } from 'theme/Buttons'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'
import { CHAIN_ID } from 'utils/constants'
import { formatNumber } from 'utils/formats'

const WithdrawPlanModal = ({ isOpen, setIsOpen, plan }: { plan: PlanData } & any) => {
  const { withdraw } = usePlanManager(plan.stableCoin?.addresses[CHAIN_ID], plan.token?.addresses[CHAIN_ID])

  const [submitting, setSubmitting] = useState(false)

  const onSubmit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    const success = await withdraw(plan.index)
    // TODO Handle success
    console.log('success', success)
    setSubmitting(false)
  }, [plan, withdraw, submitting])

  return (
    <Modal
      title="Withdraw Assets"
      isOpen={isOpen}
      width="448px"
      maxWidth="448px"
      hasClose
      onDismiss={() => setIsOpen(false)}
    >
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Type.Body>Total invested:</Type.Body>
          <Type.BodyBold>
            {formatNumber(plan.tokenAmount, 4, 4)} {plan.token?.symbol}
          </Type.BodyBold>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Type.Body color={'neutral8'}>Remaining Withdrawal:</Type.Body>
          <Type.BodyBold color={'primary1'}>
            {formatNumber(plan.tokenAmount - plan.claimedTokenAmount, 4, 4)} {plan.token?.symbol}
          </Type.BodyBold>
        </Flex>

        <Divider my={3} />
        <Button
          type="submit"
          variant="outlinePrimary"
          size="lg"
          px={4}
          block
          mr={3}
          isLoading={submitting}
          disabled={submitting}
          onClick={onSubmit}
        >
          Confirm Withdraw
        </Button>
      </Box>
    </Modal>
  )
}

export default WithdrawPlanModal
