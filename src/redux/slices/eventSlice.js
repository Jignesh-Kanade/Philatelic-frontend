import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

const initialState = {
    events: [],
    myRsvps: [],
    currentEvent: null,
    loading: false,
    error: null,
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Async thunks
export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams(params).toString()
            const response = await api.get(`/events?${queryParams}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch events')
        }
    }
)

export const fetchEventById = createAsyncThunk(
    'event/fetchEventById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/events/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch event')
        }
    }
)

export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await api.post('/events', eventData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create event')
        }
    }
)

export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async ({ id, eventData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/events/${id}`, eventData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update event')
        }
    }
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/events/${id}`)
            return { id, ...response.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete event')
        }
    }
)

export const rsvpToEvent = createAsyncThunk(
    'event/rsvpToEvent',
    async ({ eventId, status }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/events/${eventId}/rsvp`, { status })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to RSVP')
        }
    }
)

export const cancelRsvp = createAsyncThunk(
    'event/cancelRsvp',
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/events/${eventId}/rsvp`)
            return { eventId, ...response.data }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to cancel RSVP')
        }
    }
)

export const fetchMyRsvps = createAsyncThunk(
    'event/fetchMyRsvps',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/events/my/rsvps')
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch RSVPs')
        }
    }
)

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        clearCurrentEvent: (state) => {
            state.currentEvent = null
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Events
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload.events
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch Event by ID
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false
                state.currentEvent = action.payload.event
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Create Event
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events.unshift(action.payload.event)
            })
            // Delete Event
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(event => event._id !== action.payload.id)
            })
            // RSVP
            .addCase(rsvpToEvent.fulfilled, (state, action) => {
                state.currentEvent = action.payload.event
            })
            // Fetch My RSVPs
            .addCase(fetchMyRsvps.fulfilled, (state, action) => {
                state.myRsvps = action.payload.events
            })
    },
})

export const { clearCurrentEvent, clearError } = eventSlice.actions
export default eventSlice.reducer