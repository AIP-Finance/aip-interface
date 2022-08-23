import React, { ReactNode } from 'react'

import { Box, Image, Type } from 'theme/base'

import { CornerIcon } from '../Icon'

const CardWrapper = ({
  children,
  title,
  sx,
  hasImage = true,
  ...props
}: { children: ReactNode; title: string; hasImage?: boolean } & any) => {
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
        border: 'small',
        borderColor: 'primary3',
        borderRadius: '4px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.7,
          bg: 'neutral2',
          backdropFilter: 'blur(100px)',
          zIndex: 1,
          borderRadius: '4px',
        }}
      />
      {hasImage && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            right: 0,
          }}
          textAlign="center"
          pt={'4px'}
        >
          <Image src={`/images/arrow_down.svg`} height="100%" />
        </Box>
      )}
      <Box
        sx={{
          position: 'absolute',
          zIndex: 2,
          top: '4px',
          right: '4px',
        }}
      >
        <CornerIcon />
      </Box>
      <Box sx={{ zIndex: 2, position: 'relative' }}>
        <Box mb={18}>
          <Type.H5>{title}</Type.H5>
        </Box>
        {children}
      </Box>
    </Box>
  )
}

export default CardWrapper
