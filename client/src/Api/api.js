import axios from 'axios'
import { config } from '../config'

const instance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { Accept: 'application/json' }
})

instance.interceptors.request.use(
  request => {
    document.body.classList.add('loading-indicator')
    request.headers = {
      'Content-Type': 'application/json'
    }
    const accessToken = localStorage.getItem('todoToken')
    if (accessToken) {
      request.headers['x-access-token'] = `${accessToken}`
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    document.body.classList.remove('loading-indicator')
    return response.data
  },
  error => {
    if (error && error.response && 401 == error.response.status) {
      // history.push('/')
      window.location.href = '/'
      localStorage.removeItem('todoToken')
      localStorage.removeItem('todoUserName')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default instance
