import styled from 'styled-components/macro'

import { Box } from 'theme/base'

const Loading = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.neutral6};
  border-top: 2px solid ${({ theme }) => theme.colors.primary1};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 10px auto;
`
export default Loading
