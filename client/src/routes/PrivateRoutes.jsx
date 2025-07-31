import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AppContext)

  if (loading) return <div>Loading...</div>

  return isLoggedIn ? children : <Navigate to="/signup" replace />
}

export default PrivateRoute
