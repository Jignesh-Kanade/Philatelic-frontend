import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchEventById,
    rsvpToEvent,
    cancelRsvp,
    deleteEvent
} from '../redux/slices/eventSlice'
import Loader from '../components/common/Loader'
// Line 5 - ADD THIS IMPORT
import Button from '../components/common/Button'  // ← Add this line
import {
    FiArrowLeft,
    FiCalendar,
    FiMapPin,
    FiUsers,
    FiGlobe,
    FiTrash2
} from 'react-icons/fi'
import { formatDateTime } from '../utils/helpers'

const EventDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentEvent, loading } = useSelector((state) => state.event)
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    const [rsvpLoading, setRsvpLoading] = useState(false)

    useEffect(() => {
        dispatch(fetchEventById(id))
    }, [id, dispatch])

    const userRsvp = currentEvent?.rsvps?.find(
        (rsvp) => rsvp.user._id === user?._id
    )

    const hasRsvp = !!userRsvp
    const isUpcoming = currentEvent && new Date(currentEvent.startDate) > new Date()
    const isFull =
        currentEvent?.maxAttendees > 0 &&
        currentEvent?.rsvps?.length >= currentEvent?.maxAttendees
    const isAdmin = user?.role === 'admin'

    const handleRsvp = async () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        setRsvpLoading(true)
        await dispatch(rsvpToEvent({ eventId: id, status: 'going' }))
        setRsvpLoading(false)
    }

    const handleCancelRsvp = async () => {
        if (window.confirm('Are you sure you want to cancel your RSVP?')) {
            setRsvpLoading(true)
            await dispatch(cancelRsvp(id))
            setRsvpLoading(false)
        }
    }

    const handleDeleteEvent = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            const result = await dispatch(deleteEvent(id))
            if (deleteEvent.fulfilled.match(result)) {
                navigate('/events')
            }
        }
    }

    if (loading || !currentEvent) {
        return <Loader fullScreen />
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom max-w-5xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 font-medium"
                >
                    <FiArrowLeft /> Back to Events
                </button>

                {/* Event Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    {/* Banner */}
                    <div className="relative h-64 md:h-96 bg-primary-600">
                        {currentEvent.imageUrl ? (
                            <img
                                src={currentEvent.imageUrl}
                                alt={currentEvent.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-9xl">
                                📅
                            </div>
                        )}

                        {isAdmin && (
                            <div className="absolute top-4 right-4">
                                <Button
                                    onClick={handleDeleteEvent}
                                    variant="danger"
                                    size="small"
                                    icon={<FiTrash2 />}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="p-8">
                        <h1 className="text-4xl font-bold mb-6">
                            {currentEvent.title}
                        </h1>

                        {/* Details */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">

                            {/* Date */}
                            <div className="flex gap-3">
                                <FiCalendar className="text-primary-600 mt-1" />
                                <div>
                                    <p className="font-semibold">Date & Time</p>
                                    <p className="text-gray-600">
                                        {formatDateTime(currentEvent.startDate)}
                                    </p>
                                </div>
                            </div>

                            {/* Attendees */}
                            <div className="flex gap-3">
                                <FiUsers className="text-primary-600 mt-1" />
                                <div>
                                    <p className="font-semibold">Attendees</p>
                                    <p className="text-gray-600">
                                        {currentEvent.rsvps.length}
                                        {currentEvent.maxAttendees > 0 &&
                                            ` / ${currentEvent.maxAttendees}`}
                                    </p>
                                </div>
                            </div>

                            {/* Online / Location */}
                            {currentEvent.isOnline ? (
                                <div className="flex gap-3">
                                    <FiGlobe className="text-primary-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Online Event</p>
                                        {currentEvent.onlineLink && hasRsvp && (
                                            <a
                                                href={currentEvent.onlineLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-600 underline"
                                            >
                                                Join Meeting
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <FiMapPin className="text-primary-600 mt-1" />
                                    <div>
                                        <p className="font-semibold">Location</p>
                                        <p className="text-gray-600">
                                            {currentEvent.location?.venue}<br />
                                            {currentEvent.location?.address}<br />
                                            {currentEvent.location?.city},{' '}
                                            {currentEvent.location?.state}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <h2 className="text-2xl font-bold mb-3">About This Event</h2>
                        <p className="text-gray-700 whitespace-pre-wrap mb-6">
                            {currentEvent.description}
                        </p>

                        {/* RSVP */}
                        {isUpcoming ? (
                            isAuthenticated ? (
                                hasRsvp ? (
                                    <Button
                                        onClick={handleCancelRsvp}
                                        variant="outline"
                                        disabled={rsvpLoading}
                                    >
                                        Cancel RSVP
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleRsvp}
                                        disabled={rsvpLoading || isFull}
                                    >
                                        {isFull ? 'Event Full' : 'RSVP to Event'}
                                    </Button>
                                )
                            ) : (
                                <Button onClick={() => navigate('/login')}>
                                    Login to RSVP
                                </Button>
                            )
                        ) : (
                            <p className="text-gray-600">This event has ended.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetail
