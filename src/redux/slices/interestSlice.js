import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

const initialState = {
    interests: [],
    loading: false,
    error: null,
}

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
export const fetchUserInterests = createAsyncThunk(
    'interest/fetchUserInterests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/interests')
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch interests')
        }
    }
)

export const registerInterest = createAsyncThunk(
    'interest/registerInterest',
    async (interestData, { rejectWithValue }) => {
        try {
            const response = await api.post('/interests', interestData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to register interest')
        }
    }
)

export const removeInterest = createAsyncThunk(
    'interest/removeInterest',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/interests/${id}`)
            return { id, ...response.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove interest')
        }
    }
)

const interestSlice = createSlice({
    name: 'interest',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Interests
            .addCase(fetchUserInterests.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserInterests.fulfilled, (state, action) => {
                state.loading = false
                state.interests = action.payload.interests
            })
            .addCase(fetchUserInterests.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Register Interest
            .addCase(registerInterest.fulfilled, (state, action) => {
                // Check if already exists
                const exists = state.interests.find(i => i._id === action.payload.interest._id)
                if (!exists) {
                    state.interests.unshift(action.payload.interest)
                }
            })
            // Remove Interest
            .addCase(removeInterest.fulfilled, (state, action) => {
                state.interests = state.interests.filter(interest => interest._id !== action.payload.id)
            })
    },
})

export const { clearError } = interestSlice.actions
export default interestSlice.reducer