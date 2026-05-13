import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ProductCard from '../product/ProductCard'
import Loader from '../common/Loader'
import { getFeaturedProducts } from '../../services/productService'

const FeaturedProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadFeaturedProducts()
    }, [])

    const loadFeaturedProducts = async () => {
        try {
            setLoading(true)
            const response = await getFeaturedProducts()
            setProducts(response.products || [])
        } catch (error) {
            console.error('Error loading featured products:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="py-16">
                <Loader />
            </div>
        )
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Featured Stamps
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Explore our handpicked collection of rare and special stamps
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all duration-200 mt-4 md:mt-0"
                    >
                        View All Stamps
                        <FiArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.slice(0, 8).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No featured stamps available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeaturedProducts