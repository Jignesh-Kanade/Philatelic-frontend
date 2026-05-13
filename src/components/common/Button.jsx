import React from 'react'

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    className = '',
    icon = null,
}) => {
    const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2'

    const variantClasses = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-400',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-200',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
        success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400',
    }

    const sizeClasses = {
        small: 'px-4 py-1.5 text-sm',
        medium: 'px-6 py-2.5 text-base',
        large: 'px-8 py-3 text-lg',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                }`}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    )
}

export default Button