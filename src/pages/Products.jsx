import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductList from '../components/product/ProductList'
import ProductFilter from '../components/product/ProductFilter'
import { FiSearch } from 'react-icons/fi'
import { getAllProducts, searchProducts } from '../services/productService'

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        priceRange: { min: 0, max: 10000 },
        search: '',
    })

    useEffect(() => {
        loadProducts()
    }, [filters])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const params = {
                category: filters.category,
                minPrice: filters.priceRange.min,
                maxPrice: filters.priceRange.max,
            }
            const response = await getAllProducts(params)
            setProducts(response.products || [])
        } catch (error) {
            console.error('Error loading products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            try {
                setLoading(true)
                const response = await searchProducts(searchQuery)
                setProducts(response.products || [])
            } catch (error) {
                console.error('Error searching products:', error)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleFilterChange = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }))
    }

    const handleClearFilters = () => {
        setFilters({
            category: '',
            priceRange: { min: 0, max: 10000 },
            search: '',
        })
        setSearchQuery('')
        setSearchParams({})
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Stamp Catalog
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Explore our extensive collection of authentic Indian stamps
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="relative max-w-2xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search stamps by name, theme, or category..."
                            className="w-full px-6 py-4 pr-12 rounded-xl border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-lg"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            <FiSearch className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <ProductFilter
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Results Info */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                {loading ? 'Loading...' : `Showing ${products.length} stamps`}
                            </p>
                            {filters.category && (
                                <span className="text-sm text-gray-600">
                                    Category: <span className="font-semibold text-primary-600">{filters.category}</span>
                                </span>
                            )}
                        </div>

                        {/* Products */}
                        <ProductList products={products} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products