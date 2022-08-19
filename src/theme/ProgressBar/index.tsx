import React from 'react'
import styled from 'styled-components/macro'

import { Box } from 'theme/base'
import { BoxProps } from 'theme/types'

const Bar = styled(Box)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`

const Thumb = styled(Box)`
  position: absolute;
  top: 0;
  height: 100%;
`

const ProgressBar = ({
  percent,
  color,
  bg = 'neutral7',
  ...props
}: {
  percent: number
  color?: string
  bg?: string
} & BoxProps) => {
  return (
    <Bar width="100%" height={8} bg={bg} {...props}>
      <Thumb
        width={`${percent}%`}
        sx={{
          bg: color ?? undefined,
          background: !color ? 'linear-gradient(180deg, #FE5821 -20%, #FE9608 100%)' : undefined,
        }}
      />
    </Bar>
  )
}

export default ProgressBar
