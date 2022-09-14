import { ExportSquare } from 'iconsax-react'
import React, { useEffect, useRef, useState } from 'react'

import { usePlanManagerContract } from 'hooks/web3/useContract'
import Loading from 'theme/Loading'
import { Box, Flex, Image, Type } from 'theme/base'

interface MetaData {
  name: string
  description: string
  image: string
}

const NFTDetails = ({ id }: { id: string }) => {
  const planManagerContract = usePlanManagerContract(false)
  const idRef = useRef<string>()
  const [metadata, setMetadata] = useState<MetaData | false>()
  useEffect(() => {
    if (!planManagerContract) return
    if (idRef.current === id) return
    idRef.current = id
    const load = async () => {
      try {
        const tokenURI = await planManagerContract.tokenURI(id)
        const response = await fetch(tokenURI)
        const data = await response.json()
        setMetadata(data)
      } catch (err) {
        setMetadata(false)
      }
    }
    load()
  }, [id, planManagerContract])
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid #B1E846',
        maxWidth: '1000px',
        margin: 'auto',
        borderRadius: '4px',
        bg: 'modalBG',
        p: [12, 12, 40],
        my: 4,
      }}
    >
      {metadata == null && <Loading />}
      {metadata === false && (
        <Type.Large color="neutral5" textAlign="center" display="block">
          This plan&#39;s NFT is not found, or has been burned
        </Type.Large>
      )}
      {!!metadata && (
        <Box display={['block', 'block', 'block', 'flex']} sx={{ gap: 40 }}>
          <Box flex={2} textAlign="center">
            <Image src={metadata.image} alt="nft image" width="100%" maxWidth="400px" />
            <Flex my={24} justifyContent="center" alignItems="center">
              <Type.BodyBold mr={2}>View on </Type.BodyBold>
              <Box
                as="a"
                display="flex"
                alignItems="center"
                href={`${process.env.REACT_APP_OPENSEA_URL}/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src="/images/opensea.png" height={24} mr={2} />
                <ExportSquare size={20} />
              </Box>
            </Flex>
          </Box>
          <Box flex={3}>
            <Type.H3 mb={24} sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
              {metadata.name}
            </Type.H3>
            <Type.Body sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{metadata.description}</Type.Body>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default NFTDetails
