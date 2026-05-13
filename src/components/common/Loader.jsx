import React from 'react'

const Loader = ({ size = 'medium', fullScreen = false }) => {
    const sizeClasses = {
        small: 'w-6 h-6 border-2',
        medium: 'w-12 h-12 border-3',
        large: 'w-16 h-16 border-4',
    }

    const loader = (
        <div className={`spinner ${sizeClasses[size]}`}></div>
    )

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                <div className="text-center">
                    {loader}
                    <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center py-8">
            {loader}
        </div>
    )
}

export default Loader