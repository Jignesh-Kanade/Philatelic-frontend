import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, createPost } from '../redux/slices/forumSlice'
import ForumPostCard from '../components/forum/ForumPostCard'
import CreatePostModal from '../components/forum/CreatePostModal'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi'

const FORUM_CATEGORIES = [
    'All',
    'General',
    'Buying/Selling',
    'Stamp Values',
    'History',
    'Exhibitions',
    'Tips & Tricks',
    'Other'
]

const Forum = () => {
    const dispatch = useDispatch()
    const { posts, loading } = useSelector((state) => state.forum)
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('-createdAt')

    useEffect(() => {
        loadPosts()
    }, [selectedCategory, sortBy, searchQuery])

    const loadPosts = () => {
        const params = {}
        if (selectedCategory !== 'All') {
            params.category = selectedCategory
        }
        if (searchQuery) {
            params.search = searchQuery
        }
        params.sort = sortBy
        dispatch(fetchPosts(params))
    }

    const handleSearch = (e) => {
        e.preventDefault()
        loadPosts()
    }

    const handleCreatePost = async (postData) => {
        const result = await dispatch(createPost(postData))
        if (createPost.fulfilled.match(result)) {
            setShowCreateModal(false)
            dispatch(fetchPosts())
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Community Forum
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Connect with fellow philatelists, share knowledge, and discuss stamps
                            </p>
                        </div>
                        {isAuthenticated && (
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                variant="primary"
                                icon={<FiPlus />}
                            >
                                Create Post
                            </Button>
                        )}
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="lg:col-span-2">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search posts..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </form>

                        {/* Sort */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="-createdAt">Latest</option>
                                <option value="createdAt">Oldest</option>
                                <option value="-views">Most Viewed</option>
                                <option value="-likes">Most Liked</option>
                            </select>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                        <FiFilter className="text-gray-400 flex-shrink-0" />
                        {FORUM_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <Loader />
                ) : posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {posts.map((post) => (
                            <ForumPostCard key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Posts Yet</h3>
                        <p className="text-gray-600 mb-6">
                            {selectedCategory !== 'All'
                                ? `No posts found in ${selectedCategory} category`
                                : 'Be the first to start a discussion!'}
                        </p>
                        {isAuthenticated && (
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                variant="primary"
                                icon={<FiPlus />}
                            >
                                Create First Post
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreatePost}
                loading={loading}
            />
        </div>
    )
}

export default Forum