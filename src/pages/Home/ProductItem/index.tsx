import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'theme/Buttons'
import { Box, Flex, Type } from 'theme/base'
import { CHAIN_ID } from 'utils/constants'
import { formatNumber } from 'utils/formats'
import ROUTES from 'utils/routes'

const ProductItem = ({ token, price, stableCoin }: { token: TokenData; price: number; stableCoin: string }) => {
  return (
    <Box mb={3}>
      <Flex alignItems="center">
        <Box width="40%" textAlign="left">
          <Type.BodyBold color="neutral8">{`${token.name} (${token.symbol})`}</Type.BodyBold>
        </Box>
        <Box width="30%" textAlign="left">
          <Type.BodyBold color="primary1">
            {formatNumber(price, 2, 2)} {stableCoin}
          </Type.BodyBold>
        </Box>
        <Box width="30%" textAlign="right">
          <Link to={`${ROUTES.PLAN_CREATE.path_prefix}/${token.addresses[CHAIN_ID]}`}>
            <Button variant="outlinePrimary" py={12} px={16}>
              <Type.Small>Create Plan</Type.Small>
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default ProductItem
