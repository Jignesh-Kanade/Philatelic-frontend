import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiTrash2, FiSend } from 'react-icons/fi'
import { formatDateTime } from '../../utils/helpers'
import Button from '../common/Button'

const CommentSection = ({ comments, onAddComment, onDeleteComment, postLocked }) => {
    const { user } = useSelector((state) => state.auth)
    const [newComment, setNewComment] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setLoading(true)
        await onAddComment(newComment)
        setNewComment('')
        setLoading(false)
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
                Comments ({comments?.length || 0})
            </h3>

            {/* Add Comment Form */}
            {!postLocked && user && (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">
                                {user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-grow">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                rows="3"
                                className="input-field resize-none"
                            />
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="small"
                                    disabled={loading || !newComment.trim()}
                                    icon={<FiSend />}
                                >
                                    {loading ? 'Posting...' : 'Post Comment'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {postLocked && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 text-sm">
                        🔒 This post is locked. No new comments can be added.
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="flex gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">
                                    {comment.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-grow">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <span className="font-semibold text-gray-900">{comment.user?.name}</span>
                                            <span className="text-sm text-gray-500 ml-3">
                                                {formatDateTime(comment.createdAt)}
                                            </span>
                                        </div>
                                        {(user?._id === comment.user?._id || user?.role === 'admin') && (
                                            <button
                                                onClick={() => onDeleteComment(comment._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection