import React from 'react'

import { Box, Flex, Type } from 'theme/base'
import { TOKENS } from 'utils/tokens'

import ProductItem from '../ProductItem'

const ProductList = () => {
  return (
    <Box textAlign="center">
      <Flex mb={24}>
        <Box width="40%" textAlign="left">
          <Type.Caption color="neutral8">Product</Type.Caption>
        </Box>
        <Box width="30%" textAlign="left">
          <Type.Caption color="neutral8">Spot Price</Type.Caption>
        </Box>
        <Box width="30%" />
      </Flex>

      {TOKENS.map((token: TokenData) => (
        <ProductItem key={token.symbol} token={token} />
      ))}
    </Box>
  )
}

export default ProductList
