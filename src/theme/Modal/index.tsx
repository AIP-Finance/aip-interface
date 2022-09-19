import { DialogContent, DialogOverlay } from '@reach/dialog'
import { CloseCircle } from 'iconsax-react'
import React, { useCallback } from 'react'
import { animated, useSpring, useTransition } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled, { DefaultTheme, css } from 'styled-components/macro'

import useIsMobile from 'hooks/helpers/useIsMobile'
import IconButton from 'theme/Buttons/IconButton'
import { Box, Flex, Icon, Type } from 'theme/base'

const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 9998;
    background-color: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.modalBG};
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element

// eslint-disable-next-line
const StyledDialogContent = styled(({ minHeight, maxHeight, maxWidth, mobile, isOpen, mode, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: visible;
  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    position: relative;
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral1};
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.neutral2};
    box-shadow: ${({ theme }: { theme: DefaultTheme }) => theme.shadows[4]};
    width: ${({ width }) => width ?? '50vw'};
    padding: 0;
    align-self: ${({ mobile, mode }) => (mobile && mode === 'bottom' ? 'flex-end' : 'center')};
    ${({ maxWidth }) => css`
      max-width: ${maxWidth || '420px'};
    `}
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight};
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight};
      `}
    display: flex;
    border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.borderRadius.sm};
    ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 65vw;
    `}
    ${({ theme, mobile, mode }) => theme.mediaWidth.upToSmall`
    width:  90vw;
      ${
        !!mobile &&
        css`
          width: 100vw;
          border-radius: 20px;
          ${mode === 'bottom' &&
          `
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          `}
        `
      }
    `}
  }
`

// const StyledDialogImage = styled(StyledDialogContent)`
//   &[data-reach-dialog-content] {
//     width: 100%;
//     max-width: 100%;
//     height: 100%;
//     max-height: 100%;
//     border-radius: 0;
//     div.image-container {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       width: 100%;
//       height: 100%;
//       margin: auto;
//     }
//     img {
//       object-fit: cover;
//       cursor: zoom-out;
//       max-width: 100%;
//       max-height: 100%;
//       height: auto;
//     }
//     ${({ theme, mobile }) => theme.mediaWidth.upToSmall`
//       ${
//         mobile &&
//         css`
//           border-radius: 12px;
//         `
//       }
//     `}
//   }
// `

const StyledDialogBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1 1 auto;
`

interface ModalProps {
  isOpen: boolean
  isOverflown?: boolean
  mode?: 'center' | 'bottom'
  onDismiss?: () => void
  dismissable?: boolean
  width?: string
  maxWidth?: string
  minHeight?: string | false
  maxHeight?: string
  hasClose?: boolean
  initialFocusRef?: React.RefObject<any>
  footer?: React.ReactNode
  children?: React.ReactNode
  title?: React.ReactNode
}

export default function Modal({
  isOpen,
  onDismiss,
  width,
  maxWidth,
  minHeight = false,
  dismissable = true,
  maxHeight = '90vh',
  title,
  hasClose,
  initialFocusRef,
  mode = 'center',
  footer,
  children,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const isMobile = useIsMobile()

  const onDismissRequest = useCallback(() => (onDismiss ? onDismiss() : null), [onDismiss])

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismissRequest()
      }
    },
  })

  return (
    <>
      {fadeTransition(
        (props, item) =>
          item && (
            <StyledDialogOverlay
              style={props}
              onDismiss={() => dismissable && onDismissRequest()}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                mode={mode}
                {...(isMobile && mode === 'bottom'
                  ? {
                      ...bind(),
                      style: {
                        transform: y.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`),
                      },
                    }
                  : {})}
                minHeight={minHeight}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                aria-label="dialog content"
                mobile={isMobile}
                width={width}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                <Flex flexDirection="column" width="100%">
                  {isMobile && mode === 'bottom' && (
                    <Box
                      width={80}
                      height={5}
                      sx={{ borderRadius: '100px' }}
                      bg="neutral1"
                      mx="auto"
                      mb={3}
                      mt={1}
                    ></Box>
                  )}
                  {(Boolean(title) || hasClose) && (
                    <Flex alignItems="start" justifyContent={hasClose ? 'flex-end' : 'flex-start'} py={3} px={24}>
                      {Boolean(title) && (
                        <Flex flex="1 1 auto">
                          <Type.LargeBold>{title}</Type.LargeBold>
                        </Flex>
                      )}
                      {hasClose && (
                        <IconButton
                          variant="ghost"
                          onClick={() => onDismissRequest()}
                          icon={
                            <Icon color="neutral4">
                              <CloseCircle size={24} variant="Outline" />
                            </Icon>
                          }
                          size={24}
                        />
                      )}
                    </Flex>
                  )}

                  <StyledDialogBody>{children}</StyledDialogBody>
                  {!!footer && (
                    <Flex sx={{ flex: '1 1 auto', pt: 2 }} justifyContent={'flex-end'} px={2}>
                      {footer}
                    </Flex>
                  )}
                </Flex>
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
