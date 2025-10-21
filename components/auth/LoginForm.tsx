import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Alert } from '../ui/Alert'
import { LoginFormData, AuthFormErrors } from '../../types/auth'

interface LoginFormProps {
  onSuccess?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { signIn } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<AuthFormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: AuthFormErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
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

    const { error } = await signIn(formData.email, formData.password)

    if (error) {
      setErrors({ general: error.message })
    } else {
      setSuccess('Login realizado com sucesso!')
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
            Entrar
          </h1>
          <p className="text-gray-600 mt-2">
            Acesse sua conta para gerenciar suas viagens
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

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Senha"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              disabled={loading}
              className="pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}