import React from 'react'

import { Box } from 'theme/base'

const Divider = (props: any) => {
  return (
    <Box
      sx={{
        borderTop: 'small',
        borderTopColor: 'neutral3',
      }}
      {...props}
    />
  )
}

export default Divider
