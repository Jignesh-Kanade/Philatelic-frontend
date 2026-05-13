import api from './api'

export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData)
    return response
}

export const getUserOrders = async () => {
    const response = await api.get('/orders/my-orders')
    return response
}

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response
}

export const getAllOrders = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    const response = await api.get(`/orders?${queryParams}`)
    return response
}

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status })
    return response
}

export const cancelOrder = async (orderId) => {
    const response = await api.put(`/orders/${orderId}/cancel`)
    return response
}