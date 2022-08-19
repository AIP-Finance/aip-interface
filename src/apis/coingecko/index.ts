import axios from 'axios'

const cgkClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple',
  timeout: 5000,
})

export const getBnbPrice = (): Promise<number | null> =>
  cgkClient
    .get(`price`, {
      params: { ids: 'binancecoin', vs_currencies: 'usd' },
    })
    .then((res) => {
      if (!res || !res.data) return null
      return (res.data['binancecoin'] as { usd: number }).usd
    })
