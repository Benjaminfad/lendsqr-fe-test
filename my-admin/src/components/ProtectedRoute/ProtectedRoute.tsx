"use client"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

interface ProtectedRouteProps {
  redirectPath?: string
}

const ProtectedRoute = ({ redirectPath = "/" }: ProtectedRouteProps) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />
}

export default ProtectedRoute
