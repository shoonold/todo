const fs = require('fs')

module.exports = {
  async create (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []
    const checkIfTodoExist = todos.filter(
      element =>
        element.todoName == req.body.todoName &&
        element.owner == req.body.userName
    )

    if (checkIfTodoExist.length) {
      res.send({ success: false, msg: 'Todo with the same name alerady exist' })
    } else {
      const body = req.body
      body.owner = req.body.userName
      body.sharedWith = []
      body.tasks = []
      delete req.body.userName
      todos.push(body)
      fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
      res.send({ success: true, msg: 'Todo added successfully' })
    }
  },

  async getAll (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []

    todos = todos.filter(
      element =>
        element.owner == req.query.userName ||
        element.sharedWith.includes(req.query.userName)
    )

    todos.forEach((element, index) => {
      const todoCompletedTasks = element.tasks.filter(item => item.completed)
      todos[index].completedTasks = todoCompletedTasks
    })

    res.send({ success: true, data: todos })
  },

  async delete (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []

    // Remove todo from the json
    const filteredTodos = todos.filter(
      element =>
        element.todoName != req.body.todoName &&
        (element.owner != req.body.userName ||
          element.sharedWith.includes(req.body.userName))
    )
    fs.writeFileSync('./data/todos.json', JSON.stringify(filteredTodos))
    res.send({ success: true, msg: 'Todo deleted successfully' })
  },

  async getUsers (req, res) {
    let users = fs.readFileSync('./data/users.json')
    users = users.length ? JSON.parse(users) : []

    users = users.filter(element => element.userName != req.body.userName)
    res.send({ success: true, data: users })
  },

  async shareTodo (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = JSON.parse(todos)

    const todoIndex = todos.findIndex(
      element =>
        element.todoName == req.body.todoName &&
        element.owner == req.body.userName
    )
    if (todoIndex != 0 && !todoIndex) {
      res.send({ success: false, msg: 'Todo not found' })
    } else {
      todos[todoIndex].sharedWith.push(req.body.user)
      fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
      res.send({ success: true, msg: 'Todo shared successfully' })
    }
  }
}
