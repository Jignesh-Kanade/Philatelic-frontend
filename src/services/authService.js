import api from './api'

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData)
    if (response.token) {
        localStorage.setItem('token', response.token)
    }
    return response
}

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    if (response.token) {
        localStorage.setItem('token', response.token)
    }
    return response
}

export const logout = async () => {
    localStorage.removeItem('token')
    const response = await api.post('/auth/logout')
    return response
}

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me')
    return response
}

export const updateProfile = async (userData) => {
    const response = await api.put('/auth/profile', userData)
    return response
}

export const changePassword = async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData)
    return response
}