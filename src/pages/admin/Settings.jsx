import React, { useState } from 'react'
import { FiMenu, FiSave, FiSettings as FiSettingsIcon } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const Settings = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [saved, setSaved] = useState(false)
    const [settings, setSettings] = useState({
        siteName: 'Philately India',
        siteEmail: 'support@philatelyindia.gov.in',
        sitePhone: '+91-11-2334-5678',
        freeDeliveryThreshold: 500,
        defaultTax: 0,
        enableRegistration: true,
        enableOrders: true,
        maintenanceMode: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In production, this would save to backend
        console.log('Settings saved:', settings)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <FiSettingsIcon className="w-7 h-7" />
                                Settings
                            </h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        {saved && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
                                ✓ Settings saved successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* General Settings */}
                            <div className="bg-white rounded-xl shadow-md p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">General Settings</h2>
                                <div className="space-y-6">
                                    <Input
                                        label="Site Name"
                                        name="siteName"
                                        value={settings.siteName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        label="Support Email"
                                        type="email"
                                        name="siteEmail"
                                        value={settings.siteEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        label="Support Phone"
                                        name="sitePhone"
                                        value={settings.sitePhone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Order Settings */}
                            <div className="bg-white rounded-xl shadow-md p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Settings</h2>
                                <div className="space-y-6">
                                    <Input
                                        label="Free Delivery Threshold (₹)"
                                        type="number"
                                        name="freeDeliveryThreshold"
                                        value={settings.freeDeliveryThreshold}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        label="Default Tax (%)"
                                        type="number"
                                        name="defaultTax"
                                        value={settings.defaultTax}
                                        onChange={handleChange}
                                    />
                                    <p className="text-sm text-gray-600">
                                        Orders above the threshold will have free delivery. Currently set to ₹{settings.freeDeliveryThreshold}
                                    </p>
                                </div>
                            </div>

                            {/* Feature Toggles */}
                            <div className="bg-white rounded-xl shadow-md p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Feature Controls</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">User Registration</h3>
                                            <p className="text-sm text-gray-600">Allow new users to register</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="enableRegistration"
                                                checked={settings.enableRegistration}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Online Orders</h3>
                                            <p className="text-sm text-gray-600">Allow users to place orders</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="enableOrders"
                                                checked={settings.enableOrders}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Maintenance Mode</h3>
                                            <p className="text-sm text-red-600">Site will be unavailable to users</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="maintenanceMode"
                                                checked={settings.maintenanceMode}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* System Information */}
                            <div className="bg-white rounded-xl shadow-md p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">System Information</h2>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Version</span>
                                        <span className="font-semibold text-gray-900">1.0.0</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Platform</span>
                                        <span className="font-semibold text-gray-900">React + Node.js</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Database</span>
                                        <span className="font-semibold text-gray-900">MongoDB</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Last Updated</span>
                                        <span className="font-semibold text-gray-900">
                                            {new Date().toLocaleDateString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    icon={<FiSave />}
                                >
                                    Save Settings
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Settings