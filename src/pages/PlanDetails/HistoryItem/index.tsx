import React from 'react'

import { HistoryData } from 'entities/history'
import { PlanData } from 'entities/plan'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/formats'

const HistoryItem = ({ history, plan }: { history: HistoryData; plan: PlanData }) => {
  return (
    <Box mt={28}>
      <Flex>
        <Box width="25%" textAlign="left">
          <Type.Body color="neutral8">{history.time}</Type.Body>
        </Box>
        <Box width="25%" textAlign="left">
          <Type.Body color="primary1">
            {formatNumber(history.tokenAmount, 4, 4)} {plan.token?.symbol}
          </Type.Body>
        </Box>
        <Box width="25%" textAlign="left">
          <Type.Body color="neutral8">
            {formatNumber(history.price, 4, 4)} {`${plan.stableCoin?.symbol}/${plan.token?.symbol}`}
          </Type.Body>
        </Box>
        <Box width="25%" textAlign="left">
          <Type.Body color="neutral8">
            {formatNumber(history.fee, 4, 4)} {plan.stableCoin?.symbol}
          </Type.Body>
        </Box>
      </Flex>
    </Box>
  )
}

export default HistoryItem
