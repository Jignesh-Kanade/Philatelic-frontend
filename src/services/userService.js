import api from './api'

export const getWalletBalance = async () => {
    const response = await api.get('/users/wallet')
    return response
}

export const addMoney = async (amount) => {
    const response = await api.post('/users/wallet/add', { amount })
    return response
}

export const getTransactions = async () => {
    const response = await api.get('/users/transactions')
    return response
}

export const getAllUsers = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    const response = await api.get(`/users?${queryParams}`)
    return response
}

export const updateUserStatus = async (userId, status) => {
    const response = await api.put(`/users/${userId}/status`, { status })
    return response
}

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`)
    return response
}

export const getUserStats = async () => {
    const response = await api.get('/users/stats')
    return response
}