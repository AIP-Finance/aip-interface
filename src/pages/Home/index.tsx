import React from 'react'
import { Link } from 'react-router-dom'

import CardWrapper from 'components/CardWrapper'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { Button } from 'theme/Buttons'
import { Box, Type } from 'theme/base'

import ROUTES from '../../utils/routes'

const Home = () => {
  return (
    <DefaultLayout>
      <Type.H1>ABC</Type.H1>
      <Type.H2>ABC</Type.H2>
      <Type.H3>ABC</Type.H3>
      <Type.H4>ABC</Type.H4>
      <Type.H5>ABC</Type.H5>
      <Box py={2}>
        <Button variant="primary">Primary</Button>
      </Box>{' '}
      <Box py={2}>
        <Button variant="secondary">Primary</Button>
      </Box>{' '}
      <Box py={2}>
        <Button variant="success">Primary</Button>
      </Box>{' '}
      <Box py={2}>
        <Button variant="warning">Primary</Button>
      </Box>{' '}
      <Box py={2}>
        <Button variant="info">Primary</Button>
      </Box>{' '}
      <Box py={2}>
        <Button variant="danger">Primary</Button>
      </Box>{' '}
      <Box py={2}>
        <Button variant="outline">Primary</Button>
      </Box>{' '}
      <CardWrapper title={'How to join?'}>
        <Box py={2}>
          <Button variant="outlinePrimary">Primary</Button>
        </Box>
        <Box py={2}>
          <Link to={ROUTES.PLAN_MANAGEMENT.path}>
            <Button variant="outlineDanger">PLAN_MANAGEMENT</Button>
          </Link>
        </Box>
      </CardWrapper>
    </DefaultLayout>
  )
}

export default Home
