import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
    'admin/getDashboardStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/admin/dashboard');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
        }
    }
);

// Get all users
export const getAllUsers = createAsyncThunk(
    'admin/getAllUsers',
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await api.get(`/admin/users?${queryString}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
        }
    }
);

// Get all orders
export const getAllOrders = createAsyncThunk(
    'admin/getAllOrders',
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await api.get(`/admin/orders?${queryString}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    'admin/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/orders/${orderId}/status`, { status });
            toast.success('Order status updated');
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status');
            return rejectWithValue(error.response?.data?.message || 'Failed to update status');
        }
    }
);

// Create product
export const createProduct = createAsyncThunk(
    'admin/createProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await api.post('/products', productData);
            toast.success('Product created successfully!');
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create product');
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            toast.success('Product updated successfully!');
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update product');
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/products/${id}`);
            toast.success('Product deleted successfully!');
            return id;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete product');
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

// Update user role
export const updateUserRole = createAsyncThunk(
    'admin/updateUserRole',
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/users/${userId}/role`, { role });
            toast.success('User role updated');
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update role');
            return rejectWithValue(error.response?.data?.message || 'Failed to update role');
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/users/${userId}`);
            toast.success('User deleted');
            return userId;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete user');
            return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
        }
    }
);

const initialState = {
    stats: {
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        ordersByStatus: [],
        recentOrders: [],
        monthlyRevenue: [],
    },
    users: [],
    orders: [],
    usersPagination: { currentPage: 1, totalPages: 1, total: 0 },
    ordersPagination: { currentPage: 1, totalPages: 1, total: 0 },
    loading: false,
    statsLoading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearAdminState: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            // Dashboard Stats
            .addCase(getDashboardStats.pending, (state) => {
                state.statsLoading = true;
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.stats = action.payload;
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.error = action.payload;
            })
            // All Users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.usersPagination = action.payload.pagination;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // All Orders
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.ordersPagination = action.payload.pagination;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Order Status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex(o => o._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                // Product will be removed from the products list in product slice
            })
            // Update User Role
            .addCase(updateUserRole.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u._id !== action.payload);
            });
    },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
