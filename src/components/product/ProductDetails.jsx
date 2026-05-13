// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
// import { useCart } from '../../hooks/useCart'
// import { useDispatch } from 'react-redux'
// import { registerInterest } from '../../redux/slices/interestSlice'
// import { formatCurrency, formatDate } from '../../utils/helpers'
// import { FiShoppingCart, FiHeart, FiShare2, FiPackage, FiCheckCircle } from 'react-icons/fi'
// import Button from '../common/Button'
// import { useState } from 'react'

// const dispatch = useDispatch()
// const [interestLoading, setInterestLoading] = useState(false)

// const handleRegisterInterest = async () => {
//     if (!isAuthenticated) {
//         navigate('/login')
//         return
//     }

//     setInterestLoading(true)
//     await dispatch(registerInterest({ productId: product._id, priority: 'medium' }))
//     setInterestLoading(false)
//     alert('Interest registered successfully! Check "My Interests" page.')
// }

// const ProductDetails = ({ product }) => {
//     const { isAuthenticated } = useAuth()
//     const { addItem, getItemQuantity } = useCart()
//     const navigate = useNavigate()
//     const [selectedQuantity, setSelectedQuantity] = useState(1)
//     const cartQuantity = getItemQuantity(product._id)

//     const handleAddToCart = () => {
//         if (!isAuthenticated) {
//             navigate('/login')
//             return
//         }
//         for (let i = 0; i < selectedQuantity; i++) {
//             addItem(product)
//         }
//     }

//     const handleBuyNow = () => {
//         if (!isAuthenticated) {
//             navigate('/login')
//             return
//         }
//         handleAddToCart()
//         navigate('/cart')
//     }

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Image Section */}
//             <div className="space-y-4">
//                 <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
//                     {product.imageUrl ? (
//                         <img
//                             src={product.imageUrl}
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                         />
//                     ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                             <span className="text-9xl">📮</span>
//                         </div>
//                     )}
//                 </div>

//                 {/* Additional Info Cards */}
//                 <div className="grid grid-cols-3 gap-4">
//                     <div className="bg-primary-50 rounded-lg p-4 text-center">
//                         <FiPackage className="w-6 h-6 text-primary-600 mx-auto mb-2" />
//                         <div className="text-xs text-gray-600">Fast Delivery</div>
//                     </div>
//                     <div className="bg-green-50 rounded-lg p-4 text-center">
//                         <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
//                         <div className="text-xs text-gray-600">Authentic</div>
//                     </div>
//                     <div className="bg-yellow-50 rounded-lg p-4 text-center">
//                         <div className="text-2xl mb-1">💰</div>
//                         <div className="text-xs text-gray-600">NPDA Wallet</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Details Section */}
//             <div className="space-y-6">
//                 {/* Category & Stock */}
//                 <div className="flex items-center justify-between">
//                     <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium">
//                         {product.category}
//                     </span>
//                     {product.stock > 0 ? (
//                         <span className="text-green-600 font-medium flex items-center gap-2">
//                             <FiCheckCircle className="w-4 h-4" />
//                             In Stock ({product.stock} available)
//                         </span>
//                     ) : (
//                         <span className="text-red-600 font-medium">Out of Stock</span>
//                     )}
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
//                     {product.name}
//                 </h1>

//                 {/* Price */}
//                 <div className="flex items-baseline gap-3">
//                     <span className="text-4xl font-bold text-gray-900">
//                         {formatCurrency(product.price)}
//                     </span>
//                     {product.denomination && (
//                         <span className="text-lg text-gray-500">
//                             (Face Value: ₹{product.denomination})
//                         </span>
//                     )}
//                 </div>

//                 {/* Description */}
//                 <div className="border-t border-b border-gray-200 py-6">
//                     <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
//                     <p className="text-gray-700 leading-relaxed">{product.description}</p>
//                 </div>

//                 {/* Details Grid */}
//                 <div className="grid grid-cols-2 gap-4">
//                     {product.releaseDate && (
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Release Date</div>
//                             <div className="font-semibold text-gray-900">
//                                 {formatDate(product.releaseDate)}
//                             </div>
//                         </div>
//                     )}
//                     {product.theme && (
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Theme</div>
//                             <div className="font-semibold text-gray-900">{product.theme}</div>
//                         </div>
//                     )}
//                     {product.designer && (
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Designer</div>
//                             <div className="font-semibold text-gray-900">{product.designer}</div>
//                         </div>
//                     )}
//                     {product.printingMethod && (
//                         <div>
//                             <div className="text-sm text-gray-500 mb-1">Printing Method</div>
//                             <div className="font-semibold text-gray-900">{product.printingMethod}</div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Quantity Selector */}
//                 {isAuthenticated && product.stock > 0 && (
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Quantity
//                         </label>
//                         <div className="flex items-center gap-3">
//                             <button
//                                 onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
//                                 className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-semibold text-gray-700"
//                             >
//                                 -
//                             </button>
//                             <input
//                                 type="number"
//                                 value={selectedQuantity}
//                                 onChange={(e) => setSelectedQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
//                                 className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg font-semibold"
//                                 min="1"
//                                 max={product.stock}
//                             />
//                             <button
//                                 onClick={() => setSelectedQuantity(Math.min(product.stock, selectedQuantity + 1))}
//                                 className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-semibold text-gray-700"
//                             >
//                                 +
//                             </button>
//                             {cartQuantity > 0 && (
//                                 <span className="text-sm text-green-600 font-medium">
//                                     ({cartQuantity} in cart)
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     {isAuthenticated && product.stock > 0 && (
//                         <>
//                             <Button
//                                 onClick={handleAddToCart}
//                                 variant="outline"
//                                 size="large"
//                                 fullWidth
//                                 icon={<FiShoppingCart />}
//                             >
//                                 Add to Cart
//                             </Button>
//                             <Button
//                                 onClick={handleBuyNow}
//                                 variant="primary"
//                                 size="large"
//                                 fullWidth
//                             >
//                                 Buy Now
//                             </Button>
//                         </>
//                     )}
//                     {/* Register Interest Button */}
//                     {product.stock === 0 && (
//                         <Button
//                             onClick={handleRegisterInterest}
//                             variant="secondary"
//                             size="large"
//                             fullWidth
//                             disabled={interestLoading}
//                             icon={<FiHeart />}
//                         >
//                             {interestLoading ? 'Registering...' : 'Register Interest'}
//                         </Button>
//                     )}
//                     {!isAuthenticated && (
//                         <Button
//                             onClick={() => navigate('/login')}
//                             variant="primary"
//                             size="large"
//                             fullWidth
//                         >
//                             Login to Purchase
//                         </Button>
//                     )}
//                     {product.stock === 0 && (
//                         <Button variant="secondary" size="large" fullWidth disabled>
//                             Out of Stock
//                         </Button>
//                     )}
//                 </div>

//                 {/* Additional Actions */}
//                 <div className="flex gap-4 pt-4 border-t border-gray-200">
//                     <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
//                         <FiHeart className="w-5 h-5" />
//                         <span className="text-sm">Add to Wishlist</span>
//                     </button>
//                     <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
//                         <FiShare2 className="w-5 h-5" />
//                         <span className="text-sm">Share</span>
//                     </button>
//                 </div>

//                 {/* Shipping Info */}
//                 <div className="bg-blue-50 rounded-lg p-4 space-y-2">
//                     <h4 className="font-semibold text-gray-900 flex items-center gap-2">
//                         <FiPackage className="w-4 h-4" />
//                         Shipping Information
//                     </h4>
//                     <ul className="text-sm text-gray-700 space-y-1">
//                         <li>✓ Free delivery on orders above ₹500</li>
//                         <li>✓ Standard delivery in 5-7 business days</li>
//                         <li>✓ Secure packaging to protect your stamps</li>
//                         <li>✓ Track your order in real-time</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetails
















import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { useDispatch } from 'react-redux'
import { registerInterest } from '../../redux/slices/interestSlice'
import { formatCurrency, formatDate } from '../../utils/helpers'
import { FiShoppingCart, FiHeart, FiShare2, FiPackage, FiCheckCircle } from 'react-icons/fi'
import Button from '../common/Button'
import { API_URL } from '../../utils/constants'
import { BACKEND_URL } from '../../utils/constants'


const ProductDetails = ({ product }) => {
    const { isAuthenticated } = useAuth()
    const { addItem, getItemQuantity } = useCart()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [interestLoading, setInterestLoading] = useState(false)
    const cartQuantity = getItemQuantity(product._id)

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        for (let i = 0; i < selectedQuantity; i++) {
            addItem(product)
        }
    }

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        handleAddToCart()
        navigate('/cart')
    }

    const handleRegisterInterest = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        setInterestLoading(true)
        try {
            await dispatch(registerInterest({ productId: product._id, priority: 'medium' }))
            alert('Interest registered successfully! Check "My Interests" page.')
        } catch (error) {
            alert('Failed to register interest')
        } finally {
            setInterestLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                    {product.image ? (
                        <img
                            src={`${BACKEND_URL}${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-9xl">📮</span>
                        </div>
                    )}
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                        <FiPackage className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600">Fast Delivery</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                        <FiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-600">Authentic</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-1">💰</div>
                        <div className="text-xs text-gray-600">NPDA Wallet</div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
                {/* Category & Stock */}
                <div className="flex items-center justify-between">
                    <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium">
                        {product.category}
                    </span>
                    {product.stock > 0 ? (
                        <span className="text-green-600 font-medium flex items-center gap-2">
                            <FiCheckCircle className="w-4 h-4" />
                            In Stock ({product.stock} available)
                        </span>
                    ) : (
                        <span className="text-red-600 font-medium">Out of Stock</span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                        {formatCurrency(product.price)}
                    </span>
                    {product.denomination && (
                        <span className="text-lg text-gray-500">
                            (Face Value: ₹{product.denomination})
                        </span>
                    )}
                </div>

                {/* Description */}
                <div className="border-t border-b border-gray-200 py-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {product.releaseDate && (
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Release Date</div>
                            <div className="font-semibold text-gray-900">
                                {formatDate(product.releaseDate)}
                            </div>
                        </div>
                    )}
                    {product.theme && (
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Theme</div>
                            <div className="font-semibold text-gray-900">{product.theme}</div>
                        </div>
                    )}
                    {product.designer && (
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Designer</div>
                            <div className="font-semibold text-gray-900">{product.designer}</div>
                        </div>
                    )}
                    {product.printingMethod && (
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Printing Method</div>
                            <div className="font-semibold text-gray-900">{product.printingMethod}</div>
                        </div>
                    )}
                </div>

                {/* Quantity Selector */}
                {isAuthenticated && product.stock > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-semibold text-gray-700"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={selectedQuantity}
                                onChange={(e) => setSelectedQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg font-semibold"
                                min="1"
                                max={product.stock}
                            />
                            <button
                                onClick={() => setSelectedQuantity(Math.min(product.stock, selectedQuantity + 1))}
                                className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-500 flex items-center justify-center font-semibold text-gray-700"
                            >
                                +
                            </button>
                            {cartQuantity > 0 && (
                                <span className="text-sm text-green-600 font-medium">
                                    ({cartQuantity} in cart)
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {isAuthenticated && product.stock > 0 && (
                        <>
                            <Button
                                onClick={handleAddToCart}
                                variant="outline"
                                size="large"
                                fullWidth
                                icon={<FiShoppingCart />}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                variant="primary"
                                size="large"
                                fullWidth
                            >
                                Buy Now
                            </Button>
                        </>
                    )}
                    {!isAuthenticated && (
                        <Button
                            onClick={() => navigate('/login')}
                            variant="primary"
                            size="large"
                            fullWidth
                        >
                            Login to Purchase
                        </Button>
                    )}
                    {product.stock === 0 && (
                        <>
                            <Button variant="secondary" size="large" fullWidth disabled>
                                Out of Stock
                            </Button>
                            {isAuthenticated && (
                                <Button
                                    onClick={handleRegisterInterest}
                                    variant="outline"
                                    size="large"
                                    fullWidth
                                    disabled={interestLoading}
                                    icon={<FiHeart />}
                                >
                                    {interestLoading ? 'Registering...' : 'Register Interest'}
                                </Button>
                            )}
                        </>
                    )}
                </div>

                {/* Additional Actions */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                        <FiHeart className="w-5 h-5" />
                        <span className="text-sm">Add to Wishlist</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
                        <FiShare2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                    </button>
                </div>

                {/* Shipping Info */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FiPackage className="w-4 h-4" />
                        Shipping Information
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>✓ Free delivery on orders above ₹500</li>
                        <li>✓ Standard delivery in 5-7 business days</li>
                        <li>✓ Secure packaging to protect your stamps</li>
                        <li>✓ Track your order in real-time</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails