import React from 'react'

import githubWhite from 'assets/images/icon/github_white.svg'
import mediumWhite from 'assets/images/icon/medium_white.svg'
import telegramWhite from 'assets/images/icon/telegram_white.svg'
import twitterWhite from 'assets/images/icon/twitter_white.svg'
import { Box, Flex, Image } from 'theme/base'
import { LINKS } from 'utils/constants'

const CommunityCard = () => {
  return (
    <Box textAlign="center">
      <Flex justifyContent="center" alignContent="center">
        <Box mx={12}>
          <a href={LINKS.github} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={githubWhite} />
          </a>
        </Box>
        <Box mx={12}>
          <a href={LINKS.twitter} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={twitterWhite} />
          </a>
        </Box>
        <Box mx={12}>
          <a href={LINKS.telegramGroup} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={telegramWhite} />
          </a>
        </Box>
        <Box mx={12}>
          <a href={LINKS.medium} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
            <Image src={mediumWhite} />
          </a>
        </Box>
      </Flex>
    </Box>
  )
}

export default CommunityCard
