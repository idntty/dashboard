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
  getBlockById (id) {
    return request('get', `/blocks/${id}`)
  }
}

export default api
