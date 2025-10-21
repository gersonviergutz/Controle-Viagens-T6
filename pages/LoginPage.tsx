import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  )
}