import React from 'react'
import { FiUsers, FiPackage, FiShoppingBag, FiTrendingUp } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa';
import { formatCurrency } from '../../utils/helpers'

const DashboardStats = ({ stats }) => {
    const statCards = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats?.totalRevenue || 0),
            icon: FaRupeeSign,
            color: 'bg-green-500',
            change: '+12.5%',
            changeType: 'increase'
        },
        {
            title: 'Total Orders',
            value: stats?.totalOrders || 0,
            icon: FiShoppingBag,
            color: 'bg-blue-500',
            change: '+8.2%',
            changeType: 'increase'
        },
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: FiUsers,
            color: 'bg-purple-500',
            change: '+15.3%',
            changeType: 'increase'
        },
        {
            title: 'Total Stamps',
            value: stats?.totalProducts || 0,
            icon: FiPackage,
            color: 'bg-orange-500',
            change: '+5.7%',
            changeType: 'increase'
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                <FiTrendingUp className="w-4 h-4" />
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">
                            {stat.title}
                        </h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default DashboardStats