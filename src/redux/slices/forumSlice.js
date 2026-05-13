import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

const initialState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
}

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Async thunks
export const fetchPosts = createAsyncThunk(
    'forum/fetchPosts',
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams(params).toString()
            const response = await api.get(`/forum?${queryParams}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts')
        }
    }
)

export const fetchPostById = createAsyncThunk(
    'forum/fetchPostById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/forum/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch post')
        }
    }
)

export const createPost = createAsyncThunk(
    'forum/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const response = await api.post('/forum', postData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create post')
        }
    }
)

export const updatePost = createAsyncThunk(
    'forum/updatePost',
    async ({ id, postData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/forum/${id}`, postData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update post')
        }
    }
)

export const deletePost = createAsyncThunk(
    'forum/deletePost',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/forum/${id}`)
            return { id, ...response.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete post')
        }
    }
)

export const addComment = createAsyncThunk(
    'forum/addComment',
    async ({ postId, content }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/forum/${postId}/comments`, { content })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add comment')
        }
    }
)

export const deleteComment = createAsyncThunk(
    'forum/deleteComment',
    async ({ postId, commentId }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/forum/${postId}/comments/${commentId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete comment')
        }
    }
)

export const toggleLike = createAsyncThunk(
    'forum/toggleLike',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/forum/${postId}/like`)
            return { postId, ...response.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to toggle like')
        }
    }
)

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        clearCurrentPost: (state) => {
            state.currentPost = null
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload.posts || action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || action.payload
            })
            // Fetch Post by ID
            .addCase(fetchPostById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.loading = false
                state.currentPost = action.payload.post
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Create Post
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload.post)
            })
            // Delete Post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post._id !== action.payload.id)
            })
            // Add Comment
            .addCase(addComment.fulfilled, (state, action) => {
                state.currentPost = action.payload.post
            })
            // Toggle Like
            .addCase(toggleLike.fulfilled, (state, action) => {
                const post = state.posts.find(p => p._id === action.payload.postId)
                if (post) {
                    post.likes = post.likes || []
                    // Update likes count based on response
                }
                if (state.currentPost && state.currentPost._id === action.payload.postId) {
                    // Update current post likes
                }
            })
    },
})

export const { clearCurrentPost, clearError } = forumSlice.actions
export default forumSlice.reducer