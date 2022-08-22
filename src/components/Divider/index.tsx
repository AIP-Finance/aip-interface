import React from 'react'

import { Box } from 'theme/base'

const Divider = (props: any) => {
  return (
    <Box
      sx={{
        borderTop: '1px solid #3D424E',
      }}
      {...props}
    />
  )
}

export default Divider
