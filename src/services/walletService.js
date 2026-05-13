import api from './api'

// Get wallet balance
export const getWalletBalance = async () => {
    const response = await api.get('/users/wallet')
    return response
}

// Get wallet transactions
export const getTransactions = async () => {
    const response = await api.get('/users/transactions')
    return response
}

// Check payment gateway status
export const checkPaymentGatewayStatus = async () => {
    const response = await api.get('/users/wallet/payment-status')
    return response
}

// Create Razorpay order
export const createRazorpayOrder = async (amount) => {
    const response = await api.post('/users/wallet/create-order', { amount })
    return response
}

// Verify payment and add money
export const verifyPayment = async (paymentData) => {
    const response = await api.post('/users/wallet/verify-payment', paymentData)
    return response
}

// Add money (demo mode)
export const addMoneyDemo = async (amount) => {
    const response = await api.post('/users/wallet/add', { amount })
    return response
}

// Load Razorpay script
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}