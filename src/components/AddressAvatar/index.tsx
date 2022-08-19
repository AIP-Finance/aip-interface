import Avatar from 'boring-avatars'
import React from 'react'

import { Box } from 'theme/base'

export const parseAvatarString = (account = '') => {
  const text = account.slice(2, account.length)
  return `${text.slice(0, 4)} ${text.slice(4, 8)}`
}

const AddressAvatar = ({ address, size = 40 }: { address: string; size?: number }) => {
  return (
    <Box width={size} height={size} sx={{ borderRadius: size, overflow: 'hidden' }}>
      <Avatar
        size={size}
        name={parseAvatarString(address)}
        variant="pixel"
        // colors={[colors(false).primary1, colors(false).primary2]}
      />
    </Box>
  )
}

export default AddressAvatar
