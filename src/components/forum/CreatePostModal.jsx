import React, { useState } from 'react'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Button from '../common/Button'
import { FiSend } from 'react-icons/fi'

const FORUM_CATEGORIES = [
    'General',
    'Buying/Selling',
    'Stamp Values',
    'History',
    'Exhibitions',
    'Tips & Tricks',
    'Other'
]

const CreatePostModal = ({ isOpen, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        tags: ''
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.content.trim()) newErrors.content = 'Content is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const postData = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : []
        }

        onSubmit(postData)
        setFormData({ title: '', content: '', category: 'General', tags: '' })
        setErrors({})
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Post" size="large">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    error={errors.title}
                    required
                />

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input-field"
                    >
                        {FORUM_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Share your thoughts..."
                        rows="6"
                        className={`input-field resize-none ${errors.content ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>

                <Input
                    label="Tags (comma-separated)"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g. rare-stamps, vintage, india"
                />

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                        icon={<FiSend />}
                    >
                        {loading ? 'Posting...' : 'Create Post'}
                    </Button>
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                        fullWidth
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default CreatePostModal