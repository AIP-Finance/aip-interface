import React from 'react'

import { HistoryData } from 'entities/history'
import { PlanData } from 'entities/plan'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/formats'

const HistoryItemMobile = ({ history, plan }: { history: HistoryData; plan: PlanData }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid #B1E846',
        maxWidth: '843px',
        margin: 'auto',
        borderRadius: '4px',
        bg: 'modalBG',
        p: 24,
        my: 2,
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Type.BodyBold color="neutral8">Time</Type.BodyBold>
        <Type.Body color="neutral8">{history.time}</Type.Body>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={10}>
        <Type.BodyBold color="neutral8">Amount</Type.BodyBold>
        <Type.Body color="primary1">
          {formatNumber(history.tokenAmount, 4, 4)} {plan.token?.symbol}
        </Type.Body>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={10}>
        <Type.BodyBold color="neutral8">Price</Type.BodyBold>
        <Type.Body color="neutral8">
          {formatNumber(history.price, 4, 4)} {`${plan.stableCoin?.symbol}/${plan.token?.symbol}`}
        </Type.Body>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt={10}>
        <Type.BodyBold color="neutral8">Fee</Type.BodyBold>
        <Type.Body color="neutral8">
          {formatNumber(history.tokenAmount, 4, 4)} {plan.stableCoin?.symbol}
        </Type.Body>
      </Flex>
    </Box>
  )
}

export default HistoryItemMobile
