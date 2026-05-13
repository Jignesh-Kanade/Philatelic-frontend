import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice'
import { toast } from 'react-hot-toast'

export const useCart = () => {
    const dispatch = useDispatch()
    const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart)

    const addItem = (product) => {
        dispatch(addToCart(product))
    }

    const removeItem = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const updateItemQuantity = (productId, quantity) => {
        dispatch(updateQuantity({ id: productId, quantity }))
    }

    const clearAllItems = () => {
        dispatch(clearCart())
    }

    const getItemQuantity = (productId) => {
        const item = items.find(i => i._id === productId)
        return item ? item.quantity : 0
    }

    return {
        items,
        totalQuantity,
        totalAmount,
        addItem,
        removeItem,
        updateItemQuantity,
        clearAllItems,
        getItemQuantity,
    }
}