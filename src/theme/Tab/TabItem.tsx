import css from '@styled-system/css'
import styled from 'styled-components/macro'

import { Button } from 'theme/Buttons'
import { Box, Flex, Icon } from 'theme/base'
import { SxProps } from 'theme/types'

type TabItemProps = {
  active?: boolean
  inactiveHasLine?: boolean
  sx?: SxProps
}

const TabItem = styled(Button)(({ active, sx, inactiveHasLine }: TabItemProps) =>
  css({
    border: 'none',
    px: '16px',
    py: '8px',
    width: 'fit-content',
    fontWeight: '600',
    background: 'transparent',
    color: active ? 'neutral1' : 'neutral5',
    '&:hover,&:focus,&:active': {
      color: active ? 'neutral1' : 'neutral3',
    },
    borderRadius: 0,
    borderBottom: 'large',
    borderColor: active ? 'primary1' : inactiveHasLine ? 'neutral6' : 'transparent',
    ...sx,
  })
)

export default TabItem

export const TabTitle = ({
  icon,
  children,
  active,
}: {
  icon: React.ReactElement
  children?: React.ReactNode
  active: boolean
}) => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Icon color={active ? 'neutral1' : 'neutral5'}>{icon}</Icon>
      <Box
        display="inline-block"
        ml={8}
        sx={{
          fontSize: ['16px', '24px'],
          lineHeight: '24px',
        }}
      >
        {children}
      </Box>
    </Flex>
  )
}
