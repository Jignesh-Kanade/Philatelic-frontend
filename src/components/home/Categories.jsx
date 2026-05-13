import React from 'react'
import { Link } from 'react-router-dom'
import { STAMP_CATEGORIES } from '../../utils/constants'

const categoryIcons = {
    'Independence': '🇮🇳',
    'Wildlife': '🦁',
    'Personalities': '👤',
    'Heritage': '🏛️',
    'Sports': '⚽',
    'Art & Culture': '🎨',
    'Science & Technology': '🔬',
    'Flora & Fauna': '🌺',
    'Monuments': '🕌',
    'Events': '🎉',
}

const Categories = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Browse by Category
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find stamps that match your interests from our diverse collection
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {STAMP_CATEGORIES.map((category) => (
                        <Link
                            key={category}
                            to={`/products?category=${category}`}
                            className="group"
                        >
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-2 border-transparent hover:border-primary-500">
                                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
                                    {categoryIcons[category] || '📮'}
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                    {category}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories