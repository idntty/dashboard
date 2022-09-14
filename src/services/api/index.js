import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.VUE_APP_API_BASE
})

const request = (method, url, data) => {
  return client[method](url, data)
    .then(response => {
      return response.data
    })
}

const api = {
  getNodeInfo () {
    return request('get', '/node/info')
  },
  getBlockById (id) { // not used
    return request('get', `/blocks/${id}`)
  },
  getTransactionsQuantity () { // isn`t working
    return request('get', `/node/transactions`)
  },
  getTransactionsList (limit = 2, offset = 0) { // isn`t working
    return request('get', `/node/transactions/last?limit=${limit}&offset=${offset}`)
  },
  getAccountInfo (id) {
    return request('get', `/accounts/${id}`)
  },
  getAccountTransactions (id) {
    return request('get', `/account/transactions/${id}`)
  },
  getTransactionInfo (id) {
    return request('get', `/transactions/${id}`)
  },
  getVerificationCode (account, email) {
    return request('post', '/faucet/authorize', {
      account,
      email
    })
  },
  getTokens (account, email, code) {
    return request('post', '/faucet/fundbyemail', {
      account,
      email,
      code
    })
  }
}

export default api
