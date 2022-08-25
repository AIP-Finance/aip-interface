import React from 'react'

import Loading from 'theme/Loading'
import { Box, Type } from 'theme/base'

const DataLoading = ({ data }: { data: any[] | undefined }) => {
  if (!data)
    return (
      <Box textAlign="center">
        <Loading />
      </Box>
    )
  if (data.length == 0) {
    return (
      <Box textAlign="center">
        <Type.Body>No data found</Type.Body>
      </Box>
    )
  }
  return <></>
}

export default DataLoading
