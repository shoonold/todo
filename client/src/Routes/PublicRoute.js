import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('todoToken')
  if (token) {
    return <Navigate to='/todos' replace />
  }

  return children
}
