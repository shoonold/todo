import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Paper,
  Button,
  Switch
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from '@mui/material/Divider'
import SaveTaskDialog from './Components/SaveTaskDialog'
import DeleteTaskDialog from './Components/DeleteTaskDialog'
import TasksService from '../../Services/TasksService'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import RemoveIcon from '@mui/icons-material/Remove'
import moment from 'moment'
import Layout from '../../Shared/Layout'

export default function Tasks (props) {
  const [open, setOpen] = useState(false)
  const [itemToModify, setItemToModify] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(false)
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  const { todoItem } = useParams()

  useEffect(() => {
    getAllTasks()
  }, [])

  // Function to get all the todos
  const getAllTasks = () => {
    TasksService.getAll(todoItem).then(res => {
      if (res.success) {
        setTasks(res.data)
      } else {
        toast.error(res.msg)
        navigate('/todos')
      }
    })
  }

  // Function to complete the task
  const completeTask = data => {
    data.oldDescription = data.description
    data.completed = true
    TasksService.update(data, todoItem).then(res => {
      if (res.success) {
        toast.success('Task completed successfully')
        getAllTasks()
      } else {
        toast.error(res.msg)
      }
    })
  }

  // Function to handle the delete todo
  const handleDelete = value => {
    if (value) {
      TasksService.deleteTask({ taskName: value, todoName: todoItem }).then(
        res => {
          if (res.success) {
            getAllTasks()
            toast.success(res.msg)
          } else {
            toast.error(res.msg)
          }
        }
      )
    }
    setItemToDelete(false)
  }

  const handleCreateTodo = value => {
    if (value) {
      getAllTasks()
    }
    setOpen(false)
    setItemToModify(false)
  }

  const editTask = itemForEdit => {
    setItemToModify(itemForEdit)
  }

  const navigateToTodos = () => {
    navigate('/todos')
  }

  return (
    <Layout>
      <Paper
        sx={{
          maxWidth: '80%',
          marginTop: '2%',
          marginLeft: '8%',
          padding: 2
        }}
        disablePadding
      >
        <Typography
          variant='h4'
          sx={{
            padding: '15px'
          }}
          component='h4'
        >
          {todoItem}
          <Button
            sx={{
              marginLeft: '15px',
              marginRight: '15px'
            }}
            onClick={() => setOpen(true)}
            variant='outlined'
          >
            Create Task
          </Button>
          <Button color='error' onClick={navigateToTodos} variant='outlined'>
            Back
          </Button>
        </Typography>
        <Divider />
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper'
          }}
        >
          {tasks.map(value => {
            return (
              <ListItem
                key={value.description}
                className={value.completed ? 'completed' : ''}
              >
                <ListItemIcon>
                  {!value.completed && (
                    <EditIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => editTask(value)}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    width: '50px'
                  }}
                  primary={`${value.description}`}
                />
                <ListItemButton
                  sx={{
                    width: '50px'
                  }}
                >
                  {moment(value.dueDate).format('DD/MM/YYYY')}
                </ListItemButton>
                <IconButton>
                  <Switch
                    onChange={() => completeTask(value)}
                    checked={value.completed || false}
                    disabled={value.completed}
                  />
                </IconButton>
                <ListItemText sx={{ marginLeft: '50px' }}>
                  <IconButton>
                    {value.priority == 'High' ? (
                      <ArrowUpwardIcon />
                    ) : value.priority == 'Low' ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <RemoveIcon />
                    )}
                  </IconButton>
                </ListItemText>
                <ListItemButton>
                  <IconButton
                    onClick={() => {
                      setItemToDelete(value.description)
                    }}
                  >
                    {!value.completed && <DeleteIcon />}
                  </IconButton>
                </ListItemButton>
              </ListItem>
            )
          })}
          {!tasks.length && (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary='No task found' />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        {(open || itemToModify) && (
          <SaveTaskDialog
            todoName={todoItem}
            open
            itemToModify={itemToModify}
            handleCreateTodo={handleCreateTodo}
          />
        )}
        {itemToDelete && (
          <DeleteTaskDialog open={itemToDelete} handleDelete={handleDelete} />
        )}
      </Paper>
    </Layout>
  )
}
