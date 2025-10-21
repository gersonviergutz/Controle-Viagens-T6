import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Alert } from '../ui/Alert'
import { ForgotPasswordFormData, AuthFormErrors } from '../../types/auth'

interface ForgotPasswordFormProps {
  onSuccess?: () => void
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess }) => {
  const { resetPassword } = useAuth()
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  })
  const [errors, setErrors] = useState<AuthFormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: AuthFormErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setErrors({})
    setSuccess(null)

    const { error } = await resetPassword(formData.email)

    if (error) {
      setErrors({ general: error.message })
    } else {
      setSuccess('Email de recuperação enviado! Verifique sua caixa de entrada.')
      onSuccess?.()
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (errors[name as keyof AuthFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Recuperar Senha
          </h1>
          <p className="text-gray-600 mt-2">
            Digite seu email para receber um link de recuperação
          </p>
        </div>

        {errors.general && (
          <Alert
            type="error"
            message={errors.general}
            className="mb-6"
            onClose={() => setErrors(prev => ({ ...prev, general: undefined }))}
          />
        )}

        {success && (
          <Alert
            type="success"
            message={success}
            className="mb-6"
            onClose={() => setSuccess(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="seu@email.com"
              disabled={loading}
              className="pl-10"
            />
            <Mail className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            Enviar Link de Recuperação
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}