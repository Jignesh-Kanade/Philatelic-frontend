import React from 'react'
import ProductCard from './ProductCard'
import Loader from '../common/Loader'

const ProductList = ({ products, loading }) => {
    if (loading) {
        return <Loader />
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Stamps Found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}

export default ProductList