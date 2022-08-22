import React, { ReactNode } from 'react'

import { Box, Image, Type } from 'theme/base'

const CardWrapper = ({ children, title, sx, ...props }: { children: ReactNode; title: string } & any) => {
  return (
    <Box
      maxWidth={{ lg: 1200 }}
      px={32}
      py={28}
      {...props}
      sx={{
        position: 'relative',
        width: '100%',
        ml: 'auto',
        mr: 'auto',
        ...sx,
        border: '1px solid rgba(112, 156, 107, 0.2)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        textAlign="center"
        pt={'4px'}
      >
        <Image src={`/images/arrow_down.svg`} height="100%" />
      </Box>
      <Box>
        <Type.H5>{title}</Type.H5>
      </Box>
      {children}
    </Box>
  )
}

export default CardWrapper
