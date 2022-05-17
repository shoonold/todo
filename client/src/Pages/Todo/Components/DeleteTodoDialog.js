import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DeleteTodoDialog (props) {
  const handleClose = value => {
    props.handleDelete(value)
  }

  return (
    <div>
      <Dialog
        fullWidth
        open={props.open ? true : false}
        onClose={() => handleClose(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Todo?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to delete todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Disagree</Button>
          <Button onClick={() => handleClose(props.open)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
