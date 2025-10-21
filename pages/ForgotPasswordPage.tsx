import React from 'react'
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm'

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ForgotPasswordForm />
    </div>
  )
}