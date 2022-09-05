import React from 'react'

import CommunityCard from 'components/CommunityCard'
import { Box, Type } from 'theme/base'

import { Button } from '../../theme/Buttons'
import { LINKS } from '../../utils/constants'

const HeroCard = () => {
  return (
    <Box textAlign="center" mt={66}>
      <Box
        sx={{
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '96px',
          lineHeight: '96px',
          letterSpacing: '-0.02em',
        }}
      >
        AIP Finance
      </Box>
      <Type.H4 mt={4}>Auto-Invest Protocol</Type.H4>
      <Type.Large mt={26} color="primary1">
        <Type.Large color="neutral8">{`</`}</Type.Large> The Protocol makes your money & blockchain work for you{' '}
        <Type.Large color="neutral8">{`>`}</Type.Large>
      </Type.Large>

      <Box mt={12}>
        <CommunityCard />
      </Box>

      <Box my={36}>
        <a href={LINKS.testnet} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
          <Button mr={3} variant="outline_primary">
            Join Testnet
          </Button>
        </a>
        <a href={LINKS.whitepaper} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
          <Button variant="outline">WhitePaper</Button>
        </a>
      </Box>
    </Box>
  )
}

export default HeroCard
