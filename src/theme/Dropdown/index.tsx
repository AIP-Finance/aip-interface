/* eslint-disable react/display-name */
import css, { SystemStyleObject } from '@styled-system/css'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react'
import { TickCircle } from 'iconsax-react'
import { ReactNode, useCallback, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import styled from 'styled-components/macro'
import { GridProps, LayoutProps } from 'styled-system'

import { Button } from 'theme/Buttons'
import { Box, Flex, Icon, Type } from 'theme/base'
import { BoxProps } from 'theme/types'

type Direction = 'left' | 'right'

type DropdownProps = {
  children: ReactNode
  menu: ReactNode
  menuSx?: SystemStyleObject & GridProps
  disabled?: boolean
  hasArrow?: boolean
  hoveringMode?: boolean
  dismissable?: boolean
  button?: any
  sx?: SystemStyleObject & GridProps
  buttonSx?: SystemStyleObject & GridProps
  buttonVariant?: string
  direction?: Direction
  handleScroll?: (e: any) => void
}
const ToggleButton = styled(Button)(({ sx }: { sx: SystemStyleObject & GridProps }) =>
  css({
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'inherit',
    // bg: 'transparent',
    // border: 'normal',
    // borderColor: 'neutral5',
    // color: 'neutral1',
    py: '6px',
    px: '14px',
    lineHeight: 'inherit',
    borderRadius: 'md',
    // '&:hover:not([disabled])': {
    //   borderColor: 'neutral4',
    // },
    // '&[disabled]': {
    //   bg: 'transparent !important',
    //   borderColor: 'neutral7',
    //   color: 'neutral4',
    //   cursor: 'not-allowed',
    // },
    ...sx,
  })
)

const Menu = styled(Box)<BoxProps & { direction: Direction }>(
  ({ sx, direction }: { direction: Direction } & BoxProps) =>
    css({
      position: 'absolute',
      top: '4px',
      left: direction === 'left' ? 0 : 'auto',
      right: direction === 'right' ? 0 : 'auto',
      minWidth: '120px',
      borderRadius: 'md',
      bg: '#fff',
      padding: 2,
      zIndex: 100,
      boxShadow: '0px 4px 20px rgba(50, 50, 50, 0.06)',
      border: 'small',
      borderColor: 'neutral6',
      ...sx,
    })
)

const Dropdown: React.FC<LayoutProps & DropdownProps> = ({
  children,
  menu,
  disabled,
  hoveringMode = false,
  hasArrow = true,
  dismissable = true,
  handleScroll,
  width,
  sx = {},
  menuSx = {},
  buttonSx = {},
  buttonVariant = 'outline',
  direction = 'left',
}: DropdownProps & LayoutProps) => {
  const [showing, show] = useState(false)
  const toggleDropdown = useCallback(
    (e) => {
      e.stopPropagation()
      show((isShown) => !isShown)
    },
    [show]
  )

  return (
    <OutsideClickHandler onOutsideClick={() => show(false)}>
      <Flex
        onClick={() => dismissable && !hoveringMode && show(false)}
        onMouseEnter={() => hoveringMode && show(true)}
        onMouseLeave={() => hoveringMode && show(false)}
        flexDirection="column"
        width="fit-content"
        sx={{ position: 'relative', ...sx }}
      >
        <ToggleButton
          variant={buttonVariant}
          type="button"
          disabled={disabled}
          onClick={(e: any) => !hoveringMode && toggleDropdown(e)}
          //   onMouseEnter={() => isHovered && setIsOverButton(true)}
          //   onMouseLeave={() => isHovered && setIsOverButton(false)}
          width={width}
          sx={{
            borderRadius: 'sm',
            ...buttonSx,
          }}
        >
          <Type.CaptionBold flex="1 1 auto" textAlign="left">
            {children}
          </Type.CaptionBold>
          {hasArrow && (
            <Icon color="primary1" ml={2}>
              {showing ? <ArrowUp2 size={24} variant="Bold" /> : <ArrowDown2 size={24} variant="Bold" />}
            </Icon>
          )}
        </ToggleButton>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {showing && (
            <>
              <Box sx={{ height: '4px', position: 'absolute', top: 0, width: '100%' }} />
              <Menu
                //   onMouseEnter={() => isHovered && setIsOverList(true)}
                //   onMouseLeave={() => isHovered && setIsOverList(false)}
                width={width}
                sx={{ ...menuSx }}
                direction={direction}
                {...(!!handleScroll && { onScroll: handleScroll })}
              >
                {menu}
              </Menu>
            </>
          )}
        </Box>
      </Flex>
    </OutsideClickHandler>
  )
}

export const DropdownItem = styled(Button)(
  css({
    maxWidth: '100%',
    height: 'auto',
    p: 2,
    width: '100%',
    textAlign: 'left',
    borderRadius: 'sm',
    border: 'none',
    fontWeight: 'normal',
    lineHeight: '24px',
    color: 'neutral1',
    bg: 'transparent',
    '&:hover': {
      bg: 'neutral7',
    },
  })
)

export const CheckableDropdownItem = ({
  onClick,
  selected,
  text,
  iconSx,
  iconSize,
  textSx,
}: {
  onClick: any
  selected: boolean
  text: React.ReactNode
  iconSx?: SystemStyleObject & GridProps
  textSx?: SystemStyleObject & GridProps
  iconSize?: number
}) => {
  return (
    <DropdownItem onClick={onClick}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box fontWeight="500" color={selected ? 'inherit' : 'neutral4'} sx={{ ...textSx }}>
          {text}
        </Box>
        {selected && (
          <Icon color="primary1" ml={2} sx={{ ...iconSx }}>
            <TickCircle size={iconSize || 16} />
          </Icon>
        )}
      </Flex>
    </DropdownItem>
  )
}

export default Dropdown
