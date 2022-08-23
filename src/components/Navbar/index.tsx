import { LogoutCurve } from 'iconsax-react'
import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import AddressAvatar from 'components/AddressAvatar'
import Container from 'components/Container'
import Logo from 'components/Logo'
import { useAuthContext } from 'hooks/web3/useAuth'
import { Button } from 'theme/Buttons'
import Dropdown, { DropdownItem } from 'theme/Dropdown'
import { Flex, Type } from 'theme/base'
import { Box } from 'theme/base'
import { addressShorten } from 'utils/formats'

const UserFrame = ({ address }: { address: string }) => (
  <Flex alignItems="center">
    <AddressAvatar address={address} />
    <Type.Body ml={2}>{addressShorten(address)}</Type.Body>
  </Flex>
)

const Navbar = () => {
  const { account, disconnect, openModal } = useAuthContext()
  const accountRef = useRef<string>()
  useEffect(() => {
    if (accountRef.current === account) return
    accountRef.current = account
    if (account) openModal(false)
  }, [account, openModal])

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
          <Box sx={{ position: 'relative' }}>
            <Link to="/">
              <Logo />
            </Link>
            <Box
              sx={{
                position: 'absolute',
                top: '-5px',
                left: '100px',
                backgroundColor: 'primary1',
                borderRadius: '4px',
                width: '130px',
                textAlign: 'center',
              }}
            >
              <Type.BodyBold color="neutral1">In Development</Type.BodyBold>
            </Box>
          </Box>

          <Box flex="1"></Box>
          {account ? (
            <>
              <Dropdown menu={renderMenu()} buttonVariant="ghost" buttonSx={{ p: 0 }} direction="right">
                <UserFrame address={account} />
              </Dropdown>
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
