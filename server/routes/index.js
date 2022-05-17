var express = require('express')
var router = express.Router()
const jwtauth = require('../middlewares/jwtauth')

const todoController = require('../controllers/todo.controller')
const tasksController = require('../controllers/tasks.controller')
const loginController = require('../controllers/login.controller')

// Login Route
router.post('/login', loginController.login)

// Todo's routes
router.post('/todo/create', jwtauth, todoController.create)
router.post('/todo/share-todo', jwtauth, todoController.shareTodo)
router.get('/todo/get-todos', jwtauth, todoController.getAll)
router.post('/todo/get-users', jwtauth, todoController.getUsers)
router.delete('/todo/delete-todo', jwtauth, todoController.delete)

// Task's routes
router.get(
  '/tasks/get-tasks/:todoName/:userName',
  jwtauth,
  tasksController.getAll
)
router.post('/task/create/:todoName/:userName', jwtauth, tasksController.create)
router.put('/task/update/:todoName/:userName', jwtauth, tasksController.update)
router.delete('/task/delete', jwtauth, tasksController.delete)

module.exports = router
