import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, register, logout, getCurrentUser } from '../../services/authService'

// const initialState = {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null,
// }
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    authChecked: false,   // 🔑 KEY FIX
}


// Async thunks
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await login(credentials)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await register(userData)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed')
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logout()
            return null
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed')
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCurrentUser()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Not authenticated')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload.user
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload.user
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.isAuthenticated = false
                state.loading = false
                state.error = null
            })
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true
            })

            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.user = action.payload.user
                state.loading = false
                state.authChecked = true
            })

            .addCase(checkAuth.rejected, (state) => {
                state.isAuthenticated = false
                state.user = null
                state.loading = false
                state.authChecked = true
            })

    },
})

export const { clearError, updateUser } = authSlice.actions
export default authSlice.reducer







