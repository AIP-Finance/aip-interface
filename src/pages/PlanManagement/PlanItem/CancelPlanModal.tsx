import React, { useCallback, useState } from 'react'

import Divider from 'components/Divider'
import { PlanData } from 'entities/plan'
import usePlanManager from 'hooks/web3/usePlanManager'
import { Button } from 'theme/Buttons'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'
import { CHAIN_ID } from 'utils/constants'
import { formatNumber } from 'utils/formats'

const CancelPlanModal = ({ isOpen, setIsOpen, plan }: { isOpen: boolean; setIsOpen: any; plan: PlanData }) => {
  const { unsubscribe } = usePlanManager(
    plan.stableCoin?.addresses[CHAIN_ID] ?? '',
    plan.token?.addresses[CHAIN_ID] ?? ''
  )
  const [submitting, setSubmitting] = useState(false)

  const onUnsubscribe = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    console.log('plan.index', plan.index)
    const success = await unsubscribe(plan.index)
    // TODO Handle success

    console.log('success', success)
    window.location.reload()
    setSubmitting(false)
  }, [plan, unsubscribe, submitting])

  return (
    <Modal
      title="Cancel Plan"
      isOpen={isOpen}
      width="448px"
      maxWidth="448px"
      hasClose
      onDismiss={() => setIsOpen(false)}
    >
      <Box>
        <Type.Body>Cancel plan and receive your assets</Type.Body>
        <Flex mt={3} justifyContent="space-between" alignItems="center">
          <Type.Body>Total {plan.token?.symbol}:</Type.Body>
          <Type.BodyBold>
            {formatNumber(plan.tokenAmount - plan.claimedTokenAmount, 4, 4)} {plan.token?.symbol}
          </Type.BodyBold>
        </Flex>
        <Flex mt={3} justifyContent="space-between" alignItems="center">
          <Type.Body>Total {plan.stableCoin?.symbol}:</Type.Body>
          <Type.BodyBold>
            {formatNumber(plan.tickAmount * plan.remainingTicks, 2, 2)} {plan.stableCoin?.symbol}
          </Type.BodyBold>
        </Flex>
        <Divider mt={3} />
        <Button
          type="submit"
          variant="outlinePrimary"
          size="lg"
          px={4}
          block
          mr={3}
          onClick={onUnsubscribe}
          disabled={submitting}
          isLoading={submitting}
        >
          Confirm Cancel
        </Button>
      </Box>
    </Modal>
  )
}

export default CancelPlanModal
