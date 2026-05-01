import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const PrivateRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext)

  if (loading) {
    return <div className="loading-container">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}