import { More } from 'iconsax-react'
import React from 'react'

import Dropdown from 'theme/Dropdown'
import { Box, Type } from 'theme/base'

const MoreIcon = ({ onCancel }: { onCancel: any }) => {
  return (
    <Dropdown
      hasArrow={false}
      menu={
        <Box
          sx={{
            color: 'warning2',
            cursor: 'pointer',
            width: '95px',
            textAlign: 'center',
          }}
          onClick={onCancel}
        >
          <Type.Small>Cancel Plan</Type.Small>
        </Box>
      }
      menuSx={{
        bg: 'neutral1',
        border: 0,
        borderRadius: '4px',
      }}
      buttonSx={{
        border: 0,
        p: 0,
        '& > div': {
          m: 0,
          textAlign: 'center',
          mt: 'auto',
        },
        textAlign: 'center',
        verticalAlign: 'middle',
        position: 'relative',
        '&:hover,&:focus,&:active': {
          bg: 'neutral3',
        },
      }}
      direction="right"
    >
      <Box color="neutral5">
        <More />
      </Box>
    </Dropdown>
  )
}

export default MoreIcon
