import { ReactNode } from 'react'

import Container from 'components/Container'
import { BoxProps } from 'theme/types'

const DefaultLayout = ({ children, hbg = true, ...props }: { children: ReactNode; hbg?: boolean } & BoxProps) => {
  return (
    <Container
      pt={65}
      minHeight="calc(100vh - 150px)"
      {...props}
      sx={
        hbg && {
          background: 'url(/images/bg_main.png)',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }
      }
    >
      {children}
    </Container>
  )
}

export default DefaultLayout
