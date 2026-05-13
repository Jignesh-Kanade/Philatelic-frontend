import React from 'react'

const Card = ({ children, className = '', hover = true, padding = true }) => {
    return (
        <div
            className={`card ${hover ? 'hover:shadow-xl' : ''} ${padding ? 'p-6' : ''
                } ${className}`}
        >
            {children}
        </div>
    )
}

export default Card