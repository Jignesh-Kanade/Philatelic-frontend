import React, { useEffect, useState } from 'react'
import { FiMenu, FiFilter } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import OrderTable from '../../components/admin/OrderTable'
import Modal from '../../components/common/Modal'
import Loader from '../../components/common/Loader'
import { getAllOrders, updateOrderStatus } from '../../services/oderService'
import { formatCurrency, formatDateTime } from '../../utils/helpers'

const ManageOrders = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [detailsModal, setDetailsModal] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            setLoading(true)
            const response = await getAllOrders()
            setOrders(response.orders || [])
        } catch (error) {
            console.error('Error loading orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus)
            loadOrders()
        } catch (error) {
            console.error('Error updating order status:', error)
            alert('Failed to update order status')
        }
    }

    const handleViewDetails = (order) => {
        setSelectedOrder(order)
        setDetailsModal(true)
    }

    const filteredOrders = statusFilter === 'all'
        ? orders
        : orders.filter(order => order.status === statusFilter)

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
                            <h1 className="text-2xl font-bold text-gray-900">Manage Orders</h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Filter */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center gap-4">
                                <FiFilter className="w-5 h-5 text-gray-400" />
                                <div className="flex gap-2 flex-wrap">
                                    {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setStatusFilter(status)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === status
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Total Orders</div>
                                <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Pending</div>
                                <div className="text-3xl font-bold text-yellow-600">
                                    {orders.filter(o => o.status === 'pending').length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Processing</div>
                                <div className="text-3xl font-bold text-blue-600">
                                    {orders.filter(o => o.status === 'processing').length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Delivered</div>
                                <div className="text-3xl font-bold text-green-600">
                                    {orders.filter(o => o.status === 'delivered').length}
                                </div>
                            </div>
                        </div>

                        {/* Orders Table */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <OrderTable
                                orders={filteredOrders}
                                onStatusChange={handleStatusChange}
                                onViewDetails={handleViewDetails}
                            />
                        )}
                    </div>
                </main>
            </div>

            {/* Order Details Modal */}
            <Modal
                isOpen={detailsModal}
                onClose={() => setDetailsModal(false)}
                title="Order Details"
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        {/* Order Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Order ID</div>
                                <div className="font-semibold text-gray-900">
                                    {selectedOrder.orderId || selectedOrder._id.slice(-8).toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Order Date</div>
                                <div className="font-semibold text-gray-900">
                                    {formatDateTime(selectedOrder.createdAt)}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Customer</div>
                                <div className="font-semibold text-gray-900">{selectedOrder.user?.name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                                <div className="font-semibold text-primary-600">
                                    {formatCurrency(selectedOrder.totalAmount)}
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                            <div className="space-y-2">
                                {selectedOrder.items?.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b">
                                        <span className="text-gray-700">{item.product?.name}</span>
                                        <span className="font-semibold">
                                            {item.quantity} × {formatCurrency(item.price)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        {selectedOrder.shippingAddress && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                                <p className="text-gray-700">
                                    {selectedOrder.shippingAddress.street}<br />
                                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                                    Pincode: {selectedOrder.shippingAddress.pincode}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ManageOrders