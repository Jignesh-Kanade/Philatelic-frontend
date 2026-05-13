import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
    FiGrid,
    FiPackage,
    FiShoppingBag,
    FiUsers,
    FiSettings,
    FiHome,
    FiX,
    FiMessageCircle,
    FiCalendar,
    FiHeart
} from 'react-icons/fi'

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation()

    const menuItems = [
        { path: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
        { path: '/admin/products', icon: FiPackage, label: 'Manage Stamps' },
        { path: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
        { path: '/admin/users', icon: FiUsers, label: 'Users' },
        { path: '/admin/forum', icon: FiMessageCircle, label: 'Forum' },
        { path: '/admin/events', icon: FiCalendar, label: 'Events' },
        { path: '/admin/interests', icon: FiHeart, label: 'Interest Stats' },
        { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen bg-white shadow-xl z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } w-64 flex flex-col`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">📮</span>
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">Admin Panel</h2>
                            <p className="text-xs text-gray-500">Philately India</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                        {/* Back to Site */}
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-4 border border-gray-200"
                        >
                            <FiHome className="w-5 h-5" />
                            <span className="font-medium">Back to Site</span>
                        </Link>

                        {/* Menu Items */}
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                        ? 'bg-primary-50 text-primary-700 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                            Need Help?
                        </p>
                        <p className="text-xs text-gray-600 mb-3">
                            Check our documentation for guides and tutorials
                        </p>
                        <button className="text-xs text-primary-600 font-semibold hover:text-primary-700">
                            View Docs →
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar