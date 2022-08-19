import { ReactNode } from 'react'

import Container from 'components/Container'
import { BoxProps } from 'theme/types'

const DefaultLayout = ({ children, ...props }: { children: ReactNode } & BoxProps) => {
  return (
    <Container pt={65} minHeight="calc(100vh - 150px)" {...props}>
      {children}
    </Container>
  )
}

export default DefaultLayout
