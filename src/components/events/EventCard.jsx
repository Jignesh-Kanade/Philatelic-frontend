import React from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi'
import { formatDate } from '../../utils/helpers'

const EventCard = ({ event }) => {
    const isUpcoming = new Date(event.startDate) > new Date()
    const attendeeCount = event.rsvps?.length || 0

    return (
        <Link to={`/events/${event._id}`}>
            <div className="card p-0 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 rounded-t-xl overflow-hidden">
                    {event.imageUrl ? (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                            📅
                        </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                        {event.type}
                    </div>{/* Featured Badge */}
                    {event.isFeatured && (
                        <div className="absolute top-3 right-3 bg-yellow-400 px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                            ⭐ Featured
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                        {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiCalendar className="w-4 h-4 text-primary-600" />
                            <span>{formatDate(event.startDate)}</span>
                            {event.endDate && event.startDate !== event.endDate && (
                                <>
                                    <span>-</span>
                                    <span>{formatDate(event.endDate)}</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            {event.isOnline ? (
                                <>
                                    <FiClock className="w-4 h-4 text-primary-600" />
                                    <span>Online Event</span>
                                </>
                            ) : (
                                <>
                                    <FiMapPin className="w-4 h-4 text-primary-600" />
                                    <span>{event.location?.city}, {event.location?.state}</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <FiUsers className="w-4 h-4 text-primary-600" />
                            <span>{attendeeCount} Attending</span>
                            {event.maxAttendees > 0 && (
                                <span className="text-gray-500">/ {event.maxAttendees}</span>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                            By {event.organizer}
                        </span>
                        {isUpcoming ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Upcoming
                            </span>
                        ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                                Past Event
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>)
}
export default EventCard