import { useResponsive } from 'ahooks'
import { LogoutCurve } from 'iconsax-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Container from 'components/Container'
import Logo from 'components/Logo'
import { useAuthContext } from 'hooks/web3/useAuth'
import { Button } from 'theme/Buttons'
import Dropdown, { DropdownItem } from 'theme/Dropdown'
import { Flex, Type } from 'theme/base'
import { Box } from 'theme/base'
import { CHAIN_ID } from 'utils/constants'
import { addressShorten } from 'utils/formats'
import ROUTES from 'utils/routes'

import MintUSDT from './MintUSDT'
import MobileMenu from './MobileMenu'

const UserFrame = ({ address }: { address: string }) => (
  <Flex alignItems="center">
    {/*<AddressAvatar address={address} />*/}
    <Type.BodyBold ml={2}>{addressShorten(address)}</Type.BodyBold>
  </Flex>
)

const NavbarCollapseItems = ({ account, toggleMenu }: { account: string; toggleMenu?: () => void }) => {
  return (
    <>
      {CHAIN_ID !== 1 && <MintUSDT account={account} />}

      <Link to={ROUTES.PLAN_MANAGEMENT.path}>
        <Button variant="ghost" onClick={() => toggleMenu && toggleMenu()}>
          <Type.Body>My Plans</Type.Body>
        </Button>
      </Link>
    </>
  )
}

const Navbar = () => {
  const { account, disconnect, openModal } = useAuthContext()
  const [openingMenu, setOpeningMenu] = useState(false)
  const { lg } = useResponsive()
  const accountRef = useRef<string>()

  useEffect(() => {
    if (accountRef.current === account) return
    accountRef.current = account
    if (account) openModal(false)
  }, [account, openModal])

  const toggleMenu = useCallback(() => {
    setOpeningMenu((openingMenu) => !openingMenu)
  }, [])

  const renderMenu = useCallback(() => {
    return (
      <Box>
        <DropdownItem
          onClick={() => {
            disconnect()
          }}
        >
          <Flex alignItems="center" color="warning2">
            <LogoutCurve size={24} />
            <Type.Body ml={2}>Logout</Type.Body>
          </Flex>
        </DropdownItem>
      </Box>
    )
  }, [disconnect])

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1001,
      }}
      py={12}
    >
      <Container>
        <Flex alignItems="center">
          <Box display={['block', 'flex']} justifyContent="end" sx={{ position: 'relative' }}>
            <Box as={Link} display="block" to="/" mr={2}>
              <Logo />
            </Box>
            {CHAIN_ID !== 1 && (
              <Box
                sx={{
                  position: 'relative',
                  right: 0,
                  top: ['5px', '-5px'],
                  height: 'fit-content',
                  backgroundColor: 'primary1',
                  borderRadius: '4px',
                  width: '64px',
                  textAlign: 'center',
                }}
              >
                <Type.Small color="neutral1">Testnet</Type.Small>
              </Box>
            )}
          </Box>

          <Box flex="1"></Box>

          {account ? (
            <>
              {lg && <NavbarCollapseItems account={account} />}
              <Box mr={24} color="neutral4" display={{ _: 'none', lg: 'block' }}>
                |
              </Box>
              <Dropdown
                menu={renderMenu()}
                buttonVariant="ghost"
                direction="right"
                menuSx={{
                  bg: 'neutral1',
                  border: 0,
                  borderRadius: '4px',
                }}
                buttonSx={{
                  border: 0,
                  bg: 'primary2',
                  color: 'neutral8',
                  p: 1,
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
              >
                <UserFrame address={account} />
              </Dropdown>
              {!lg && (
                <MobileMenu isOpen={openingMenu} onToggleMenu={toggleMenu}>
                  <NavbarCollapseItems account={account} toggleMenu={toggleMenu} />
                </MobileMenu>
              )}
            </>
          ) : (
            <Button
              variant="outlinePrimary"
              onClick={() => openModal(true)}
              mr={[16, 16, 16, 16, 0]}
              ml={['auto', 'auto', 'auto', 0]}
            >
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
