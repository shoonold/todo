import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Todo from '../Pages/Todo'
import Tasks from '../Pages/Task'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { BrowserRouter } from 'react-router-dom'

export default function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          exact
          path='/todos'
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path='tasks/:todoItem'
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
