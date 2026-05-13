import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
    const { register, loading, error } = useAuth()
    const [registerError, setRegisterError] = useState(null)

    const handleRegister = async (userData) => {
        setRegisterError(null)
        const result = await register(userData)
        if (!result.success) {
            setRegisterError(result.error)
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Philately India</h1>
                    <p className="text-gray-600">Create your account and start collecting stamps</p>
                </div>

                {/* Register Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <RegisterForm onSubmit={handleRegister} loading={loading} error={registerError || error} />
                </div>

                {/* Benefits */}
                <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Why Join Us?</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Access to 500+ rare stamps
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Secure NPDA wallet for easy payments
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Connect with philatelists nationwide
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Track orders and delivery in real-time
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Register