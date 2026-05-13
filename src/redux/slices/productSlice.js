import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts, getProductById, searchProducts } from '../../services/productService'

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalProducts: 0,
    filters: {
        category: '',
        priceRange: { min: 0, max: 10000 },
        search: '',
    },
}

// Async thunks
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await getAllProducts(params)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
        }
    }
)

export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getProductById(id)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
        }
    }
)

export const searchProductsAsync = createAsyncThunk(
    'product/searchProducts',
    async (query, { rejectWithValue }) => {
        try {
            const response = await searchProducts(query)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Search failed')
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                category: '',
                priceRange: { min: 0, max: 10000 },
                search: '',
            }
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.products
                state.totalProducts = action.payload.total
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch Product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.currentProduct = action.payload.product
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Search Products
            .addCase(searchProductsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(searchProductsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.products
                state.totalProducts = action.payload.total
            })
            .addCase(searchProductsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { setFilters, clearFilters, clearCurrentProduct } = productSlice.actions
export default productSlice.reducer