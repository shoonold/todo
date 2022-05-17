import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TodoService from '../../../Services/TodoService'
import { toast } from 'react-toastify'

export default function CreateTodo (props) {
  const [todoName, setTodoName] = React.useState('')

  const handleClose = value => {
    props.handleCreateTodo(value)
  }

  const handleSubmit = () => {
    TodoService.create({ todoName, userName: localStorage.getItem('todoUserName') }).then(
      res => {
        if (res.success) {
          toast.success(res.msg)
          handleClose(true)
        } else {
          toast.error(res.msg)
        }
      }
    )
  }

  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={() => handleClose(false)}>
        <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={e => {
              setTodoName(e.target.value)
            }}
            margin='dense'
            label='Enter Todo Name'
            fullWidth
            variant='standard'
          />
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
            disabled={!todoName}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
