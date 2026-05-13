import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchPostById,
    deletePost,
    addComment,
    deleteComment,
    toggleLike
} from '../redux/slices/forumSlice'
import CommentSection from '../components/forum/CommentSection'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import { FiArrowLeft, FiHeart, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi'
import { formatDateTime } from '../utils/helpers'

const ForumPostDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentPost, loading } = useSelector((state) => state.forum)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        dispatch(fetchPostById(id))
    }, [id, dispatch])

    useEffect(() => {
        if (currentPost && user) {
            setIsLiked(currentPost.likes?.includes(user._id))
        }
    }, [currentPost, user])

    const handleLike = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        await dispatch(toggleLike(id))
        setIsLiked(!isLiked)
    }

    const handleAddComment = async (content) => {
        await dispatch(addComment({ postId: id, content }))
    }

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            await dispatch(deleteComment({ postId: id, commentId }))
        }
    }

    const handleDeletePost = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const result = await dispatch(deletePost(id))
            if (deletePost.fulfilled.match(result)) {
                navigate('/forum')
            }
        }
    }

    if (loading || !currentPost) {
        return <Loader fullScreen />
    }

    const isAuthor = user?._id === currentPost.user?._id
    const isAdmin = user?.role === 'admin'

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-4xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/forum')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 font-medium transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Forum
                </button>

                {/* Post Content */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {currentPost.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-lg">
                                    {currentPost.user?.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {formatDateTime(currentPost.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                {currentPost.category}
                            </span>
                            {(isAuthor || isAdmin) && (
                                <Button
                                    onClick={handleDeletePost}
                                    variant="danger"
                                    size="small"
                                    icon={<FiTrash2 />}
                                >
                                    Delete
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {currentPost.title}
                    </h1>

                    {/* Tags */}
                    {currentPost.tags && currentPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {currentPost.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose max-w-none mb-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {currentPost.content}
                        </p>
                    </div>

                    {/* Badges */}
                    {(currentPost.isPinned || currentPost.isLocked) && (
                        <div className="flex gap-2 mb-6">
                            {currentPost.isPinned && (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                    📌 Pinned
                                </span>
                            )}
                            {currentPost.isLocked && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                    🔒 Locked
                                </span>
                            )}
                        </div>
                    )}

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <FiEye className="w-4 h-4" />
                                <span>{currentPost.views || 0} Views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiHeart className="w-4 h-4" />
                                <span>{currentPost.likes?.length || 0} Likes</span>
                            </div>
                        </div>

                        {isAuthenticated && (
                            <Button
                                onClick={handleLike}
                                variant={isLiked ? 'primary' : 'outline'}
                                size="small"
                                icon={<FiHeart className={isLiked ? 'fill-current' : ''} />}
                            >
                                {isLiked ? 'Liked' : 'Like'}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Comments */}
                <CommentSection
                    comments={currentPost.comments}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                    postLocked={currentPost.isLocked}
                />
            </div>
        </div>
    )
}

export default ForumPostDetail