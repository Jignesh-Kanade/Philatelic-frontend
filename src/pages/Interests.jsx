import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUserInterests, removeInterest } from '../redux/slices/interestSlice'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import { FiTrash2, FiHeart, FiCalendar, FiShoppingCart } from 'react-icons/fi'
import { formatCurrency, formatDate } from '../utils/helpers'

const Interests = () => {
    const dispatch = useDispatch()
    const { interests, loading } = useSelector((state) => state.interest)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        dispatch(fetchUserInterests())
    }, [dispatch])

    const handleRemove = async (id) => {
        if (window.confirm('Remove this stamp from your interest list?')) {
            setDeletingId(id)
            await dispatch(removeInterest(id))
            setDeletingId(null)
        }
    }

    if (loading && interests.length === 0) {
        return <Loader fullScreen />
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <FiHeart className="w-8 h-8 text-red-500" />
                        My Interests
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Track upcoming stamp releases you're interested in
                    </p>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-blue-900 mb-2">How Interest Registration Works</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Register interest in upcoming stamp releases</li>
                        <li>• Get priority allocation when stamps become available</li>
                        <li>• Receive notifications about release dates (coming soon)</li>
                        <li>• Helps government gauge demand for stamp production</li>
                    </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Total Interests</div>
                        <div className="text-3xl font-bold text-gray-900">{interests.length}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Available Now</div>
                        <div className="text-3xl font-bold text-green-600">
                            {interests.filter(i => i.product?.stock > 0).length}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Coming Soon</div>
                        <div className="text-3xl font-bold text-primary-600">
                            {interests.filter(i =>
                                i.product?.releaseDate && new Date(i.product.releaseDate) > new Date()
                            ).length}
                        </div>
                    </div>
                </div>

                {/* Interests List */}
                {interests.length > 0 ? (
                    <div className="space-y-4">
                        {interests.map((interest) => (
                            <div
                                key={interest._id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <Link
                                        to={`/products/${interest.product._id}`}
                                        className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                                    >
                                        {interest.product?.imageUrl ? (
                                            <img
                                                src={interest.product.imageUrl}
                                                alt={interest.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl">
                                                📮
                                            </div>
                                        )}
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-grow">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                            <div>
                                                <Link
                                                    to={`/products/${interest.product._id}`}
                                                    className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
                                                >
                                                    {interest.product?.name}
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {interest.product?.category}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${interest.priority === 'high'
                                                            ? 'bg-red-100 text-red-700'
                                                            : interest.priority === 'medium'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                        }`}
                                                >
                                                    {interest.priority === 'high'
                                                        ? '⚡ High Priority'
                                                        : interest.priority === 'medium'
                                                            ? '⭐ Medium Priority'
                                                            : '📌 Low Priority'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <span className="font-semibold">Price:</span>
                                                <span className="text-primary-600 font-bold">
                                                    {formatCurrency(interest.product?.price)}
                                                </span>
                                            </div>

                                            {interest.product?.releaseDate && (
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FiCalendar className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        Release: {formatDate(interest.product.releaseDate)}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                {interest.product?.stock > 0 ? (
                                                    <span className="text-sm text-green-600 font-semibold">
                                                        ✓ In Stock ({interest.product.stock} available)
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-red-600 font-semibold">
                                                        ✗ Out of Stock
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3">
                                            {interest.product?.stock > 0 ? (
                                                <Link to={`/products/${interest.product._id}`}>
                                                    <Button variant="primary" size="small" icon={<FiShoppingCart />}>
                                                        Buy Now
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button variant="secondary" size="small" disabled>
                                                    Not Available
                                                </Button>
                                            )}

                                            <Link to={`/products/${interest.product._id}`}>
                                                <Button variant="outline" size="small">
                                                    View Details
                                                </Button>
                                            </Link>

                                            <Button
                                                onClick={() => handleRemove(interest._id)}
                                                variant="danger"
                                                size="small"
                                                icon={<FiTrash2 />}
                                                disabled={deletingId === interest._id}
                                            >
                                                {deletingId === interest._id ? 'Removing...' : 'Remove'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">❤️</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Interests Yet</h3>
                        <p className="text-gray-600 mb-6">
                            Browse our stamp catalog and register interest in upcoming releases
                        </p>
                        <Link to="/products">
                            <Button variant="primary" size="large">
                                Browse Stamps
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Interests