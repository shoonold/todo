const fs = require('fs')

module.exports = {
  async create (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = JSON.parse(todos)
    const todoIndex = todos.findIndex(
      element =>
        element.todoName == req.params.todoName &&
        (element.owner == req.params.userName ||
          element.sharedWith.includes(req.params.userName))
    )
    if (todoIndex != 0 && !todoIndex) {
      res.send({ success: false, msg: 'Todo not found' })
    } else {
      const tasks = todos[todoIndex].tasks ? todos[todoIndex].tasks : []
      const task = tasks.filter(
        element => element.description == req.body.description
      )

      if (task.length) {
        res.send({
          success: false,
          msg: `Task with the same name alerady exist`
        })
      } else {
        tasks.push(req.body)
        todos[todoIndex].tasks = tasks
        fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
        res.send({ success: true, msg: 'Task added successfully' })
      }
    }
  },

  async update (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = JSON.parse(todos)
    const todoIndex = todos.findIndex(
      element =>
        element.todoName == req.params.todoName &&
        (element.owner == req.params.userName ||
          element.sharedWith.includes(req.params.userName))
    )
    if (todoIndex != 0 && !todoIndex) {
      res.send({ success: false, msg: 'Todo not found' })
    } else {
      let tasks = todos[todoIndex].tasks
      const index = tasks.findIndex(
        element => element.description == req.body.description
      )

      const oldIndex = tasks.findIndex(
        element => element.description == req.body.oldDescription
      )

      if (index !== -1 && req.body.description !== req.body.oldDescription) {
        res.send({
          success: false,
          msg: `Task with the same name alerady exist`
        })
      } else {
        delete req.body.oldDescription
        tasks[oldIndex] = req.body
        todos[todoIndex].tasks = tasks
        fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
        res.send({ success: true, msg: 'Task updated successfully' })
      }
    }
  },

  async getAll (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = todos.length ? JSON.parse(todos) : []
    const todo = todos.filter(
      element =>
        element.todoName == req.params.todoName &&
        (element.owner == req.params.userName ||
          element.sharedWith.includes(req.params.userName))
    )
    if (!todo.length) {
      res.send({ success: false, msg: 'No such todo found' })
    } else {
      let tasks = todo[0].tasks
      res.send({
        success: true,
        data: tasks
      })
    }
  },

  async delete (req, res) {
    let todos = fs.readFileSync('./data/todos.json')
    todos = JSON.parse(todos)
    const todoIndex = todos.findIndex(
      element =>
        element.todoName == req.body.todoName &&
        (element.owner == req.body.userName ||
          element.sharedWith.includes(req.body.userName))
    )
    if (todoIndex != 0 && !todoIndex) {
      res.send({ success: false, msg: 'Todo not found' })
    } else {
      tasks = todos[todoIndex].tasks
      tasks = tasks.filter(element => element.description != req.body.taskName)
      todos[todoIndex].tasks = tasks
      fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
      res.send({ success: true, msg: 'Task deleted successfully' })
    }
  }
}
