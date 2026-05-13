import React from 'react'
import { Link } from 'react-router-dom'
import { FiTarget, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'

const About = () => {
    const features = [
        {
            icon: FiTarget,
            title: 'Our Mission',
            description: 'To digitalize and preserve India\'s rich philatelic heritage while making stamp collecting accessible to everyone across the nation.',
            color: 'bg-blue-500'
        },
        {
            icon: FiUsers,
            title: 'Community First',
            description: 'Building a vibrant community of philatelists who can connect, share knowledge, and celebrate their passion for stamps together.',
            color: 'bg-green-500'
        },
        {
            icon: FiAward,
            title: 'Authenticity Guaranteed',
            description: 'Every stamp on our platform is verified and authenticated. We ensure 100% genuine stamps from official sources.',
            color: 'bg-yellow-500'
        },
        {
            icon: FiTrendingUp,
            title: 'Innovation',
            description: 'Leveraging modern technology to create a seamless experience with NPDA wallet, real-time tracking, and digital catalogs.',
            color: 'bg-purple-500'
        }
    ]

    const milestones = [
        { year: '2024', title: 'Platform Launch', description: 'Launched India\'s first unified digital philately platform' },
        { year: '2024', title: '500+ Stamps', description: 'Curated collection of rare and commemorative stamps' },
        { year: '2024', title: '2000+ Users', description: 'Growing community of passionate collectors' },
        { year: '2024', title: 'NPDA Integration', description: 'Secure wallet system for seamless transactions' }
    ]

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white py-20">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Philately India
                        </h1>
                        <p className="text-xl text-gray-100 leading-relaxed">
                            India's premier digital platform dedicated to preserving and promoting the art of stamp collecting.
                            We bridge tradition with technology to create a unified ecosystem for philatelists nationwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Philately India was born from a simple observation: stamp collectors across India faced
                                    fragmented information, limited access to catalogs, and no unified platform to connect with
                                    fellow enthusiasts.
                                </p>
                                <p>
                                    We recognized that while stamp collecting has a rich heritage in India, the digital infrastructure
                                    was lacking. Collectors struggled with outdated websites, missed new releases, and had no
                                    convenient way to purchase stamps online.
                                </p>
                                <p>
                                    Our platform solves these challenges by providing a comprehensive digital ecosystem that includes
                                    a searchable catalog, secure NPDA wallet for transactions, community forums for discussions,
                                    and an events calendar for exhibitions and workshops.
                                </p>
                                <p className="font-semibold text-primary-700">
                                    Today, we're proud to serve thousands of philatelists and continue growing as India's most
                                    trusted digital philately platform.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 rounded-3xl transform rotate-3"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                                        <div className="text-gray-600">Rare Stamps</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">2000+</div>
                                        <div className="text-gray-600">Active Users</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
                                        <div className="text-gray-600">Orders Delivered</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                                        <div className="text-gray-600">Authentic</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our core values and commitments that drive everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                                    <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Milestones Timeline */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Journey
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Key milestones in our mission to revolutionize philately in India
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{milestone.year}</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                                        <p className="text-gray-600">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Built with Passion
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            This platform is a college project developed with dedication to solve real-world problems
                            faced by Indian philatelists.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 text-center">Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
                            <div>
                                <h4 className="font-semibold mb-2">Technology Stack</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• Frontend: React + Vite + Tailwind CSS</li>
                                    <li>• Backend: Node.js + Express</li>
                                    <li>• Database: MongoDB</li>
                                    <li>• State Management: Redux Toolkit</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Key Features</h4>
                                <ul className="space-y-1 text-sm">
                                    <li>• NPDA Wallet System</li>
                                    <li>• Order Management</li>
                                    <li>• Admin Dashboard</li>
                                    <li>• Responsive Design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Join Our Community Today
                    </h2>
                    <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                        Be part of India's largest digital philately platform
                    </p>
                    <Link to="/register" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default About