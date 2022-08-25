import React from 'react'

import CardWrapper from 'components/CardWrapper'
import FAQContainer from 'components/FAQContainer'
import DefaultLayout from 'components/Layouts/DefaultLayout'
import { Box } from 'theme/base'

import HeroCard from './HeroCard'
import HowCard from './HowCard'
import ProductList from './ProductList'

const Home = () => {
  return (
    <Box
      sx={{
        background: 'url(/images/bg.png)',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <DefaultLayout hbg={false}>
        <HeroCard />

        <CardWrapper mt={98} title={'Create your own Auto-Invest Plan'}>
          <ProductList />
        </CardWrapper>

        <HowCard />

        <FAQContainer />
      </DefaultLayout>
    </Box>
  )
}

export default Home
