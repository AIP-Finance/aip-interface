import React, { ReactNode } from 'react'

import { Icon } from 'theme/base'

import { Button } from '.'
import { ButtonProps } from './types'

const ButtonWithIcon = ({
  icon,
  direction = 'center',
  type = 'button',
  children,
  spacing = 2,
  sx,
  ...props
}: {
  icon: ReactNode
  spacing?: number
  direction?: 'center' | 'right'
  disabled?: boolean
  as?: any
  htmlFor?: string
} & ButtonProps) => (
  <Button
    type={type}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: direction === 'center' ? 'center' : 'space-between',
      flexDirection: direction === 'right' ? 'row-reverse' : 'row',
      ...sx,
    }}
    {...props}
  >
    <Icon mr={direction === 'center' ? spacing : 0} ml={direction === 'right' ? spacing : 0}>
      {icon}
    </Icon>
    {children}
  </Button>
)

export default ButtonWithIcon
