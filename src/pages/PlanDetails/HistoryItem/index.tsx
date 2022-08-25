import React from 'react'

import { HistoryData } from 'entities/history'
import { PlanData } from 'entities/plan'
import { Box, Flex, Type } from 'theme/base'
import { formatNumber } from 'utils/formats'

const HistoryItem = ({ history, plan }: { history: HistoryData; plan: PlanData }) => {
  return (
    <Box mb={3}>
      <Flex>
        <Box width="40%" textAlign="left">
          <Type.BodyBold color="neutral8">{history.time}</Type.BodyBold>
        </Box>
        <Box width="30%" textAlign="left">
          <Type.BodyBold color="primary1">
            {formatNumber(history.tokenAmount, 4, 4)} {plan.token?.symbol}
          </Type.BodyBold>
        </Box>
        <Box width="30%" textAlign="left">
          <Type.BodyBold color="neutral8">
            {formatNumber(history.price, 4, 4)} {`${plan.stableCoin?.symbol}/${plan.token?.symbol}`}
          </Type.BodyBold>
        </Box>
      </Flex>
    </Box>
  )
}

export default HistoryItem
