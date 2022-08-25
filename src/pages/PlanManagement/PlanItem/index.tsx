import React, { useState } from 'react'

import Divider from 'components/Divider'
import { PlanData } from 'entities/plan'
import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { PlanStatus } from 'utils/constants'
import { formatDate, formatNumber } from 'utils/formats'
import { getPlanStatus } from 'utils/func'
import { durationCalculated } from 'utils/parsers'

import CancelPlanModal from './CancelPlanModal'
import ExtendPlanModal from './ExtendPlanModal'
import MoreIcon from './MoreIcon'
import Progress from './Progress'
import RenderPlanStatus from './RenderPlanStatus'
import WithdrawPlanModal from './WithdrawPlanModal'

const PlanItem = ({ account, plan }: { account: string; plan: PlanData }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const planStatus = getPlanStatus(plan)

  return (
    <Box
      sx={{
        border: '1px solid #B1E846',
        margin: 'auto',
        borderRadius: '4px',
        p: '24px',
        width: '100%',
      }}
    >
      <Flex justifyContent="space-between" width="100%" alignItems="center" mb={1}>
        <Type.Large color={'neutral8'}>
          {plan.token?.name} ({plan.token?.symbol}) #{plan.index}
        </Type.Large>
        {planStatus != PlanStatus.ENDED && <MoreIcon onCancel={() => setIsCancelModalOpen(true)} />}
      </Flex>
      <Box mb={2}>
        <Type.Small color="neutral4">
          Invest {formatNumber(plan.tickAmount, 2, 2)} {plan.stableCoin?.symbol}{' '}
          {plan.frequency > 1 ? `every ${plan.frequency} days` : 'daily'}
        </Type.Small>
      </Box>
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        <RenderPlanStatus plan={plan} />
      </Flex>

      <Progress max={plan.ticks} value={plan.ticks - plan.remainingTicks} />

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Total Invested:</Type.Body>
        <Type.BodyBold>
          {formatNumber(plan.tokenAmount, 4, 4)} {plan.token?.symbol}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Remaining Deposit:</Type.Body>
        <Type.BodyBold>
          {formatNumber(plan.tickAmount * plan.remainingTicks, 2, 2)} {plan.stableCoin?.symbol}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Remaining Withdrawal:</Type.Body>
        <Type.BodyBold>
          {formatNumber(plan.tokenAmount - plan.claimedTokenAmount, 4, 4)} {plan.token?.symbol}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Start from:</Type.Body>
        <Type.BodyBold>
          {plan.startedTime
            ? formatDate(plan.startedTime)
            : durationCalculated({ timestamp: plan.createdTime, period: 0 })}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>To:</Type.Body>
        <Type.BodyBold>
          {plan.startedTime
            ? formatDate(plan.endedTime)
            : durationCalculated({ timestamp: plan.createdTime, period: plan.frequency * plan.ticks })}
        </Type.BodyBold>
      </Flex>

      <Divider my={3} />

      {planStatus != PlanStatus.ENDED ? (
        <Flex justifyContent="space-between" width={'100%'} alignItems="center">
          <Button
            type="submit"
            variant="outlinePrimary"
            size="lg"
            px={4}
            block
            mr={3}
            onClick={() => setIsExtendModalOpen(true)}
          >
            {'Extend'}
          </Button>
          <Button type="submit" variant="outline" size="lg" px={4} block onClick={() => setIsWithdrawModalOpen(true)}>
            {'Withdraw'}
          </Button>
        </Flex>
      ) : (
        <Box height={50} />
      )}

      {isCancelModalOpen && <CancelPlanModal isOpen={isCancelModalOpen} setIsOpen={setIsCancelModalOpen} plan={plan} />}
      {isExtendModalOpen && (
        <ExtendPlanModal isOpen={isExtendModalOpen} setIsOpen={setIsExtendModalOpen} plan={plan} account={account} />
      )}
      {isWithdrawModalOpen && (
        <WithdrawPlanModal isOpen={isWithdrawModalOpen} setIsOpen={setIsWithdrawModalOpen} plan={plan} />
      )}
    </Box>
  )
}

export default PlanItem
