"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface FormFieldProps {
  name: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  rules?: ValidationRule
  error?: string
  success?: boolean
  disabled?: boolean
  className?: string
}

export function FormField({
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  rules,
  error,
  success,
  disabled,
  className
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  
  const showError = hasInteracted && error
  const showSuccess = hasInteracted && success && !error
  
  const handleBlur = () => {
    setIsFocused(false)
    setHasInteracted(true)
    onBlur?.()
  }
  
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {rules?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors",
            "placeholder-gray-400 text-gray-900",
            showError 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
              : showSuccess
              ? "border-green-300 focus:border-green-500 focus:ring-green-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
            disabled && "bg-gray-50 cursor-not-allowed"
          )}
        />
        
        {showError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
        
        {showSuccess && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      
      {showError && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {showSuccess && (
        <p className="text-sm text-green-600">Looks good!</p>
      )}
    </div>
  )
}

// Form validation hook
export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
  const validateField = (name: string, value: string, rules?: ValidationRule): string | null => {
    if (!rules) return null
    
    if (rules.required && !value.trim()) {
      return 'This field is required'
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format'
    }
    
    if (rules.custom) {
      return rules.custom(value)
    }
    
    return null
  }
  
  const validateForm = (values: Record<string, string>, rules: Record<string, ValidationRule>) => {
    const newErrors: Record<string, string> = {}
    
    Object.keys(rules).forEach(field => {
      const error = validateField(field, values[field] || '', rules[field])
      if (error) {
        newErrors[field] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const setFieldError = (field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }
  
  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }
  
  const setFieldTouched = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }
  
  const getFieldError = (field: string) => {
    return touched[field] ? errors[field] : undefined
  }
  
  const isFieldValid = (field: string) => {
    return touched[field] && !errors[field]
  }
  
  return {
    errors,
    touched,
    validateField,
    validateForm,
    setFieldError,
    clearFieldError,
    setFieldTouched,
    getFieldError,
    isFieldValid
  }
}