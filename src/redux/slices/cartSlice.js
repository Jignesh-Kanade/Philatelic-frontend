import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existingItem = state.items.find(i => i._id === item._id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...item, quantity: 1 })
            }

            state.totalQuantity += 1
            state.totalAmount += item.price
        },
        removeFromCart: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(i => i._id === id)

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity
                state.totalAmount -= existingItem.price * existingItem.quantity
                state.items = state.items.filter(i => i._id !== id)
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const existingItem = state.items.find(i => i._id === id)

            if (existingItem && quantity > 0) {
                const diff = quantity - existingItem.quantity
                state.totalQuantity += diff
                state.totalAmount += existingItem.price * diff
                existingItem.quantity = quantity
            }
        },
        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer