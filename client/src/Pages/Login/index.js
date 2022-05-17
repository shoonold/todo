import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LoginService from '../../Services/LoginService'
import { toast } from 'react-toastify'

const theme = createTheme()

export default function Login () {
  const [loginObj, setLoginObj] = useState({
    userName: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    LoginService.login(loginObj).then(res => {
      if (res.success) {
        localStorage.setItem('todoToken', res.token)
        localStorage.setItem('todoUserName', res.userName)
        navigate('/todos')
      } else {
        toast.error(res.msg)
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              fullWidth
              label='User Name'
              onChange={event => {
                setLoginObj({ ...loginObj, userName: event.target.value })
              }}
              name='userName'
              autoFocus
            />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              onChange={event => {
                setLoginObj({ ...loginObj, password: event.target.value })
              }}
              label='Password'
              type='password'
            />
            <Button
              fullWidth
              type='submit'
              onClick={handleSubmit}
              disabled={!loginObj.userName || !loginObj.password}
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
