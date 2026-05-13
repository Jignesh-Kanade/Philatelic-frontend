import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { FiShoppingCart, FiEye } from 'react-icons/fi'
import { formatCurrency } from '../../utils/helpers'
import Button from '../common/Button'
import { API_URL } from '../../utils/constants'
import { BACKEND_URL } from '../../utils/constants'

const ProductCard = ({ product }) => {
    const { isAuthenticated } = useAuth()
    const { addItem, getItemQuantity } = useCart()
    const quantity = getItemQuantity(product._id)

    const handleAddToCart = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            addItem(product)
        }
    }

    return (
        <Link to={`/products/${product._id}`} className="block group">
            <div className="card p-0 h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 rounded-t-xl aspect-square">
                    {product.image ? (
                        <img
                            src={`${BACKEND_URL}${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                            📮
                        </div>
                    )}

                    {/* Badge */}
                    {product.featured && (
                        <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                        </div>
                    )}

                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Only {product.stock} left
                        </div>
                    )}

                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-grow flex flex-col">
                    {/* Category */}
                    <div className="text-xs text-primary-600 font-medium mb-2">
                        {product.category}
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {product.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {formatCurrency(product.price)}
                            </div>
                            {product.denomination && (
                                <div className="text-xs text-gray-500">
                                    Denomination: ₹{product.denomination}
                                </div>
                            )}
                        </div>

                        {isAuthenticated && product.stock > 0 && (
                            <Button
                                onClick={handleAddToCart}
                                variant={quantity > 0 ? 'success' : 'primary'}
                                size="small"
                                icon={<FiShoppingCart className="w-4 h-4" />}
                            >
                                {quantity > 0 ? `In Cart (${quantity})` : 'Add'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard