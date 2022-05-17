import React, { useEffect } from 'react'
import TasksService from '../../../Services/TasksService'
import { toast } from 'react-toastify'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Select,
  MenuItem
} from '@mui/material'

export default function CreateTodo (props) {
  const [tasksObj, setTasksObj] = React.useState({
    description: '',
    dueDate: null,
    priority: '',
    completed: false
  })

  useEffect(() => {
    if (props.itemToModify) {
      setTasksObj({
        ...tasksObj,
        description: props.itemToModify.description,
        dueDate: props.itemToModify.dueDate,
        priority: props.itemToModify.priority
      })
    }
  }, [props.itemToModify])

  const handleClose = value => {
    props.handleCreateTodo(value)
  }

  const handleSubmit = () => {
    if (props.itemToModify) {
      updateTask()
    } else {
      createTask()
    }
  }

  const createTask = () => {
    TasksService.create(tasksObj, props.todoName).then(res => {
      if (res.success) {
        toast.success(res.msg)
        handleClose(true)
      } else {
        toast.error(res.msg)
      }
    })
  }

  const updateTask = () => {
    tasksObj.oldDescription = props.itemToModify.description
    TasksService.update(tasksObj, props.todoName).then(res => {
      if (res.success) {
        toast.success(res.msg)
        handleClose(true)
      } else {
        toast.error(res.msg)
      }
    })
  }

  const handleChange = event => {
    const { name, value } = event.target
    setTasksObj({ ...tasksObj, [name]: value })
  }

  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={() => handleClose(false)}>
        <DialogTitle>
          {props.itemToModify ? 'Update Task' : 'Create Task'}
        </DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth>
              <TextField
                autoFocus
                name='description'
                value={tasksObj.description}
                onChange={handleChange}
                sx={{
                  mt: 2,
                  mb: 2
                }}
                label='Description'
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label='Due Date'
                  maxWidth
                  inputFormat='dd/MM/yyyy'
                  value={tasksObj.dueDate}
                  onChange={newValue => {
                    setTasksObj({ ...tasksObj, dueDate: newValue })
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      sx={{
                        mb: 2
                      }}
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name='priority'
                label='Priority'
                value={tasksObj.priority}
                onChange={handleChange}
              >
                <MenuItem value='High'>High</MenuItem>
                <MenuItem value='Medium'>Medium</MenuItem>
                <MenuItem value='Low'>Low</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            variant='outlined'
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            disabled={
              !tasksObj.description || !tasksObj.dueDate || !tasksObj.priority
            }
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
