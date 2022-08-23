import NotFoundComponent from 'components/NotFound'
import { Flex } from 'theme/base'

const NotFound = () => {
  return (
    <Flex
      sx={{
        // position: 'absolute',
        width: '100%',
        height: ['calc(100vh - 414px - 64px)', 'calc(100vh - 302px - 64px)', 'calc(100vh - 220px - 64px)'],
      }}
      alignItems="center"
      justifyContent="center"
    >
      <NotFoundComponent />
    </Flex>
  )
}

export default NotFound
