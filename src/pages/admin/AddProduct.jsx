import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiArrowLeft } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { createProduct } from '../../services/productService'
import { STAMP_CATEGORIES } from '../../utils/constants'

const AddProduct = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        denomination: '',
        stock: '',
        description: '',
        releaseDate: '',
        theme: '',
        designer: '',
        printingMethod: '',
        featured: false
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }


    const validateForm = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Stamp name is required'
        if (!formData.category) newErrors.category = 'Category is required'
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required'
        if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (!image) {
            alert('Please select an image')
            return
        }

        try {
            setLoading(true)
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                denomination: formData.denomination ? parseFloat(formData.denomination) : undefined,
                stock: parseInt(formData.stock)
            }

            const form = new FormData()

            Object.entries(productData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    form.append(key, value)
                }
            })

            // ✅ APPEND IMAGE FILE
            form.append('image', image)

            // ✅ SEND TO BACKEND
            await createProduct(form)
            navigate('/admin/products')
        } catch (error) {
            console.error('Error creating product:', error)
            alert(error.response?.data?.message || 'Failed to create product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/products')}
                                className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                            >
                                <FiArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back to Stamps</span>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">Add New Stamp</h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Stamp Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g., Mahatma Gandhi 75th Anniversary"
                                                error={errors.name}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">
                                                Category <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className={`input-field ${errors.category ? 'border-red-500' : ''}`}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {STAMP_CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                                        </div>

                                        <Input
                                            label="Theme"
                                            name="theme"
                                            value={formData.theme}
                                            onChange={handleChange}
                                            placeholder="e.g., Freedom Fighters"
                                        />

                                        <Input
                                            label="Price (₹)"
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="Enter selling price"
                                            error={errors.price}
                                            required
                                        />

                                        <Input
                                            label="Face Value/Denomination (₹)"
                                            type="number"
                                            name="denomination"
                                            value={formData.denomination}
                                            onChange={handleChange}
                                            placeholder="e.g., 5"
                                        />

                                        <Input
                                            label="Stock Quantity"
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            placeholder="Available quantity"
                                            error={errors.stock}
                                            required
                                        />

                                        <Input
                                            label="Release Date"
                                            type="date"
                                            name="releaseDate"
                                            value={formData.releaseDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Provide detailed description of the stamp..."
                                        rows="4"
                                        className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>

                                {/* Additional Details */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Designer"
                                            name="designer"
                                            value={formData.designer}
                                            onChange={handleChange}
                                            placeholder="Name of the designer"
                                        />

                                        <Input
                                            label="Printing Method"
                                            name="printingMethod"
                                            value={formData.printingMethod}
                                            onChange={handleChange}
                                            placeholder="e.g., Offset, Lithography"
                                        />

                                        <div className="md:col-span-2">
                                            <label className="block text-gray-700 font-medium mb-2">
                                                Stamp Image <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                    </div>
                                </div>

                                {/* Featured */}
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-primary-600 rounded"
                                    />
                                    <div>
                                        <label className="font-medium text-gray-900 cursor-pointer">
                                            Mark as Featured
                                        </label>
                                        <p className="text-sm text-gray-600">Featured stamps appear on the homepage</p>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-4 pt-6 border-t border-gray-200">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="large"
                                        disabled={loading}
                                        fullWidth
                                    >
                                        {loading ? 'Creating...' : 'Create Stamp'}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => navigate('/admin/products')}
                                        variant="secondary"
                                        size="large"
                                        fullWidth
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AddProduct