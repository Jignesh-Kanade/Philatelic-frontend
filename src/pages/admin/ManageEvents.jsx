import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiMenu, FiPlus, FiEdit, FiTrash2, FiUsers } from 'react-icons/fi'
import Sidebar from '../../components/admin/Sidebar'
import CreateEventModal from '../../components/events/CreateEventModal'
import { fetchEvents, createEvent, deleteEvent } from '../../redux/slices/eventSlice'
import { formatDateTime } from '../../utils/helpers'
import Button from '../../components/common/Button'

const ManageEvents = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const dispatch = useDispatch()
    const { events, loading } = useSelector((state) => state.event)

    useEffect(() => {
        dispatch(fetchEvents())
    }, [dispatch])

    const handleCreateEvent = async (eventData) => {
        const result = await dispatch(createEvent(eventData))
        if (createEvent.fulfilled.match(result)) {
            setShowCreateModal(false)
            loadEvents()
        }
    }

    const handleDelete = async (eventId) => {
        if (window.confirm('Delete this event permanently?')) {
            await dispatch(deleteEvent(eventId))
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
                            <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
                        </div>
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            variant="primary"
                            icon={<FiPlus />}
                        >
                            Create Event
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Total Events</div>
                                <div className="text-3xl font-bold text-gray-900">{events.length}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Upcoming</div>
                                <div className="text-3xl font-bold text-green-600">
                                    {events.filter(e => new Date(e.startDate) > new Date()).length}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Total RSVPs</div>
                                <div className="text-3xl font-bold text-primary-600">
                                    {events.reduce((acc, e) => acc + (e.rsvps?.length || 0), 0)}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="text-sm text-gray-600 mb-1">Featured</div>
                                <div className="text-3xl font-bold text-yellow-600">
                                    {events.filter(e => e.isFeatured).length}
                                </div>
                            </div>
                        </div>

                        {/* Events Table */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Event
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Type
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                RSVPs
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {events.map((event) => {
                                            const isUpcoming = new Date(event.startDate) > new Date()
                                            return (
                                                <tr key={event._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="max-w-xs">
                                                            <div className="font-semibold text-gray-900">{event.title}</div>
                                                            <div className="text-sm text-gray-500">{event.organizer}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                            {event.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {formatDateTime(event.startDate)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <FiUsers className="w-4 h-4 text-gray-400" />
                                                            <span className="font-semibold text-gray-900">
                                                                {event.rsvps?.length || 0}
                                                            </span>
                                                            {event.maxAttendees > 0 && (
                                                                <span className="text-sm text-gray-500">
                                                                    / {event.maxAttendees}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            {isUpcoming ? (
                                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                                    Upcoming
                                                                </span>
                                                            ) : (
                                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                                    Past
                                                                </span>
                                                            )}
                                                            {event.isFeatured && (
                                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                                                    ⭐ Featured
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleDelete(event._id)}
                                                                className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                                            >
                                                                <FiTrash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Create Event Modal */}
            <CreateEventModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateEvent}
                loading={loading}
            />
        </div>
    )
}

export default ManageEvents