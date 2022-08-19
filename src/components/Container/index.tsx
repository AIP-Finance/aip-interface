import React, { ReactNode } from 'react'

import { Box } from 'theme/base'

const Container = ({ children, sx, ...props }: { children: ReactNode } & any) => {
  return (
    <Box
      maxWidth={{ lg: 1200 }}
      px={{ _: 3, xl: 0 }}
      {...props}
      sx={{
        width: '100%',
        ml: 'auto',
        mr: 'auto',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Container
