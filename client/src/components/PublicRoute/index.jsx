import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate, } from 'react-router-dom'

const PublicRoute = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return isAuth ? <Navigate to="/app" /> : <Outlet />
}

export default PublicRoute
