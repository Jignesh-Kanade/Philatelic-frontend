import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/auth/LoginForm'

const Login = () => {
    const { login, loading, error } = useAuth()
    const [loginError, setLoginError] = useState(null)

    const handleLogin = async (credentials) => {
        setLoginError(null)
        const result = await login(credentials)
        if (!result.success) {
            setLoginError(result.error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-4">
                        <span className="text-3xl">📮</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Sign in to your Philately India account</p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <LoginForm onSubmit={handleLogin} loading={loading} error={loginError || error} />
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        🔒 Your data is secure and encrypted
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login