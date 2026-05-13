import React, { useEffect, useState } from 'react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import UserTable from '../../components/admin/UserTable'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'
import { getAllUsers, updateUserStatus, deleteUser } from '../../services/userService'

const ManageUsers = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            setLoading(true)
            const response = await getAllUsers()
            setUsers(response.users || [])
        } catch (error) {
            console.error('Error loading users:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (user) => {
        // For simplicity, edit functionality can be added later
        console.log('Edit user:', user)
        alert('Edit user functionality - to be implemented')
    }

    const handleDelete = (userId) => {
        setSelectedUserId(userId)
        setDeleteModal(true)
    }

    const confirmDelete = async () => {
        try {
            await deleteUser(selectedUserId)
            setDeleteModal(false)
            loadUsers()
        } catch (error) {
            console.error('Error deleting user:', error)
            alert('Failed to delete user')
        }
    }

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            await updateUserStatus(userId, !currentStatus)
            loadUsers()
        } catch (error) {
            console.error('Error updating user status:', error)
            alert('Failed to update user status')
        }
    }

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Total Users</div>
                                <div className="text-3xl font-bold text-gray-900">{users.length}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Active Users</div>
                                <div className="text-3xl font-bold text-green-600">
                                    {users.filter(u => u.isActive !== false).length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Admins</div>
                                <div className="text-3xl font-bold text-purple-600">
                                    {users.filter(u => u.role === 'admin').length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Collectors</div>
                                <div className="text-3xl font-bold text-blue-600">
                                    {users.filter(u => u.role === 'user').length}
                                </div>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search users by name or email..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        {/* Users Table */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            All Users ({filteredUsers.length})
                                        </h2>
                                    </div>
                                </div>
                                <UserTable
                                    users={filteredUsers}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onToggleStatus={handleToggleStatus}
                                />
                            </>
                        )}
                    </div>
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete this user? This action cannot be undone and will permanently
                        remove all user data including orders and wallet transactions.
                    </p>
                    <div className="flex gap-3">
                        <Button onClick={confirmDelete} variant="danger" fullWidth>
                            Delete User
                        </Button>
                        <Button onClick={() => setDeleteModal(false)} variant="secondary" fullWidth>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageUsers