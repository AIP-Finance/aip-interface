import React from 'react'
import { Link } from 'react-router-dom'

import image404 from 'assets/images/404.png'
import { Button } from 'theme/Buttons'
import { Flex, Image, Type } from 'theme/base'
import routes from 'utils/routes'

const NotFound = ({ message }: { message?: React.ReactNode }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        minHeight: ['calc(100vh - 414px - 64px)', 'calc(100vh - 302px - 64px)', 'calc(100vh - 220px - 64px)'],
        p: 48,
      }}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={image404} mb={48} />
      <Type.BodyBold mb={40}>{message ? message : 'We do not support this token yet!!!'}</Type.BodyBold>
      <Button as={Link} to={routes.HOME.path} variant="outlinePrimary">
        <Type.BodyBold>Back Home</Type.BodyBold>
      </Button>
    </Flex>
  )
}

export default NotFound
