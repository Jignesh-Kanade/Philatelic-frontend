import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, logoutUser } from '../redux/slices/authSlice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth)

    const login = async (credentials) => {
        const result = await dispatch(loginUser(credentials))
        if (loginUser.fulfilled.match(result)) {
            navigate('/')
            return { success: true }
        }
        return { success: false, error: result.payload }
    }

    const register = async (userData) => {
        const result = await dispatch(registerUser(userData))
        if (registerUser.fulfilled.match(result)) {
            navigate('/')
            return { success: true }
        }
        return { success: false, error: result.payload }
    }

    const logout = async () => {
        await dispatch(logoutUser())
        navigate('/login')
    }

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
    }
}