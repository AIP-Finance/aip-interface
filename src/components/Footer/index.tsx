import { Trans } from '@lingui/macro'

import { Box, Flex, Type } from 'theme/base'
import { LINKS } from 'utils/constants'

const Footer = () => {
  return (
    <Box
      sx={{
        zIndex: 101,
        width: '100%',
        height: ['fit-content', 'fit-content', '220px'],
      }}
    >
      <Flex
        p={4}
        sx={{
          flexDirection: ['column', 'column', 'row'],
          alignItems: ['center', 'center', 'normal'],
        }}
      >
        <Flex width="100%" sx={{ justifyContent: 'center' }}>
          <Flex
            sx={{
              justifyContent: ['space-between', 'space-around'],
              flexBasis: ['calc(100% / 3 * 2)'],
              marginBottom: ['1em', '0'],
            }}
          >
            <Flex flexDirection="column" alignItems="flex-start">
              <Box mb={2}>
                <Type.CaptionBold color="neutral6">
                  <Trans>Community</Trans>
                </Type.CaptionBold>
              </Box>
              <Box color="neutral5">
                <a href={LINKS.github} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
                  <Type.Small>
                    <Trans>Github</Trans>
                  </Type.Small>
                </a>
              </Box>
              <Box color="neutral5">
                <a href={LINKS.telegramGroup} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
                  <Type.Small>
                    <Trans>Telegram</Trans>
                  </Type.Small>
                </a>
              </Box>
              <Box color="neutral5">
                <a href={LINKS.twitter} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
                  <Type.Small>
                    <Trans>Twitter</Trans>
                  </Type.Small>
                </a>
              </Box>
            </Flex>

            <Flex flexDirection="column" alignItems="flex-start">
              <Box mb={2}>
                <Type.CaptionBold color="neutral6">
                  <Trans>Support</Trans>
                </Type.CaptionBold>
              </Box>
              <Box color="neutral5">
                <a href={LINKS.whitepaper} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
                  <Type.Small>
                    <Trans>Whitepaper</Trans>
                  </Type.Small>
                </a>
              </Box>
              <Box color="neutral5">
                <a href={LINKS.privacy} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
                  <Type.Small>
                    <Trans>Privacy</Trans>
                  </Type.Small>
                </a>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Box py={2} textAlign={'center'}>
        <Type.Small color={'neutral5'}>
          <Trans>AIP - Auto Invest Protocol © 2022</Trans>
        </Type.Small>
      </Box>
    </Box>
  )
}

export default Footer
