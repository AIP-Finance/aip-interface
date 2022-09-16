import { HambergerMenu } from 'iconsax-react'
import React, { ReactNode } from 'react'
import { animated, config, useTransition } from 'react-spring'

import IconButton from 'theme/Buttons/IconButton'
import { Box, Flex } from 'theme/base'

const MobileMenu = ({
  isOpen,
  children,
  onToggleMenu,
}: {
  children: ReactNode
  onToggleMenu: (e: any) => void
  isOpen: boolean
}) => {
  const fullscreenMenu = useTransition(isOpen, {
    from: {
      opacity: 0,
      transform: 'translateX(300px)',
    },
    enter: {
      opacity: 1,
      transform: 'translateX(0)',
    },
    leave: { opacity: 0, transform: 'translateX(300px)' },
    config: config.default,
  })

  return (
    <>
      <div style={{ position: 'relative', zIndex: 20 }}>
        {!isOpen && <IconButton variant="ghost" onClick={onToggleMenu} icon={<HambergerMenu />} mt={0} />}
      </div>
      {isOpen && (
        <Box
          onClick={onToggleMenu}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: 'neutral1',
            opacity: 0.5,
          }}
        ></Box>
      )}
      <div>
        {fullscreenMenu(
          (props, item) =>
            item && (
              <animated.div
                style={{
                  background: '#000',
                  position: 'fixed',
                  maxHeight: '100vh',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: 325,
                  padding: 16,
                  ...props,
                }}
              >
                <Flex alignItems="start" justifyContent="start" flexDirection="column" width="100%" height="100%">
                  {children}
                </Flex>
              </animated.div>
            )
        )}
      </div>
    </>
  )
}

export default MobileMenu
