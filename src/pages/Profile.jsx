import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/authSlice'
import { FiUser, FiMail, FiPhone, FiEdit2, FiSave } from 'react-icons/fi'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { updateProfile } from '../services/authService'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setMessage(null)
            const response = await updateProfile(formData)
            dispatch(updateUser(response.user))
            setMessage({ type: 'success', text: 'Profile updated successfully!' })
            setIsEditing(false)
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-3xl">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                            <p className="text-gray-500 text-sm mb-4">{user?.email}</p>
                            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold">
                                {user?.role === 'admin' ? '👑 Admin' : '👤 Collector'}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="text-sm text-gray-600 mb-2">Member Since</div>
                                <div className="font-semibold text-gray-900">
                                    {new Date(user?.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                {!isEditing && (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="outline"
                                        size="small"
                                        icon={<FiEdit2 />}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>

                            {message && (
                                <div
                                    className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success'
                                            ? 'bg-green-50 border border-green-200 text-green-700'
                                            : 'bg-red-50 border border-red-200 text-red-700'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={<FiUser />}
                                    disabled={!isEditing}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={<FiMail />}
                                    disabled={!isEditing}
                                    required
                                />

                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    icon={<FiPhone />}
                                    disabled={!isEditing}
                                    required
                                />

                                {isEditing && (
                                    <div className="flex gap-3 mt-6">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={loading}
                                            icon={<FiSave />}
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false)
                                                setFormData({
                                                    name: user?.name || '',
                                                    email: user?.email || '',
                                                    phone: user?.phone || '',
                                                })
                                            }}
                                            variant="secondary"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Account Stats */}
                        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Statistics</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600">0</div>
                                    <div className="text-sm text-gray-600 mt-1">Total Orders</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-600">₹0</div>
                                    <div className="text-sm text-gray-600 mt-1">Total Spent</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile