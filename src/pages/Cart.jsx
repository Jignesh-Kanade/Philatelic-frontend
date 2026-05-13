import React from 'react'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import EmptyCart from '../components/cart/EmptyCart'
import { FiShoppingCart } from 'react-icons/fi'

const Cart = () => {
    const { items, totalQuantity, totalAmount, updateItemQuantity, removeItem } = useCart()

    if (items.length === 0) {
        return (
            <div className="container-custom py-16">
                <EmptyCart />
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <FiShoppingCart className="w-8 h-8" />
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onUpdateQuantity={updateItemQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <CartSummary totalAmount={totalAmount} itemCount={totalQuantity} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart