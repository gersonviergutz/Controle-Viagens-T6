import { User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  email: string
  role: 'user' | 'admin'
  full_name?: string
  created_at: string
  updated_at: string
}

export interface AuthUser extends User {
  profile?: Profile
}

export interface AuthContextType {
  user: AuthUser | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updatePassword: (password: string) => Promise<{ error: Error | null }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export interface AuthFormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  fullName?: string
  general?: string
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  success: string | null
}

export type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS'; payload: string | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'RESET_STATE' }