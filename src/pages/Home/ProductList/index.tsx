import React from 'react'

import { Box, Flex, Type } from 'theme/base'
import { TOKENS } from 'utils/tokens'

import ProductItem from '../ProductItem'
import usePrices from './usePrices'

const ProductList = () => {
  const { prices, stableCoin } = usePrices()
  return (
    <Box textAlign="center">
      <Flex mb={24} alignItems="center">
        <Box width="40%" textAlign="left">
          <Type.Caption color="neutral8">Product</Type.Caption>
        </Box>
        <Box width="30%" textAlign="left">
          <Type.Caption color="neutral8">Pool Price</Type.Caption>
        </Box>
        <Box width="30%" />
      </Flex>

      {TOKENS.map((token: TokenData) => (
        <ProductItem key={token.symbol} token={token} price={prices[token.symbol]} stableCoin={stableCoin} />
      ))}
    </Box>
  )
}

export default ProductList
