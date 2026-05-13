import React, { useState } from 'react'
import { STAMP_CATEGORIES, PRICE_RANGES } from '../../utils/constants'
import { FiFilter, FiX } from 'react-icons/fi'
import Button from '../common/Button'

const ProductFilter = ({ filters, onFilterChange, onClearFilters }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleCategoryChange = (category) => {
        onFilterChange({ category: filters.category === category ? '' : category })
    }

    const handlePriceRangeChange = (range) => {
        onFilterChange({ priceRange: range })
    }

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Categories */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📂</span>
                    Categories
                </h3>
                <div className="space-y-2">
                    {STAMP_CATEGORIES.map((category) => (
                        <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <input
                                type="radio"
                                name="category"
                                checked={filters.category === category}
                                onChange={() => handleCategoryChange(category)}
                                className="w-4 h-4 text-primary-600"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💰</span>
                    Price Range
                </h3>
                <div className="space-y-2">
                    {PRICE_RANGES.map((range, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <input
                                type="radio"
                                name="priceRange"
                                checked={
                                    filters.priceRange.min === range.min &&
                                    filters.priceRange.max === range.max
                                }
                                onChange={() => handlePriceRangeChange(range)}
                                className="w-4 h-4 text-primary-600"
                            />
                            <span className="text-sm text-gray-700">{range.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <Button
                onClick={() => {
                    onClearFilters()
                    setIsOpen(false)
                }}
                variant="outline"
                fullWidth
                icon={<FiX />}
            >
                Clear All Filters
            </Button>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FiFilter className="w-5 h-5" />
                            Filters
                        </h2>
                    </div>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                >
                    <FiFilter className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Filter Modal */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
                    <div className="relative min-h-full flex items-end">
                        <div className="bg-white w-full rounded-t-3xl p-6 slide-in">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <FiFilter className="w-5 h-5" />
                                    Filters
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <FiX className="w-6 h-6" />
                                </button>
                            </div>
                            <FilterContent />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductFilter