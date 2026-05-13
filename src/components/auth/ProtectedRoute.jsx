// import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth'
// import Loader from '../common/Loader'

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//     const { isAuthenticated, user, loading } = useAuth()
//     const location = useLocation()

//     if (loading) {
//         return <Loader fullScreen />
//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/login" state={{ from: location }} replace />
//     }

//     if (adminOnly && user?.role !== 'admin') {
//         return <Navigate to="/" replace />
//     }

//     return children
// }

// export default ProtectedRoute



import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user, authChecked } = useSelector(
        (state) => state.auth
    )

    if (!authChecked) return null

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
