import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../utils/helpers'
import Button from '../common/Button'
import { FiShoppingBag } from 'react-icons/fi'

const CartSummary = ({ totalAmount, itemCount }) => {
    const navigate = useNavigate()
    const deliveryCharge = totalAmount > 500 ? 0 : 50
    const finalAmount = totalAmount + deliveryCharge

    return (
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                    <span>Delivery Charges</span>
                    <span className="font-semibold">
                        {deliveryCharge === 0 ? (
                            <span className="text-green-600">FREE</span>
                        ) : (
                            formatCurrency(deliveryCharge)
                        )}
                    </span>
                </div>

                {totalAmount < 500 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            Add {formatCurrency(500 - totalAmount)} more for free delivery!
                        </p>
                    </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total Amount</span>
                        <span className="text-primary-600">{formatCurrency(finalAmount)}</span>
                    </div>
                </div>
            </div>

            <Button
                onClick={() => navigate('/checkout')}
                variant="primary"
                size="large"
                fullWidth
                icon={<FiShoppingBag />}
            >
                Proceed to Checkout
            </Button>

            <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>✓</span>
                    <span>Secure NPDA wallet payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>✓</span>
                    <span>Fast & reliable delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>✓</span>
                    <span>100% authentic stamps</span>
                </div>
            </div>
        </div>
    )
}

export default CartSummary