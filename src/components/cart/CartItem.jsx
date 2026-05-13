import React from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'
import { formatCurrency } from '../../utils/helpers'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const handleIncrement = () => {
        onUpdateQuantity(item._id, item.quantity + 1)
    }

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item._id, item.quantity - 1)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
                {/* Image */}
                <Link to={`/products/${item._id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl">
                                📮
                            </div>
                        )}
                    </div>
                </Link>

                {/* Details */}
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <Link
                                to={`/products/${item._id}`}
                                className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        </div>
                        <button
                            onClick={() => onRemove(item._id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <FiTrash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDecrement}
                                className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                            >
                                <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                                {item.quantity}
                            </span>
                            <button
                                onClick={handleIncrement}
                                className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                            >
                                <FiPlus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                                {formatCurrency(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                                {formatCurrency(item.price)} each
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem