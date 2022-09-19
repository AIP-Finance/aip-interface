interface TokenData {
  name: string
  symbol: string
  decimals: number
  addresses: {
    [key: number]: string
  }
}
