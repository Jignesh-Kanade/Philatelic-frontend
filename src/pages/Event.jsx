import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, createEvent } from '../redux/slices/eventSlice'
import EventCard from '../components/events/EventCard'
import CreateEventModal from '../components/events/CreateEventModal'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import { FiPlus, FiCalendar, FiFilter } from 'react-icons/fi'

const EVENT_TYPES = ['All', 'Workshop', 'Exhibition', 'Seminar', 'Auction', 'Meetup', 'Other']

const Events = () => {
    const dispatch = useDispatch()
    const { events, loading } = useSelector((state) => state.event)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [selectedType, setSelectedType] = useState('All')
    const [showUpcoming, setShowUpcoming] = useState(false)

    useEffect(() => {
        loadEvents()
    }, [selectedType, showUpcoming])

    const loadEvents = () => {
        const params = {}
        if (selectedType !== 'All') {
            params.type = selectedType
        }
        if (showUpcoming) {
            params.upcoming = 'true'
        }
        dispatch(fetchEvents(params))
    }

    const handleCreateEvent = async (eventData) => {
        const result = await dispatch(createEvent(eventData))
        if (createEvent.fulfilled.match(result)) {
            setShowCreateModal(false)
        }
    }

    const isAdmin = user?.role === 'admin'

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                <FiCalendar className="w-8 h-8" />
                                Events Calendar
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Discover upcoming philatelic events, exhibitions, and workshops
                            </p>
                        </div>
                        {isAdmin && (
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                variant="primary"
                                icon={<FiPlus />}
                            >
                                Create Event
                            </Button>
                        )}
                    </div>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Event Types */}
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                <FiFilter className="text-gray-400 flex-shrink-0" />
                                {EVENT_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedType === type
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Toggle */}
                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showUpcoming}
                                    onChange={(e) => setShowUpcoming(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    Upcoming Only
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Total Events</div>
                        <div className="text-3xl font-bold text-gray-900">{events?.length || 0}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">Upcoming</div>
                        <div className="text-3xl font-bold text-green-600">
                            {events?.filter(e => new Date(e.startDate) > new Date()).length || 0}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-sm text-gray-600 mb-1">My RSVPs</div>
                        <div className="text-3xl font-bold text-primary-600">
                            {isAuthenticated ? events?.filter(e =>
                                e.rsvps?.some(rsvp => rsvp.user._id === user?._id)
                            ).length || 0 : 0}
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {loading ? (
                    <Loader />
                ) : events && events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h3>
                        <p className="text-gray-600 mb-6">
                            {selectedType !== 'All'
                                ? `No ${selectedType.toLowerCase()} events found`
                                : showUpcoming
                                    ? 'No upcoming events at the moment'
                                    : 'No events available'}
                        </p>
                        {isAdmin && (
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                variant="primary"
                                icon={<FiPlus />}
                            >
                                Create First Event
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Create Event Modal */}
            {isAdmin && (
                <CreateEventModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateEvent}
                    loading={loading}
                />
            )}
        </div>
    )
}

export default Events