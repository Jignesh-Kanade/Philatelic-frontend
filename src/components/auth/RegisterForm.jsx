import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi'
import Input from '../common/Input'
import Button from '../common/Button'
import { validateRegisterForm } from '../../utils/validators'

const RegisterForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validateRegisterForm(
            formData.name,
            formData.email,
            formData.password,
            formData.confirmPassword,
            formData.phone
        )

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                icon={<FiUser />}
                error={errors.name}
                required
            />

            <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={<FiMail />}
                error={errors.email}
                required
            />

            <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                icon={<FiPhone />}
                error={errors.phone}
                required
            />

            <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                icon={<FiLock />}
                error={errors.password}
                required
            />

            <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                icon={<FiLock />}
                error={errors.confirmPassword}
                required
            />

            <div className="flex items-start gap-2">
                <input type="checkbox" className="w-4 h-4 mt-1 text-primary-600 rounded" required />
                <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                        Privacy Policy
                    </Link>
                </span>
            </div>

            <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                    Sign in here
                </Link>
            </div>
        </form>
    )
}

export default RegisterForm