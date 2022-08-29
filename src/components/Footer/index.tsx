import { Trans } from '@lingui/macro'

import { Box, Flex, Type } from 'theme/base'

import { LINKS } from '../../utils/constants'
import CommunityCard from '../CommunityCard'

const Footer = () => {
  return (
    <Box
      sx={{
        zIndex: 101,
        width: '100%',
        height: ['fit-content', 'fit-content', '220px'],
      }}
    >
      {/*<Flex*/}
      {/*  p={4}*/}
      {/*  sx={{*/}
      {/*    flexDirection: ['column', 'column', 'row'],*/}
      {/*    alignItems: ['center', 'center', 'normal'],*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Flex width="100%" sx={{ justifyContent: 'center' }}>*/}
      {/*    <Flex*/}
      {/*      sx={{*/}
      {/*        justifyContent: ['space-between', 'space-around'],*/}
      {/*        flexBasis: ['calc(100% / 3 * 2)'],*/}
      {/*        marginBottom: ['1em', '0'],*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <Flex flexDirection="column" alignItems="flex-start">*/}
      {/*        <Box mb={2}>*/}
      {/*          <Type.CaptionBold color="neutral6">*/}
      {/*            <Trans>Community</Trans>*/}
      {/*          </Type.CaptionBold>*/}
      {/*        </Box>*/}
      {/*        <CommunityCard />*/}
      {/*      </Flex>*/}

      {/*      <Flex flexDirection="column" alignItems="flex-start">*/}
      {/*        <Box mb={2}>*/}
      {/*          <Type.CaptionBold color="neutral6">*/}
      {/*            <Trans>Support</Trans>*/}
      {/*          </Type.CaptionBold>*/}
      {/*        </Box>*/}
      {/*        <Box color="neutral5">*/}
      {/*          <a href={LINKS.whitepaper} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">*/}
      {/*            <Type.Small>*/}
      {/*              <Trans>Whitepaper</Trans>*/}
      {/*            </Type.Small>*/}
      {/*          </a>*/}
      {/*        </Box>*/}
      {/*        <Box color="neutral5">*/}
      {/*          <a href={LINKS.privacy} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">*/}
      {/*            <Type.Small>*/}
      {/*              <Trans>Privacy</Trans>*/}
      {/*            </Type.Small>*/}
      {/*          </a>*/}
      {/*        </Box>*/}
      {/*      </Flex>*/}
      {/*    </Flex>*/}
      {/*  </Flex>*/}
      {/*</Flex>*/}
      <Box py={2} textAlign={'center'}>
        <Box my={24}>
          <CommunityCard />
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <Box color="neutral5">
            <a href={LINKS.whitepaper} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
              <Type.Small>
                <Trans>WhitePaper</Trans>
              </Type.Small>
            </a>
          </Box>
          <Box mx={24} color="neutral4">
            |
          </Box>
          <Box color="neutral5">
            <a href={LINKS.privacy} target="_blank" style={{ color: 'inherit' }} rel="noreferrer">
              <Type.Small>
                <Trans>Privacy Policy</Trans>
              </Type.Small>
            </a>
          </Box>
        </Flex>
        <Type.Small color={'neutral4'} mt={24}>
          <Trans>AIP - Auto Invest Protocol © 2022</Trans>
        </Type.Small>
      </Box>
    </Box>
  )
}

export default Footer
