export const validateLoginForm = (email, password) => {
    const errors = {}

    if (!email) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid'
    }

    if (!password) {
        errors.password = 'Password is required'
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
    }

    return errors
}

export const validateRegisterForm = (name, email, password, confirmPassword, phone) => {
    const errors = {}

    if (!name) {
        errors.name = 'Name is required'
    } else if (name.length < 3) {
        errors.name = 'Name must be at least 3 characters'
    }

    if (!email) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid'
    }

    if (!phone) {
        errors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
        errors.phone = 'Phone number is invalid'
    }

    if (!password) {
        errors.password = 'Password is required'
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
    }

    return errors
}

export const validateAddress = (address) => {
    const errors = {}

    if (!address.street) {
        errors.street = 'Street address is required'
    }

    if (!address.city) {
        errors.city = 'City is required'
    }

    if (!address.state) {
        errors.state = 'State is required'
    }

    if (!address.pincode) {
        errors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(address.pincode)) {
        errors.pincode = 'Pincode must be 6 digits'
    }

    return errors
}