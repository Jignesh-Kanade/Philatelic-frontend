import React from 'react'
import { Link } from 'react-router-dom'
import { FiMessageCircle, FiHeart, FiEye, FiClock } from 'react-icons/fi'
import { formatDateTime } from '../../utils/helpers'

const ForumPostCard = ({ post }) => {
    return (
        <Link to={`/forum/${post._id}`}>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                {post.user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">{post.user?.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FiClock className="w-3 h-3" />
                                <span>{formatDateTime(post.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {post.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {post.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.content}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <FiMessageCircle className="w-4 h-4" />
                        <span>{post.comments?.length || 0} Comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiHeart className="w-4 h-4" />
                        <span>{post.likes?.length || 0} Likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiEye className="w-4 h-4" />
                        <span>{post.views || 0} Views</span>
                    </div>
                </div>

                {/* Pinned/Locked Badges */}
                {(post.isPinned || post.isLocked) && (
                    <div className="flex gap-2 mt-3">
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
                )}
            </div>
        </Link>
    )
}

export default ForumPostCard