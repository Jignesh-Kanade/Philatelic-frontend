import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../../services/oderService'

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    totalOrders: 0,
}

// Async thunks
export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await createOrder(orderData)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to place order')
        }
    }
)

export const fetchUserOrders = createAsyncThunk(
    'order/fetchUserOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserOrders()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
        }
    }
)

export const fetchAllOrders = createAsyncThunk(
    'order/fetchAllOrders',
    async (params, { rejectWithValue }) => {
        try {
            const response = await getAllOrders(params)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
        }
    }
)

export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await updateOrderStatus(orderId, status)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update order')
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Place Order
            .addCase(placeOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.loading = false
                state.currentOrder = action.payload.order
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch User Orders
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload.orders
                state.totalOrders = action.payload.total
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch All Orders (Admin)
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload.orders
                state.totalOrders = action.payload.total
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Update Order
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.orders.findIndex(o => o._id === action.payload.order._id)
                if (index !== -1) {
                    state.orders[index] = action.payload.order
                }
            })
    },
})

export const { clearCurrentOrder, clearError } = orderSlice.actions
export default orderSlice.reducer