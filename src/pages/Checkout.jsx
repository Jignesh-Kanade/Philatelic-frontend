import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useSelector, useDispatch } from 'react-redux'
import { placeOrder } from '../redux/slices/orderSlice'
import { fetchWalletBalance } from '../redux/slices/walletSlice'
import { formatCurrency } from '../utils/helpers'
import { FiMapPin, FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { validateAddress } from '../utils/validators'

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items, totalAmount, clearAllItems } = useCart()
    const { balance } = useSelector((state) => state.wallet)
    const { user } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deliveryCharge = totalAmount > 500 ? 0 : 50
    const finalAmount = totalAmount + deliveryCharge

    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        pincode: '',
    })
    const [addressErrors, setAddressErrors] = useState({})

    React.useEffect(() => {
        dispatch(fetchWalletBalance())
    }, [dispatch])

    const handleAddressChange = (e) => {
        const { name, value } = e.target
        setAddress((prev) => ({ ...prev, [name]: value }))
        if (addressErrors[name]) {
            setAddressErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const handlePlaceOrder = async () => {
        // Validate address
        const errors = validateAddress(address)
        if (Object.keys(errors).length > 0) {
            setAddressErrors(errors)
            return
        }

        // Check wallet balance
        if (balance < finalAmount) {
            setError('Insufficient wallet balance. Please add money to your NPDA wallet.')
            return
        }

        try {
            setLoading(true)
            setError(null)

            const orderData = {
                items: items.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                shippingAddress: address,
                totalAmount: finalAmount,
                paymentMethod: 'wallet',
            }

            const result = await dispatch(placeOrder(orderData))

            if (placeOrder.fulfilled.match(result)) {
                clearAllItems()
                navigate('/orders', { state: { orderPlaced: true } })
            } else {
                setError(result.payload || 'Failed to place order')
            }
        } catch (err) {
            setError('An error occurred while placing the order')
        } finally {
            setLoading(false)
        }
    }

    if (items.length === 0) {
        navigate('/cart')
        return null
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <FiMapPin className="w-5 h-5" />
                            Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <Input
                                    label="Street Address"
                                    name="street"
                                    value={address.street}
                                    onChange={handleAddressChange}
                                    placeholder="Enter your street address"
                                    error={addressErrors.street}
                                    required
                                />
                            </div>
                            <Input
                                label="City"
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                                placeholder="Enter city"
                                error={addressErrors.city}
                                required
                            />
                            <Input
                                label="State"
                                name="state"
                                value={address.state}
                                onChange={handleAddressChange}
                                placeholder="Enter state"
                                error={addressErrors.state}
                                required
                            />
                            <Input
                                label="Pincode"
                                name="pincode"
                                value={address.pincode}
                                onChange={handleAddressChange}
                                placeholder="Enter 6-digit pincode"
                                error={addressErrors.pincode}
                                required
                            />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                        {/* Items */}
                        <div className="space-y-3 mb-6">
                            {items.map((item) => (
                                <div key={item._id} className="flex justify-between text-gray-700">
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
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
                            <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                                <span>Total Amount</span>
                                <span className="text-primary-600">{formatCurrency(finalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <FiCreditCard className="w-5 h-5" />
                            Payment Method
                        </h2>
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">NPDA Wallet</h3>
                                    <p className="text-sm text-gray-600">Current Balance</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</div>
                                    {balance < finalAmount && (
                                        <p className="text-sm text-red-600 font-medium">Insufficient balance</p>
                                    )}
                                </div>
                            </div>
                            {balance < finalAmount && (
                                <Button
                                    onClick={() => navigate('/wallet')}
                                    variant="outline"
                                    size="small"
                                >
                                    Add Money to Wallet
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <Button
                        onClick={handlePlaceOrder}
                        variant="primary"
                        size="large"
                        fullWidth
                        disabled={loading || balance < finalAmount}
                        icon={<FiCheckCircle />}
                    >
                        {loading ? 'Placing Order...' : `Place Order - ${formatCurrency(finalAmount)}`}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                        By placing your order, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Checkout