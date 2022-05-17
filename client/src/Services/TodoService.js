import axios from '../Api/api'

function create (body) {
  return axios.post('/todo/create', body)
}

function getAll () {
  const userName = localStorage.getItem('todoUserName')
  return axios.get(`/todo/get-todos?userName=${userName}`)
}

function deleteTodo (body) {
  body.userName = localStorage.getItem('todoUserName')
  return axios.delete('/todo/delete-todo', { data: body })
}

function fetchUsers (body) {
  return axios.post(`/todo/get-users`, body)
}

function shareTodo (body) {
  return axios.post(`/todo/share-todo`, body)
}

export default { create, getAll, deleteTodo, fetchUsers, shareTodo }
