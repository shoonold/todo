import axios from '../Api/api'

function create (body, todoName) {
  const userName = localStorage.getItem('todoUserName')
  return axios.post(`/task/create/${todoName}/${userName}`, body)
}

function getAll (todoName) {
  const userName = localStorage.getItem('todoUserName')
  return axios.get(`/tasks/get-tasks/${todoName}/${userName}`)
}

function deleteTask (body) {
  body.userName = localStorage.getItem('todoUserName')
  return axios.delete('/task/delete', { data: body })
}

function update (body, todoName) {
  const userName = localStorage.getItem('todoUserName')
  return axios.put(`task/update/${todoName}/${userName}`, body)
}

export default { create, getAll, deleteTask, update }
