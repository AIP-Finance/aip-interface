import axios from 'axios'

import { getErrorMessage } from 'utils/errorHandler'

const requester = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
})

requester.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(getErrorMessage(error))
  }
)

export default requester
