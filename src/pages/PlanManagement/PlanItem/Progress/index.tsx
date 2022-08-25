import React from 'react'

import { Box } from 'theme/base'

const bg = 'neutral8'

const Progress = ({ max, value }: { max: number; value: number }) => {
  return (
    <Box
      mt={3}
      sx={{
        height: '2px',
        bg,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          height: '12px',
          width: '12px',
          bg: value > 0 ? 'primary1' : bg,
          position: 'absolute',
          top: '-5px',
          left: '-3px',
          bottom: 0,
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          height: '2px',
          bg: 'primary1',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${(value * 100) / max}%`,
        }}
      />
      <Box
        sx={{
          height: '12px',
          width: '12px',
          bg: value == max && value != 0 ? 'primary1' : bg,
          position: 'absolute',
          top: '-5px',
          right: '-3px',
          bottom: 0,
          borderRadius: '50%',
        }}
      />
    </Box>
  )
}

export default Progress
