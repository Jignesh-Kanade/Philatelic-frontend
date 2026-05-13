import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductDetails from '../components/product/ProductDetails'
import Loader from '../components/common/Loader'
import { getProductById } from '../services/productService'
import { FiArrowLeft } from 'react-icons/fi'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadProduct()
    }, [id])

    const loadProduct = async () => {
        try {
            setLoading(true)
            const response = await getProductById(id)
            setProduct(response.product)
        } catch (error) {
            console.error('Error loading product:', error)
            setError('Failed to load product details')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loader fullScreen />
    }

    if (error || !product) {
        return (
            <div className="container-custom py-16 text-center">
                <div className="text-6xl mb-4">😔</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                <p className="text-gray-600 mb-6">
                    The stamp you're looking for doesn't exist or has been removed.
                </p>
                <button
                    onClick={() => navigate('/products')}
                    className="btn-primary inline-flex items-center gap-2"
                >
                    <FiArrowLeft />
                    Back to Catalog
                </button>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-medium"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        Back to Catalog
                    </button>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <ProductDetails product={product} />
                </div>

                {/* Related Products Section - You can add this later */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Stamps</h2>
                    <p className="text-gray-500">Related products will be displayed here</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail