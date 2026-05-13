import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import Button from '../common/Button'

const EmptyCart = () => {
    return (
        <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                <FiShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any stamps to your cart yet.
                Start exploring our collection!
            </p>
            <Link to="/products">
                <Button variant="primary" size="large">
                    Browse Stamps
                </Button>
            </Link>
        </div>
    )
}

export default EmptyCart