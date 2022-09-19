import React from 'react'

import CardWrapper from 'components/CardWrapper'
import { Box, Flex, Image, Type } from 'theme/base'

const HowItem = ({ index, title, image }: { index: number; title: string; image: string }) => {
  return (
    <Box>
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          alignItems: ['center', 'center', 'normal'],
          justifyContent: ['start', 'start', 'start'],
          borderBottom: 'normal',
          borderBottomColor: 'primary1',
          mb: '42px',
          pb: '10px',
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bg: 'primary1',
            mr: '12px',
            textAlign: 'center',
          }}
        >
          <Type.CaptionBold color="neutral1">{index}</Type.CaptionBold>
        </Box>
        <Type.BodyBold>{title}</Type.BodyBold>
      </Flex>
      <Box textAlign="center">
        <Image src={image} />
      </Box>
    </Box>
  )
}

const HowCard = () => {
  return (
    <CardWrapper mt={24} title={'How to join?'}>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box mr={[0, 0, 40]} flex={1}>
          <HowItem index={1} title={'Connect Wallet'} image={'images/home_icon_1.png'} />
        </Box>
        <Box mr={[0, 0, 40]} flex={1}>
          <HowItem index={2} title={'Create your Auto-Invest Plan'} image={'images/home_icon_2.png'} />
        </Box>
        <Box flex={1}>
          <HowItem index={3} title={'Enjoy the way your money works'} image={'images/home_icon_3.png'} />
        </Box>
      </Flex>
    </CardWrapper>
  )
}

export default HowCard
