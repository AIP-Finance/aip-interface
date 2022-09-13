import { Coin1 } from 'iconsax-react'
import React from 'react'

import ButtonWithIcon from 'theme/Buttons/ButtonWithIcon'

import useUSDT from './useUSDT'

const MintUSDT = ({ account }: { account: string }) => {
  const { mintable, submitting, mint } = useUSDT(account)
  return mintable ? (
    <ButtonWithIcon icon={<Coin1 />} ml={2} size="sm" variant="outline" disabled={submitting} onClick={mint}>
      {submitting ? 'Requesting...' : 'Get TestUSDT'}
    </ButtonWithIcon>
  ) : (
    <div></div>
  )
}

export default MintUSDT
