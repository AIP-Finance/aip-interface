import React from 'react'

import { PlanData } from 'apis/plan'
import Divider from 'components/Divider'
import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { PLAN_STATUS } from 'utils/constants'
import { periodCalculated } from 'utils/parsers'

import MoreIcon from './MoreIcon'
import Progress from './Progress'

const PlanItem = ({ plan }: { plan: PlanData }) => {
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
      <Flex justifyContent="space-between" width={'100%'} alignItems="center" mb="8px">
        <Type.Large color={'neutral8'}>{plan.tokenName}</Type.Large>
        <MoreIcon onCancel={() => console.log('PlanItem onCancel')} />
      </Flex>
      {plan.status == PLAN_STATUS.live ? (
        <Type.BodyBold color="primary1">
          Ongoing ({plan.period - plan.periodRemaining} / {plan.period})
        </Type.BodyBold>
      ) : (
        <Type.BodyBold color="neutral6">
          Ended ({plan.period - plan.periodRemaining} / {plan.period})
        </Type.BodyBold>
      )}

      <Progress max={plan.period} value={plan.period - plan.periodRemaining} />

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Total Invested:</Type.Body>
        <Type.BodyBold>{plan.tokenAmount}</Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Remaining Amount:</Type.Body>
        <Type.BodyBold>{plan.amountRemaining}</Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>Start from:</Type.Body>
        <Type.BodyBold>{periodCalculated({ start: plan.startTime, period: 0 })}</Type.BodyBold>
      </Flex>

      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Type.Body>To:</Type.Body>
        <Type.BodyBold>{periodCalculated({ start: plan.startTime, period: plan.period })}</Type.BodyBold>
      </Flex>

      <Divider my={3} />

      <Flex justifyContent="space-between" width={'100%'} alignItems="center">
        <Button type="submit" variant="outlinePrimary" size="lg" px={4} block mr={3}>
          {'Extend'}
        </Button>
        <Button type="submit" variant="outline" size="lg" px={4} block>
          {'Withdraw'}
        </Button>
      </Flex>
    </Box>
  )
}

export default PlanItem
