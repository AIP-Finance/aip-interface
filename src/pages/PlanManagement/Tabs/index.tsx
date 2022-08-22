import React from 'react'

import { Box, Flex, Type } from 'theme/base'

const Tabs = ({ active }: { active: number }) => {
  return (
    <Box mb={32}>
      <Flex justifyContent="start" width={'100%'} alignItems="center" mb="8px">
        <Box mr={32} sx={{ cursor: 'pointer' }}>
          <Type.H5 color={active == 0 ? 'neutral8' : 'neutral5'}>Plan Management</Type.H5>
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <Type.H5 color={active == 1 ? 'neutral8' : 'neutral5'}>History</Type.H5>
        </Box>
      </Flex>
    </Box>
  )
}

export default Tabs
