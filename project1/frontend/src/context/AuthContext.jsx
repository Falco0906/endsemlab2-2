import { createContext, useState, useEffect, useCallback } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize authentication from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  // Login function - redirects to OAuth
  const login = useCallback(() => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }, [])

  // Handle OAuth callback with token
  const handleOAuthCallback = useCallback((token, userEmail, role) => {
    const userData = { email: userEmail, role }
    setToken(token)
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('jwtToken', token)
    localStorage.setItem('user', JSON.stringify(userData))
  }, [])

  // Logout function
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    window.location.href = '/'
  }, [])

  // Get authorization header for API calls
  const getAuthHeader = useCallback(() => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, [token])

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    handleOAuthCallback,
    getAuthHeader,
    isAdmin: user?.role === 'ROLE_ADMIN'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}