import axios from '../Api/api'

function login (body) {
  return axios.post('/login', body)
}
export default { login }
