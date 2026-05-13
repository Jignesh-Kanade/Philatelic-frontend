import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import DashboardStats from '../../components/admin/DashboardStats'
import { getUserStats } from '../../services/userService'
import { Line, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats, setStats] = useState({
        totalRevenue: 125000,
        totalOrders: 245,
        totalUsers: 1850,
        totalProducts: 487
    })

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            const response = await getUserStats()
            setStats(response.stats)
        } catch (error) {
            console.error('Error loading stats:', error)
        }
    }

    // Sample data for charts
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue (₹)',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: 'rgb(6, 132, 199)',
                backgroundColor: 'rgba(6, 132, 199, 0.1)',
                tension: 0.4,
            },
        ],
    }

    const ordersData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Orders',
                data: [12, 19, 15, 25, 22, 30, 28],
                backgroundColor: 'rgba(6, 132, 199, 0.8)',
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
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
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                <p className="text-sm text-gray-500">Welcome back, Admin!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500">Super Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Stats */}
                        <DashboardStats stats={stats} />

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Revenue Chart */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h3>
                                <div className="h-80">
                                    <Line data={revenueData} options={chartOptions} />
                                </div>
                            </div>

                            {/* Orders Chart */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Orders</h3>
                                <div className="h-80">
                                    <Bar data={ordersData} options={chartOptions} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {[
                                    { type: 'order', message: 'New order #ORD-12345 placed', time: '5 minutes ago', color: 'bg-blue-100 text-blue-600' },
                                    { type: 'user', message: 'New user registration: John Doe', time: '15 minutes ago', color: 'bg-green-100 text-green-600' },
                                    { type: 'product', message: 'Stock updated for Heritage Stamp', time: '1 hour ago', color: 'bg-yellow-100 text-yellow-600' },
                                    { type: 'order', message: 'Order #ORD-12340 delivered', time: '2 hours ago', color: 'bg-purple-100 text-purple-600' },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                                            {activity.type === 'order' && '📦'}
                                            {activity.type === 'user' && '👤'}
                                            {activity.type === 'product' && '📮'}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-gray-900 font-medium">{activity.message}</p>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <a href="/admin/products/add" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-3">➕</div>
                                <h3 className="text-xl font-bold mb-2">Add New Stamp</h3>
                                <p className="text-blue-100">Add stamps to the catalog</p>
                            </a>

                            <a href="/admin/orders" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-3">📋</div>
                                <h3 className="text-xl font-bold mb-2">Manage Orders</h3>
                                <p className="text-purple-100">View and update orders</p>
                            </a>

                            <a href="/admin/users" className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-3">👥</div>
                                <h3 className="text-xl font-bold mb-2">Manage Users</h3>
                                <p className="text-green-100">View all registered users</p>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard