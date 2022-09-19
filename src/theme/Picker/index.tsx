// eslint-disable-next-line no-restricted-imports
import React, { ReactNode } from 'react'

import { Button, ButtonProps } from 'theme/Buttons'

const Picker = ({
  isActive = false,
  children,
  onClick,
  sx,
  ...props
}: { isActive: boolean; children: ReactNode; onClick: () => void } & ButtonProps) => {
  return (
    <Button
      {...props}
      type="button"
      sx={{
        borderRadius: 'sm',
        p: 16,
        bg: 'neutral8',
        border: 'small',
        borderColor: isActive ? 'primary1' : 'neutral6',
        '&:hover': { borderColor: isActive ? 'primary1' : 'neutral5' },
        ...sx,
      }}
      onClick={onClick}
      block
    >
      {children}
    </Button>
  )
}

export default Picker
