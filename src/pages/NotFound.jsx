import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiArrowLeft } from 'react-icons/fi'
import Button from '../components/common/Button'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
                    <div className="text-6xl mb-6">📭</div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                        <Button variant="primary" size="large" icon={<FiHome />}>
                            Go to Homepage
                        </Button>
                    </Link>
                    <button onClick={() => window.history.back()}>
                        <Button variant="outline" size="large" icon={<FiArrowLeft />}>
                            Go Back
                        </Button>
                    </button>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">Looking for something specific?</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
                            Browse Stamps
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/about" className="text-primary-600 hover:text-primary-700 font-medium">
                            About Us
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                            Contact Support
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/wallet" className="text-primary-600 hover:text-primary-700 font-medium">
                            My Wallet
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound