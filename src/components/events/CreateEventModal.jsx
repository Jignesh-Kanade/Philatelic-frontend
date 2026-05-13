
import React, { useState } from 'react'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Button from '../common/Button'
import { FiSave } from 'react-icons/fi'

const EVENT_TYPES = ['Workshop', 'Exhibition', 'Seminar', 'Auction', 'Meetup', 'Other']

const CreateEventModal = ({ isOpen, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Workshop',
        startDate: '',
        endDate: '',
        isOnline: false,
        onlineLink: '',
        venue: '',
        address: '',
        city: '',
        state: '',
        organizer: '',
        imageUrl: '',
        maxAttendees: 0,
        isFeatured: false
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        if (!formData.startDate) newErrors.startDate = 'Start date is required'
        if (!formData.endDate) newErrors.endDate = 'End date is required'
        if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const eventData = {
            ...formData,
            location: {
                venue: formData.venue,
                address: formData.address,
                city: formData.city,
                state: formData.state
            },
            maxAttendees: parseInt(formData.maxAttendees) || 0
        }

        onSubmit(eventData)
        setFormData({
            title: '',
            description: '',
            type: 'Workshop',
            startDate: '',
            endDate: '',
            isOnline: false,
            onlineLink: '',
            venue: '',
            address: '',
            city: '',
            state: '',
            organizer: '',
            imageUrl: '',
            maxAttendees: 0,
            isFeatured: false
        })
        setErrors({})
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Event" size="large">
            <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                <Input
                    label="Event Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    error={errors.title}
                    required
                />

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the event..."
                        rows="4"
                        className={`input - field resize - none ${errors.description ? 'border-red-500' : ''} `}
                        required
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Event Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {EVENT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Organizer"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        placeholder="Event organizer"
                        error={errors.organizer}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Start Date"
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        error={errors.startDate}
                        required
                    />

                    <Input
                        label="End Date"
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        error={errors.endDate}
                        required
                    />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                        type="checkbox"
                        name="isOnline"
                        checked={formData.isOnline}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 rounded"
                    />
                    <label className="font-medium text-gray-900">
                        This is an online event
                    </label>
                </div>

                {formData.isOnline ? (
                    <Input
                        label="Online Meeting Link"
                        name="onlineLink"
                        value={formData.onlineLink}
                        onChange={handleChange}
                        placeholder="https://meet.google.com/..."
                    />
                ) : (
                    <>
                        <Input
                            label="Venue"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="Venue name"
                        />

                        <Input
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street address"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                            />

                            <Input
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                            />
                        </div>
                    </>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Max Attendees (0 = unlimited)"
                        type="number"
                        name="maxAttendees"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        placeholder="0"
                    />

                    <Input
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 rounded"
                    />
                    <label className="font-medium text-gray-900">
                        Mark as featured event
                    </label>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                        icon={<FiSave />}
                    >
                        {loading ? 'Creating...' : 'Create Event'}
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

export default CreateEventModal