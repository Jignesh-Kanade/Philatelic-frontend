import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiPlus, FiSearch } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import ProductTable from '../../components/admin/ProductTable'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Loader from '../../components/common/Loader'
import { getAllProducts, deleteProduct, updateProduct } from '../../services/productService'
import { STAMP_CATEGORIES } from '../../utils/constants'

const ManageProducts = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [editFormData, setEditFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: ''
    })

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const response = await getAllProducts()
            setProducts(response.products || [])
        } catch (error) {
            console.error('Error loading products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (product) => {
        setSelectedProduct(product)
        setEditFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description
        })
        setEditModal(true)
    }

    const handleDelete = (productId) => {
        setSelectedProduct(productId)
        setDeleteModal(true)
    }

    const confirmDelete = async () => {
        try {
            await deleteProduct(selectedProduct)
            setDeleteModal(false)
            loadProducts()
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('Failed to delete product')
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateProduct(selectedProduct._id, editFormData)
            setEditModal(false)
            loadProducts()
        } catch (error) {
            console.error('Error updating product:', error)
            alert('Failed to update product')
        }
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                            <h1 className="text-2xl font-bold text-gray-900">Manage Stamps</h1>
                        </div>
                        <Link to="/admin/products/add">
                            <Button variant="primary" icon={<FiPlus />}>
                                Add New Stamp
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Search and Filter */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow relative">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search stamps by name or category..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            All Stamps ({filteredProducts.length})
                                        </h2>
                                    </div>
                                </div>
                                <ProductTable
                                    products={filteredProducts}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </>
                        )}
                    </div>
                </main>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={editModal}
                onClose={() => setEditModal(false)}
                title="Edit Stamp"
            >
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <Input
                        label="Stamp Name"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                        <select
                            value={editFormData.category}
                            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                            className="input-field"
                            required
                        >
                            <option value="">Select Category</option>
                            {STAMP_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Price (₹)"
                        type="number"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                        required
                    />

                    <Input
                        label="Stock"
                        type="number"
                        value={editFormData.stock}
                        onChange={(e) => setEditFormData({ ...editFormData, stock: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            value={editFormData.description}
                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                            className="input-field"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" variant="primary" fullWidth>
                            Save Changes
                        </Button>
                        <Button type="button" onClick={() => setEditModal(false)} variant="secondary" fullWidth>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                title="Confirm Delete"
                size="small"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete this stamp? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button onClick={confirmDelete} variant="danger" fullWidth>
                            Delete
                        </Button>
                        <Button onClick={() => setDeleteModal(false)} variant="secondary" fullWidth>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageProducts