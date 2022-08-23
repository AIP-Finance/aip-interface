import React from 'react'

import { Box, Flex, Image } from 'theme/base'
import { LINKS } from 'utils/constants'

const CommunityCard = () => {
  return (
    <Box textAlign="center">
      <Flex justifyContent="center" alignContent="center">
        <Box mx={12}>
          <a href={LINKS.github} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={'images/icon/github_white.svg'} />
          </a>
        </Box>
        <Box mx={12}>
          <a href={LINKS.twitter} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={'images/icon/twitter_white.svg'} />
          </a>
        </Box>
        <Box mx={12}>
          <a href={LINKS.telegramGroup} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={'images/icon/telegram_white.svg'} />
          </a>
        </Box>
        <Box mx={12}>
          <a href={LINKS.medium} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={'images/icon/medium_white.svg'} />
          </a>
        </Box>
      </Flex>
    </Box>
  )
}

export default CommunityCard
