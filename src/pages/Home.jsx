import React from "react";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiCalendar, FiArrowRight } from 'react-icons/fi'
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import Testimonials from "../components/home/Testimonials";
import Button from '../components/common/Button'

const Home = () => {
    return (
        <div>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Testimonials />

            {/* Additional Features Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Philately India?
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Experience the best digital platform for stamp collecting in India
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Secure NPDA Wallet
                            </h3>
                            <p className="text-gray-600">
                                Government-backed digital wallet for safe and hassle-free
                                transactions. Add money once and buy multiple stamps seamlessly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📦</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Fast Delivery
                            </h3>
                            <p className="text-gray-600">
                                Track your orders in real-time. Physical stamps delivered to
                                your doorstep within 5–7 business days via India Post.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💬</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Community Forum
                            </h3>
                            <p className="text-gray-600">
                                Connect with fellow philatelists, share knowledge, discuss rare
                                stamps, and stay updated on exhibitions and events.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Your Collection?
                    </h2>
                    <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of philatelists and discover rare Indian stamps today
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-block bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Create Free Account
                        </Link>

                        <Link
                            to="/products"
                            className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors"
                        >
                            Browse Catalog
                        </Link>
                    </div>
                </div>
            </section>

            {/* Forum Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Join Our Community Forum
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                Connect with fellow philatelists, share knowledge, discuss stamp values,
                                and trade with collectors nationwide. Our community is here to help you
                                grow your collection and expertise.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-600">✓</span>
                                    </div>
                                    <span>Ask questions and get expert advice</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-600">✓</span>
                                    </div>
                                    <span>Share your collection and discoveries</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-primary-600">✓</span>
                                    </div>
                                    <span>Learn about stamp history and valuations</span>
                                </li>
                            </ul>
                            <Link to="/forum">
                                <Button variant="primary" icon={<FiMessageCircle />}>
                                    Visit Forum
                                </Button>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl blur-3xl opacity-30"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-primary-600 rounded-full"></div>
                                                <div className="flex-grow">
                                                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                                                    <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-3xl blur-3xl opacity-30"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                                <div className="space-y-4">
                                    {[
                                        { icon: '🎨', title: 'Stamp Exhibition', date: 'Next Week' },
                                        { icon: '📚', title: 'Philately Workshop', date: 'This Month' },
                                        { icon: '🏛️', title: 'Museum Tour', date: 'Coming Soon' }
                                    ].map((event, index) => (
                                        <div key={index} className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="text-4xl">{event.icon}</div>
                                                <div className="flex-grow">
                                                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                                    <p className="text-sm text-gray-600">{event.date}</p>
                                                </div>
                                                <FiCalendar className="w-5 h-5 text-primary-600" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Discover Philatelic Events
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                Stay updated with workshops, exhibitions, seminars, and meetups happening
                                across India. Network with collectors and learn from experts in the field.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-yellow-600">✓</span>
                                    </div>
                                    <span>Attend exhibitions and auctions</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-yellow-600">✓</span>
                                    </div>
                                    <span>Participate in educational workshops</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-yellow-600">✓</span>
                                    </div>
                                    <span>RSVP and never miss an event</span>
                                </li>
                            </ul>
                            <Link to="/events">
                                <Button variant="primary" icon={<FiCalendar />}>
                                    View Events Calendar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
