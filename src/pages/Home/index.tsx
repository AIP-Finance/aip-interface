import React from 'react'

import FAQContainer from 'components/FAQContainer'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { Box } from 'theme/base'

import HeroCard from './HeroCard'
import HowCard from './HowCard'

const Home = () => {
  return (
    <Box
      sx={{
        background: 'url(images/bg.png)',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <DefaultLayout>
        <HeroCard />

        {/*<CardWrapper mt={98} title={'Create  your own Auto-Invest Plan'}>*/}
        {/*  <ProductList />*/}
        {/*</CardWrapper>*/}

        <HowCard />

        <FAQContainer />

        {/*<CardWrapper title={'How to join?'}>*/}
        {/*  <Box py={2}>*/}
        {/*    <Link to={ROUTES.PLAN_CREATE.path}>*/}
        {/*      <Button variant="outlineDanger">PLAN_CREATE</Button>*/}
        {/*    </Link>*/}
        {/*  </Box>*/}
        {/*  <Box py={2}>*/}
        {/*    <Link to={ROUTES.PLAN_MANAGEMENT.path}>*/}
        {/*      <Button variant="outlineDanger">PLAN_MANAGEMENT</Button>*/}
        {/*    </Link>*/}
        {/*  </Box>*/}
        {/*</CardWrapper>*/}
      </DefaultLayout>
    </Box>
  )
}

export default Home
