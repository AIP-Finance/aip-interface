import React from 'react'

import DataLoading from 'components/DataLoading'
import { PlanData } from 'entities/plan'
import { Box, Flex, Type } from 'theme/base'

import HistoryItem from './HistoryItem'
import usePlanHistory from './usePlanHistory'

const History = ({ plan }: { plan: PlanData }) => {
  const data = usePlanHistory(plan)
  console.log('data', data)

  return (
    <>
      <Type.H5 mb={32}>History</Type.H5>

      <Box
        sx={{
          position: 'relative',
          border: '1px solid #B1E846',
          maxWidth: '843px',
          margin: 'auto',
          borderRadius: '4px',
          bg: 'modalBG',
          p: 24,
        }}
      >
        <Box textAlign="center">
          <Flex mb={24}>
            <Box width="40%" textAlign="left">
              <Type.BodyBold color="neutral8">Time</Type.BodyBold>
            </Box>
            <Box width="30%" textAlign="left">
              <Type.BodyBold color="neutral8">Amount</Type.BodyBold>
            </Box>
            <Box width="30%" textAlign="left">
              <Type.BodyBold color="neutral8">Price</Type.BodyBold>
            </Box>
          </Flex>

          {<DataLoading data={data} />}
          {data && data.map((history) => <HistoryItem key={history.time} history={history} plan={plan} />)}
        </Box>
      </Box>
    </>
  )
}

export default History
