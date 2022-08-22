import { Box, Image } from 'theme/base'

const Logo = ({ size = 32 }: { size?: number | number[] }) => {
  return (
    <Box height={size}>
      <Image src={`/images/logo.svg`} height="100%" />
    </Box>
  )
}

export default Logo
