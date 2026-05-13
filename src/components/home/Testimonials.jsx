import React from 'react'
import { FiStar } from 'react-icons/fi'
import { Link } from "react-router-dom";


const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        comment: 'This platform has revolutionized how I collect stamps. The NPDA wallet makes transactions seamless and secure. Highly recommended!',
        avatar: 'RK',
    },
    {
        id: 2,
        name: 'Priya Sharma',
        location: 'Delhi',
        rating: 5,
        comment: 'As a beginner in philately, I found this platform incredibly user-friendly. The catalog is extensive and well-organized.',
        avatar: 'PS',
    },
    {
        id: 3,
        name: 'Anil Verma',
        location: 'Bangalore, Karnataka',
        rating: 5,
        comment: 'The community forum feature is fantastic! I\'ve connected with fellow collectors and learned so much about rare stamps.',
        avatar: 'AV',
    },
    {
        id: 4,
        name: 'Sneha Patel',
        location: 'Ahmedabad, Gujarat',
        rating: 5,
        comment: 'Finally, a centralized platform for Indian philatelists! The interest registration feature ensures I never miss new releases.',
        avatar: 'SP',
    },
]

const Testimonials = () => {
    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Collectors Say
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join thousands of satisfied philatelists who trust our platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                "{testimonial.comment}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                                    <div className="text-gray-500 text-xs">{testimonial.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        to="/register"
                        className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Join Our Community Today
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Testimonials