import { formatUnits } from '@ethersproject/units'
import React, { useMemo, useState } from 'react'

import Divider from 'components/Divider'
import { PlanData } from 'entities/plan'
import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { formatDate, formatNumber } from 'utils/formats'
import { getStableCoinInfo, getTokenInfo } from 'utils/tokens'

import CancelPlanModal from './CancelPlanModal'
import ExtendPlanModal from './ExtendPlanModal'
import MoreIcon from './MoreIcon'
import Progress from './Progress'
import WithdrawPlanModal from './WithdrawPlanModal'

const PlanItem = ({ plan }: { plan: PlanData }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const stableCoin = useMemo(() => getStableCoinInfo(plan.stableCoinAddress), [plan])
  const token = useMemo(() => getTokenInfo(plan.tokenAddress), [plan])
  const tickAmount = useMemo(
    () => Number(formatUnits(plan.tickAmount, stableCoin?.decimals)),
    [plan.tickAmount, stableCoin?.decimals]
  )
  const tokenAmount = useMemo(
    () => Number(formatUnits(plan.tokenAmount, token?.decimals)),
    [plan.tokenAmount, token?.decimals]
  )
  const claimedTokenAmount = useMemo(
    () => Number(formatUnits(plan.claimedTokenAmount, token?.decimals)),
    [plan.claimedTokenAmount, token?.decimals]
  )

  return (
    <Box
      sx={{
        border: '1px solid #B1E846',
        margin: 'auto',
        borderRadius: '4px',
        p: '24px',
        maxWidth: '413px',
      }}
    >
      <Flex justifyContent="space-between" width="100%" alignItems="center" mb="8px">
        <Type.Large color={'neutral8'}>
          {token?.name} ({token?.symbol})
        </Type.Large>
        <MoreIcon onCancel={() => setIsCancelModalOpen(true)} />
      </Flex>
      <Flex justifyContent="space-between" width="100%" alignItems="center">
        {plan.lastTriggerTime < plan.endedTime ? (
          <Type.SmallBold color="primary1">
            Ongoing ({plan.ticks - plan.remainingTicks} / {plan.ticks})
          </Type.SmallBold>
        ) : (
          <Type.SmallBold color="neutral6">
            Ended ({plan.ticks - plan.remainingTicks} / {plan.ticks})
          </Type.SmallBold>
        )}
        <Type.SmallBold color="neutral4">
          APP: {formatNumber(tickAmount, 2, 2)} {token?.symbol}
        </Type.SmallBold>
      </Flex>

      <Progress max={plan.ticks} value={plan.ticks - plan.remainingTicks} />

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Total Invested:</Type.Body>
        <Type.BodyBold>
          {formatNumber(tokenAmount, 4, 4)} {token?.symbol}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Remaining Deposit:</Type.Body>
        <Type.BodyBold>
          {formatNumber(tickAmount * plan.remainingTicks, 2, 2)} {stableCoin?.symbol}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Remaining Withdrawal:</Type.Body>
        <Type.BodyBold>
          {formatNumber(tokenAmount - claimedTokenAmount, 4, 4)} {token?.symbol}
        </Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Start from:</Type.Body>
        <Type.BodyBold>{plan.startedTime ? formatDate(plan.startedTime) : 'Not run yet'}</Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>To:</Type.Body>
        <Type.BodyBold>{plan.endedTime ? formatDate(plan.endedTime) : '-'}</Type.BodyBold>
      </Flex>

      <Divider my={3} />

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

      {isCancelModalOpen && <CancelPlanModal isOpen={isCancelModalOpen} setIsOpen={setIsCancelModalOpen} plan={plan} />}
      {isExtendModalOpen && <ExtendPlanModal isOpen={isExtendModalOpen} setIsOpen={setIsExtendModalOpen} plan={plan} />}
      {isWithdrawModalOpen && (
        <WithdrawPlanModal isOpen={isWithdrawModalOpen} setIsOpen={setIsWithdrawModalOpen} plan={plan} />
      )}
    </Box>
  )
}

export default PlanItem
