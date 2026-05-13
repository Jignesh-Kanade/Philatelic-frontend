import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchUserOrders } from '../redux/slices/orderSlice'
import { formatCurrency, formatDateTime, getStatusColor } from '../utils/helpers'
import { FiPackage, FiCheckCircle } from 'react-icons/fi'
import Loader from '../components/common/Loader'

const Orders = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { orders, loading } = useSelector((state) => state.order)
    const [showSuccess, setShowSuccess] = useState(false)

    // useEffect(() => {
    //     dispatch(fetchUserOrders())
    //     if (location.state?.orderPlaced) {
    //         setShowSuccess(true)
    //         setTimeout(() => setShowSuccess(false), 5000)
    //     }
    // }, [dispatch, location])
    useEffect(() => {
        dispatch(fetchUserOrders())
    }, [])  // ← Empty array, runs once

    if (loading) {
        return <Loader fullScreen />
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <FiPackage className="w-8 h-8" />
                    My Orders
                </h1>

                {showSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-green-900">Order Placed Successfully!</h3>
                            <p className="text-sm text-green-700">
                                Your order has been confirmed. You can track its status below.
                            </p>
                        </div>
                    </div>
                )}

                {orders && orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-gray-600">Order ID</p>
                                            <p className="font-mono font-semibold text-gray-900">
                                                {order.orderId || order._id.slice(-8).toUpperCase()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Order Date</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatDateTime(order.createdAt)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Total Amount</p>
                                            <p className="text-xl font-bold text-primary-600">
                                                {formatCurrency(order.totalAmount)}
                                            </p>
                                        </div>
                                        <div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                                    <div className="space-y-3">
                                        {order.items?.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    {item.product?.imageUrl ? (
                                                        <img
                                                            src={item.product.imageUrl}
                                                            alt={item.product?.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl">
                                                            📮
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-medium text-gray-900">
                                                        {item.product?.name || 'Product Name'}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        Quantity: {item.quantity} × {formatCurrency(item.price)}
                                                    </p>
                                                </div>
                                                <div className="font-semibold text-gray-900">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping Address */}
                                    {order.shippingAddress && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                                            <p className="text-gray-600 text-sm">
                                                {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                                                {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                        <p className="text-gray-600 mb-6">
                            You haven't placed any orders yet. Start exploring our stamp collection!
                        </p>
                        <a href="/products" className="btn-primary inline-block">
                            Browse Stamps
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders