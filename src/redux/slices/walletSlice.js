import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getWalletBalance,
    getTransactions,
    createRazorpayOrder,
    verifyPayment,
    addMoneyDemo,
    checkPaymentGatewayStatus
} from '../../services/walletService'

const initialState = {
    balance: 0,
    transactions: [],
    loading: false,
    error: null,
    isPaymentGatewayConfigured: false,
    paymentLoading: false
}

// Async thunks
export const fetchWalletBalance = createAsyncThunk(
    'wallet/fetchBalance',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getWalletBalance()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch balance')
        }
    }
)

export const fetchTransactions = createAsyncThunk(
    'wallet/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getTransactions()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions')
        }
    }
)

export const checkPaymentStatus = createAsyncThunk(
    'wallet/checkPaymentStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await checkPaymentGatewayStatus()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to check payment status')
        }
    }
)

export const createPaymentOrder = createAsyncThunk(
    'wallet/createOrder',
    async (amount, { rejectWithValue }) => {
        try {
            const response = await createRazorpayOrder(amount)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create order')
        }
    }
)

export const verifyAndAddMoney = createAsyncThunk(
    'wallet/verifyPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await verifyPayment(paymentData)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Payment verification failed')
        }
    }
)

export const addMoneyToWallet = createAsyncThunk(
    'wallet/addMoney',
    async (amount, { rejectWithValue }) => {
        try {
            const response = await addMoneyDemo(amount)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add money')
        }
    }
)

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        updateBalance: (state, action) => {
            state.balance = action.payload
        },
        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Balance
            .addCase(fetchWalletBalance.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchWalletBalance.fulfilled, (state, action) => {
                state.loading = false
                state.balance = action.payload.balance
            })
            .addCase(fetchWalletBalance.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Check Payment Status
            .addCase(checkPaymentStatus.fulfilled, (state, action) => {
                state.isPaymentGatewayConfigured = action.payload.isConfigured
            })
            // Verify and Add Money
            .addCase(verifyAndAddMoney.pending, (state) => {
                state.paymentLoading = true
            })
            .addCase(verifyAndAddMoney.fulfilled, (state, action) => {
                state.paymentLoading = false
                state.balance = action.payload.balance
            })
            .addCase(verifyAndAddMoney.rejected, (state, action) => {
                state.paymentLoading = false
                state.error = action.payload
            })
            // Add Money (Demo)
            .addCase(addMoneyToWallet.pending, (state) => {
                state.loading = true
            })
            .addCase(addMoneyToWallet.fulfilled, (state, action) => {
                state.loading = false
                state.balance = action.payload.balance
            })
            .addCase(addMoneyToWallet.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch Transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false
                state.transactions = action.payload.transactions
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { clearError, updateBalance, setPaymentLoading } = walletSlice.actions
export default walletSlice.reducer