import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchWalletBalance,
    addMoneyToWallet,
    fetchTransactions,
    createPaymentOrder,
    verifyAndAddMoney,
    checkPaymentStatus
} from '../redux/slices/walletSlice'
import { formatCurrency, formatDateTime } from '../utils/helpers'
import { FiDollarSign, FiPlus, FiArrowUpRight, FiArrowDownRight, FiAlertCircle } from 'react-icons/fi'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import Input from '../components/common/Input'
import Loader from '../components/common/Loader'
import { loadRazorpayScript } from '../services/walletService'

const Wallet = () => {
    const dispatch = useDispatch()
    const { balance, transactions, loading, isPaymentGatewayConfigured, paymentLoading } = useSelector((state) => state.wallet)
    const { user } = useSelector((state) => state.auth)

    const [showAddMoney, setShowAddMoney] = useState(false)
    const [amount, setAmount] = useState('')
    const [processingPayment, setProcessingPayment] = useState(false)

    useEffect(() => {
        dispatch(fetchWalletBalance())
        dispatch(fetchTransactions())
        dispatch(checkPaymentStatus())
    }, [dispatch])

    const handleAddMoneyWithRazorpay = async () => {
        const amountValue = parseFloat(amount)
        if (isNaN(amountValue) || amountValue <= 0) {
            alert('Please enter a valid amount')
            return
        }

        if (amountValue < 10) {
            alert('Minimum amount is ₹10')
            return
        }

        if (amountValue > 100000) {
            alert('Maximum amount is ₹1,00,000')
            return
        }

        try {
            setProcessingPayment(true)

            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript()

            if (!scriptLoaded) {
                alert('Failed to load Razorpay SDK. Please check your internet connection.')
                setProcessingPayment(false)
                return
            }

            // Create order
            const orderResponse = await dispatch(createPaymentOrder(amountValue)).unwrap()

            if (!orderResponse.success) {
                throw new Error(orderResponse.message || 'Failed to create order')
            }

            // Configure Razorpay options
            const options = {
                key: orderResponse.keyId,
                amount: orderResponse.order.amount,
                currency: orderResponse.order.currency,
                name: 'NPDA Wallet',
                description: 'Add money to your NPDA wallet',
                order_id: orderResponse.order.id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            amount: amountValue
                        }

                        const result = await dispatch(verifyAndAddMoney(verifyData)).unwrap()

                        if (result.success) {
                            alert(`₹${amountValue} added successfully to your wallet!`)
                            setShowAddMoney(false)
                            setAmount('')
                            dispatch(fetchTransactions())
                        }
                    } catch (error) {
                        alert('Payment verification failed. Please contact support.')
                        console.error('Verification error:', error)
                    } finally {
                        setProcessingPayment(false)
                    }
                },
                prefill: {
                    name: user?.name || '',
                    email: user?.email || '',
                    contact: user?.phone || ''
                },
                notes: {
                    purpose: 'Wallet Recharge'
                },
                theme: {
                    color: '#2563eb'
                },
                modal: {
                    ondismiss: function () {
                        setProcessingPayment(false)
                        alert('Payment cancelled')
                    }
                }
            }

            // Open Razorpay checkout
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()

        } catch (error) {
            console.error('Payment error:', error)
            alert(error.message || 'Failed to initiate payment. Please try again.')
            setProcessingPayment(false)
        }
    }

    const handleAddMoneyDemo = async () => {
        const amountValue = parseFloat(amount)
        if (isNaN(amountValue) || amountValue <= 0) {
            alert('Please enter a valid amount')
            return
        }

        try {
            setProcessingPayment(true)
            await dispatch(addMoneyToWallet(amountValue)).unwrap()
            setShowAddMoney(false)
            setAmount('')
            dispatch(fetchTransactions())
            alert(`₹${amountValue} added successfully (Demo mode)!`)
        } catch (error) {
            alert('Failed to add money. Please try again.')
        } finally {
            setProcessingPayment(false)
        }
    }

    const handleAddMoney = () => {
        if (isPaymentGatewayConfigured) {
            handleAddMoneyWithRazorpay()
        } else {
            handleAddMoneyDemo()
        }
    }

    const quickAmounts = [100, 500, 1000, 2000, 5000]

    if (loading && !balance) {
        return <Loader fullScreen />
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">NPDA Wallet</h1>

                {/* Payment Gateway Status Alert */}
                {!isPaymentGatewayConfigured && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <FiAlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-yellow-800">
                                <strong>Demo Mode:</strong> Payment gateway is not configured.
                                Money will be added instantly for testing purposes.
                            </p>
                        </div>
                    </div>
                )}

                {/* Wallet Card */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl p-8 text-white mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-primary-100 mb-2">Available Balance</p>
                            <h2 className="text-5xl font-bold">{formatCurrency(balance)}</h2>
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <FiDollarSign className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={() => setShowAddMoney(true)}
                            variant="primary"
                            className="bg-primary-700 text-white hover:bg-gray-100"
                            icon={<FiPlus />}
                            disabled={processingPayment}
                        >
                            {processingPayment ? 'Processing...' : 'Add Money'}
                        </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-sm text-primary-100">
                            🔒 Your NPDA wallet is secure and government-backed for safe transactions
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FiArrowDownRight className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Total Added</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(
                                transactions?.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0) || 0
                            )}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FiArrowUpRight className="w-5 h-5 text-red-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Total Spent</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(
                                transactions?.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0) || 0
                            )}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FiDollarSign className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Transactions</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{transactions?.length || 0}</p>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                    </div>

                    {transactions && transactions.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <div key={transaction._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                                                    }`}
                                            >
                                                {transaction.type === 'credit' ? (
                                                    <FiArrowDownRight className="w-6 h-6 text-green-600" />
                                                ) : (
                                                    <FiArrowUpRight className="w-6 h-6 text-red-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {transaction.type === 'credit' ? 'Money Added' : 'Order Payment'}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {formatDateTime(transaction.createdAt)}
                                                </p>
                                                {transaction.description && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {transaction.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={`text-xl font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                            >
                                                {transaction.type === 'credit' ? '+' : '-'}
                                                {formatCurrency(transaction.amount)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Balance: {formatCurrency(transaction.balanceAfter || balance)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-5xl mb-3">💳</div>
                            <p className="text-gray-500">No transactions yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Money Modal */}
            <Modal
                isOpen={showAddMoney}
                onClose={() => !processingPayment && setShowAddMoney(false)}
                title="Add Money to Wallet"
            >
                <div className="space-y-6">
                    <Input
                        label="Enter Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount to add"
                        icon={<FiDollarSign />}
                        disabled={processingPayment}
                    />

                    {/* Quick Amount Buttons */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Quick Select
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => setAmount(amt.toString())}
                                    disabled={processingPayment}
                                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-colors ${amount === amt.toString()
                                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                                        : 'border-gray-300 hover:border-primary-500'
                                        } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    ₹{amt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {!isPaymentGatewayConfigured && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                                💡 <strong>Demo Mode:</strong> Money will be added instantly without payment.
                                Configure Razorpay in your .env file for real payments.
                            </p>
                        </div>
                    )}

                    {isPaymentGatewayConfigured && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                💳 <strong>Secure Payment:</strong> You will be redirected to Razorpay
                                for secure payment processing.
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={handleAddMoney}
                            variant="primary"
                            fullWidth
                            disabled={processingPayment || !amount}
                        >
                            {processingPayment ? 'Processing...' : isPaymentGatewayConfigured ? 'Pay Now' : 'Add Money'}
                        </Button>
                        <Button
                            onClick={() => setShowAddMoney(false)}
                            variant="secondary"
                            fullWidth
                            disabled={processingPayment}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Wallet