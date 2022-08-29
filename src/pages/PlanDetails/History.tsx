import { useResponsive } from 'ahooks'
import React from 'react'

import DataLoading from 'components/DataLoading'
import { PlanData } from 'entities/plan'
import { Box, Flex, Type } from 'theme/base'

import HistoryItem from './HistoryItem'
import HistoryItemMobile from './HistoryItem/HistoryItemMobile'
import usePlanHistory from './usePlanHistory'

const History = ({ plan }: { plan: PlanData }) => {
  const data = usePlanHistory(plan)
  const { md } = useResponsive()

  if (!md) {
    return (
      <>
        {<DataLoading data={data} />}
        {data && data.map((history) => <HistoryItemMobile key={history.time} history={history} plan={plan} />)}
      </>
    )
  }

  return (
    <>
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
          <Flex>
            <Box width="25%" textAlign="left">
              <Type.BodyBold color="neutral8">Time</Type.BodyBold>
            </Box>
            <Box width="25%" textAlign="left">
              <Type.BodyBold color="neutral8">Amount</Type.BodyBold>
            </Box>
            <Box width="25%" textAlign="left">
              <Type.BodyBold color="neutral8">Price</Type.BodyBold>
            </Box>
            <Box width="25%" textAlign="left">
              <Type.BodyBold color="neutral8">Fee</Type.BodyBold>
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
