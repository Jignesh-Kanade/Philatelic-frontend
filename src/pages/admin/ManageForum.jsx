import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiMenu, FiLock, FiUnlock, FiMapPin, FiTrash2 } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import { fetchPosts, deletePost } from '../../redux/slices/forumSlice'
import { formatDateTime } from '../../utils/helpers'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

const ManageForum = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const { posts = [], loading } = useSelector((state) => state.forum)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const handleTogglePin = async (postId, currentStatus) => {
        try {
            const token = localStorage.getItem('token')
            await axios.put(
                `${API_URL}/forum/${postId}/pin`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            dispatch(fetchPosts())
            alert(currentStatus ? 'Post unpinned' : 'Post pinned')
        } catch (error) {
            alert('Failed to toggle pin')
        }
    }

    const handleToggleLock = async (postId, currentStatus) => {
        try {
            const token = localStorage.getItem('token')
            await axios.put(
                `${API_URL}/forum/${postId}/lock`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            dispatch(fetchPosts())
            alert(currentStatus ? 'Post unlocked' : 'Post locked')
        } catch (error) {
            alert('Failed to toggle lock')
        }
    }

    const handleDelete = async (postId) => {
        if (window.confirm('Delete this post permanently?')) {
            await dispatch(deletePost(postId))
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
                            <h1 className="text-2xl font-bold text-gray-900">Manage Forum</h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Total Posts</div>
                                <div className="text-3xl font-bold text-gray-900">{posts.length}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Pinned Posts</div>
                                <div className="text-3xl font-bold text-yellow-600">
                                    {posts.filter(p => p.isPinned).length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Locked Posts</div>
                                <div className="text-3xl font-bold text-red-600">
                                    {posts.filter(p => p.isLocked).length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Total Comments</div>
                                <div className="text-3xl font-bold text-blue-600">
                                    {posts.reduce((acc, p) => acc + (p.comments?.length || 0), 0)}
                                </div>
                            </div>
                        </div>

                        {/* Posts Table */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Post
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Author
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Category
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Stats
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {posts.map((post) => (
                                            <tr key={post._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs">
                                                        <div className="font-semibold text-gray-900 truncate">
                                                            {post.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {formatDateTime(post.createdAt)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{post.user?.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                                        {post.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <div>{post.views || 0} views</div>
                                                    <div>{post.likes?.length || 0} likes</div>
                                                    <div>{post.comments?.length || 0} comments</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {post.isPinned && (
                                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                                                                📌 Pinned
                                                            </span>
                                                        )}
                                                        {post.isLocked && (
                                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                                                🔒 Locked
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleTogglePin(post._id, post.isPinned)}
                                                            className={`p-2 rounded-lg transition-colors ${post.isPinned
                                                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                }`}
                                                            title={post.isPinned ? 'Unpin' : 'Pin'}
                                                        >
                                                            <FiMapPin className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleLock(post._id, post.isLocked)}
                                                            className={`p-2 rounded-lg transition-colors ${post.isLocked
                                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                }`}
                                                            title={post.isLocked ? 'Unlock' : 'Lock'}
                                                        >
                                                            {post.isLocked ? (
                                                                <FiLock className="w-4 h-4" />
                                                            ) : (
                                                                <FiUnlock className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(post._id)}
                                                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ManageForum