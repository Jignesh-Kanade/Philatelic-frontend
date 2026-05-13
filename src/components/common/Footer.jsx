import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">📮</span>
                            </div>
                            <span className="text-xl font-bold text-white">Philately India</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            India's premier digital platform for philatelists. Browse, collect, and trade stamps with secure NPDA wallet transactions.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                <FiFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-primary-400 transition-colors">
                                <FiInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-primary-400 transition-colors text-sm">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-primary-400 transition-colors text-sm">
                                    Browse Stamps
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-primary-400 transition-colors text-sm">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-primary-400 transition-colors text-sm">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/orders" className="hover:text-primary-400 transition-colors text-sm">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link to="/wallet" className="hover:text-primary-400 transition-colors text-sm">
                                    NPDA Wallet
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                                    Returns Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <FiMapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">
                                    Philately Bureau, India Post<br />
                                    New Delhi - 110001
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <span className="text-sm">+91-11-2334-5678</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FiMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <span className="text-sm">support@philatelyindia.gov.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Philately India. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer