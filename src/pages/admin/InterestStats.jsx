import React, { useEffect, useState } from 'react'
import { FiMenu, FiTrendingUp, FiHeart } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import Loader from '../../components/common/Loader'
import { formatCurrency } from '../../utils/helpers'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

const InterestStats = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${API_URL}/interests/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setStats(response.data.stats || [])
        } catch (error) {
            console.error('Error loading stats:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">Interest Statistics</h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FiTrendingUp className="w-6 h-6" />
                                    Top 10 Most Wanted Stamps
                                </h2>

                                {stats.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.map((item, index) => (
                                            <div
                                                key={item._id._id}
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white font-bold text-lg">
                                                        #{index + 1}
                                                    </span>
                                                </div>

                                                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    {item._id.imageUrl ? (
                                                        <img
                                                            src={item._id.imageUrl}
                                                            alt={item._id.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-3xl">
                                                            📮
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-grow">
                                                    <h3 className="font-semibold text-gray-900 text-lg">
                                                        {item._id.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{item._id.category}</p>
                                                    <p className="text-sm font-semibold text-primary-600 mt-1">
                                                        {formatCurrency(item._id.price)}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <FiHeart className="w-5 h-5 text-red-500" />
                                                        <span className="text-2xl font-bold text-gray-900">
                                                            {item.count}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">interests</span>
                                                    {item.highPriority > 0 && (
                                                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                                                            {item.highPriority} high priority
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        No interest data available yet
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    💡 How to Use This Data
                                </h3>
                                <ul className="text-blue-800 text-sm space-y-1">
                                    <li>• Use this data to plan future stamp releases</li>
                                    <li>• High interest stamps should have priority production</li>
                                    <li>• High priority interests indicate collectors willing to pay more</li>
                                    <li>• Contact users directly when stamps become available</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default InterestStats