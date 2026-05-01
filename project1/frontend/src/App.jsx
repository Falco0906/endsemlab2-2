import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PrivateRoute } from './components/PrivateRoute'
import { Login } from './components/Login'
import { OAuthCallback } from './components/OAuthCallback'
import AdminPanel from './components/AdminPanel'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />

          {/* Admin Route - Protected */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="ROLE_ADMIN">
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
