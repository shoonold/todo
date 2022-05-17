import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import CreateTodo from './Components/CreateTodoDialog'
import DeleteTodoDialog from './Components/DeleteTodoDialog'
import ShareTodoDialog from './Components/ShareTodoDialog'
import TodoService from '../../Services/TodoService'
import { toast } from 'react-toastify'
import ShareIcon from '@mui/icons-material/Share'
import Layout from '../../Shared/Layout'
import EmergencyShareIcon from '@mui/icons-material/EmergencyShare'

export default function Todo (props) {
  const [open, setOpen] = useState(false)
  const [itemForDelete, setItemForDelete] = useState(false)
  const [itemToShare, setItemToShare] = useState(false)
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllTodos()
  }, [])

  // Function to get all the todos
  const getAllTodos = () => {
    TodoService.getAll().then(res => {
      setTodos(res.data)
    })
  }

  // Function to handle the delete todo
  const handleDelete = value => {
    if (value) {
      TodoService.deleteTodo({ todoName: value }).then(res => {
        if (res.success) {
          getAllTodos()
          toast.success(res.msg)
        } else {
          toast.error(res.msg)
        }
      })
    }
    setItemForDelete(false)
  }

  const handleCreateTodo = value => {
    if (value) {
      getAllTodos()
    }
    setOpen(false)
  }

  const handleSharedDialog = value => {
    setItemToShare(false)
  }

  // Function to navigate on particular todo's task
  const navigateToTask = todoItem => {
    navigate(`/tasks/${todoItem}`)
  }

  return (
    <Layout>
      <Paper
        sx={{
          maxWidth: 500,
          marginLeft: '30%',
          marginTop: '2%',
          padding: 2
        }}
      >
        <Typography
          variant='h4'
          sx={{
            padding: '15px'
          }}
          component='h4'
        >
          Todos
          <Button
            sx={{
              marginLeft: '15px',
              marginRight: '15px'
            }}
            onClick={() => setOpen(true)}
            variant='outlined'
          >
            Create Todo
          </Button>
        </Typography>
        <Divider />
        <List
          sx={{
            width: '100%',
            maxWidth: 450,
            bgcolor: 'background.paper'
          }}
        >
          {todos.map(value => {
            const labelId = `checkbox-list-label-${value.todoName}`

            return (
              <ListItem
                className={
                  value.tasks.length > 0 &&
                  value.tasks.length == value.completedTasks.length
                    ? 'completed'
                    : ''
                }
                key={value.todoName}
                disablePadding
              >
                <ListItemButton sx={{ maxWidth: '200px' }}>
                  <ListItemText
                    onClick={() => navigateToTask(value.todoName)}
                    primary={`${value.todoName}`}
                  />
                  {value.sharedWith.length ? <EmergencyShareIcon /> : ''}
                </ListItemButton>
                <ListItemButton>
                  <ListItemText
                    primary={`(${value.completedTasks.length}/${value.tasks.length})`}
                  />
                </ListItemButton>
                
                {(value.tasks.length == 0 ||
                  (value.tasks.length > 0 &&
                    value.tasks.length != value.completedTasks.length)) && (
                  <IconButton
                    onClick={() => {
                      setItemToShare(value)
                    }}
                    edge='end'
                  >
                    <ShareIcon />
                  </IconButton>
                )}
                {/* {(value.tasks.length == 0 ||
                  (value.tasks.length > 0 &&
                    value.tasks.length != value.completedTasks.length)) && ( */}
                  <IconButton
                    onClick={() => {
                      setItemForDelete(value.todoName)
                    }}
                    edge='end'
                  >
                    <DeleteIcon />
                  </IconButton>
                 {/* )} */}
              </ListItem>
            )
          })}
          {!todos.length && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary='No todo found' />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        {open && <CreateTodo open handleCreateTodo={handleCreateTodo} />}
        {itemForDelete && (
          <DeleteTodoDialog open={itemForDelete} handleDelete={handleDelete} />
        )}
        {itemToShare && (
          <ShareTodoDialog
            open={itemToShare}
            handleSharedDialog={handleSharedDialog}
          />
        )}
      </Paper>
    </Layout>
  )
}
