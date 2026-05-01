import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams()
  const { handleOAuthCallback } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')
    const role = searchParams.get('role')

    if (token && user && role) {
      handleOAuthCallback(token, user, role)

      if (role === 'ROLE_ADMIN') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      navigate('/login')
    }
  }, [searchParams, handleOAuthCallback, navigate])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <p className="text-sm font-bold uppercase tracking-wider text-text-muted">
        AUTHENTICATING...
      </p>
    </div>
  )
}