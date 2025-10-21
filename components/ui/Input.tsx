import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputClasses = `
      w-full px-3 py-2 border rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-all duration-200
      ${error 
        ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:ring-red-500' 
        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
      }
      ${props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}
      ${className}
    `.trim()

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 animate-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'