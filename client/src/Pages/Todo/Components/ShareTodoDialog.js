import React, { useState, useEffect } from 'react'
import {
  Button,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material'
import TodoService from '../../../Services/TodoService'
import { toast } from 'react-toastify'

export default function CreateTodo (props) {
  const [user, setUser] = React.useState('')
  const [users, setUsers] = React.useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const handleClose = value => {
    props.handleSharedDialog(value)
  }

  const getUsers = () => {
    TodoService.fetchUsers({ userName: props.open.owner }).then(res => {
      if (res.success) {
        setUsers(res.data)
      } else {
        toast.error(res.msg)
      }
    })
  }

  const handleSubmit = () => {
    TodoService.shareTodo({
      user,
      userName: localStorage.getItem('todoUserName'),
      todoName: props.open.todoName
    }).then(res => {
      if (res.success) {
        toast.success(res.msg)
        handleClose(true)
      } else {
        toast.error(res.msg)
      }
    })
  }

  return (
    <div>
      <Dialog
        open={props.open ? true : false}
        fullWidth
        onClose={() => handleClose(false)}
      >
        <DialogTitle>Share Todo: {props.open.todoName}</DialogTitle>
        <DialogContent>
          <FormControl
            sx={{
              mt: 2
            }}
            fullWidth
          >
            <InputLabel>Users</InputLabel>
            <Select
              name='users'
              label='Users'
              onChange={e => {
                setUser(e.target.value)
              }}
              value={user}
            >
              {users.map(element => {
                return (
                  <MenuItem value={element.userName}>
                    {element.userName}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            variant='outlined'
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <Button variant='outlined' disabled={!user} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
