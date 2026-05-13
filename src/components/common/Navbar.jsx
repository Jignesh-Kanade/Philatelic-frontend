import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { FiMenu, FiHeart, FiX, FiShoppingCart, FiUser, FiLogOut, FiGrid } from 'react-icons/fi'
import { RiAdminLine } from 'react-icons/ri'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { isAuthenticated, user, logout, isAdmin } = useAuth()
    const { totalQuantity } = useCart()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setDropdownOpen(false)
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">📮</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 hidden sm:block">
                            Philately India
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Stamps
                        </Link>
                        <Link to="/forum" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Forum
                        </Link>
                        <Link to="/events" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Events
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Cart */}
                        {isAuthenticated && (
                            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                                <FiShoppingCart className="w-6 h-6" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalQuantity}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-gray-700 font-medium">{user?.name}</span>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <FiUser className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <FiGrid className="w-4 h-4" />
                                            <span>My Orders</span>
                                        </Link>
                                        <Link
                                            to="/wallet"
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <span>💰</span>
                                            <span>NPDA Wallet</span>
                                        </Link>
                                        <Link
                                            to="/interests"
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <FiHeart className="w-4 h-4" />
                                            <span>My Interests</span>
                                        </Link>
                                        {isAdmin && (
                                            <>
                                                <hr className="my-2" />
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-gray-100"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <RiAdminLine className="w-4 h-4" />
                                                    <span>Admin Panel</span>
                                                </Link>
                                            </>
                                        )}
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                                        >
                                            <FiLogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="btn-outline py-2 px-4">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary py-2 px-4">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-primary-600"
                    >
                        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-3">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Stamps
                            </Link>
                            <Link
                                to="/forum"
                                className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Forum
                            </Link>
                            <Link
                                to="/events"
                                className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Events
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <hr className="my-2" />
                                    <Link
                                        to="/cart"
                                        className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded flex items-center justify-between"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span>Cart</span>
                                        {totalQuantity > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {totalQuantity}
                                            </span>
                                        )}
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        to="/wallet"
                                        className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        NPDA Wallet
                                    </Link>
                                    <Link
                                        to="/interests"
                                        className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Interests
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="text-primary-600 hover:text-primary-700 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            setIsOpen(false)
                                        }}
                                        className="text-red-600 hover:text-red-700 font-medium px-4 py-2 hover:bg-gray-50 rounded text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <hr className="my-2" />
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-primary-600 font-medium px-4 py-2 hover:bg-gray-50 rounded"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn-primary text-center"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar