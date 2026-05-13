export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Digital Philately Platform'
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export const STAMP_CATEGORIES = [
    'Independence',
    'Wildlife',
    'Personalities',
    'Heritage',
    'Sports',
    'Art & Culture',
    'Science & Technology',
    'Flora & Fauna',
    'Monuments',
    'Events'
]

export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
}

export const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed'
}

export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
}

export const PRICE_RANGES = [
    { label: 'Under ₹50', min: 0, max: 50 },
    { label: '₹50 - ₹100', min: 50, max: 100 },
    { label: '₹100 - ₹200', min: 100, max: 200 },
    { label: '₹200 - ₹500', min: 200, max: 500 },
    { label: 'Above ₹500', min: 500, max: 10000 }
]

export const ITEMS_PER_PAGE = 12