import React, { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In production, this would send to backend
        console.log('Contact form submitted:', formData)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
    }

    const contactInfo = [
        {
            icon: FiMapPin,
            title: 'Address',
            info: 'Philately Bureau, India Post\nNew Delhi - 110001, India',
            color: 'bg-blue-500'
        },
        {
            icon: FiPhone,
            title: 'Phone',
            info: '+91-11-2334-5678\n+91-11-2334-5679',
            color: 'bg-green-500'
        },
        {
            icon: FiMail,
            title: 'Email',
            info: 'support@philatelyindia.gov.in\ninfo@philatelyindia.gov.in',
            color: 'bg-purple-500'
        }
    ]

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 mb-16">
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div key={index} className="bg-white rounded-xl shadow-xl p-8 text-center transform hover:scale-105 transition-transform">
                                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 whitespace-pre-line">{item.info}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Contact Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                            {submitted && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                                    ✓ Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Your Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    icon={<FiMail />}
                                    required
                                />

                                <Input
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    icon={<FiMail />}
                                    required
                                />

                                <Input
                                    label="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What is this regarding?"
                                    required
                                />

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Type your message here..."
                                        rows="6"
                                        required
                                        className="input-field resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="large"
                                    fullWidth
                                    icon={<FiSend />}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div>
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Office Hours</h3>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Monday - Friday</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Saturday</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Sunday</span>
                                        <span className="text-red-600">Closed</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">FAQs</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">How do I track my order?</h4>
                                        <p className="text-gray-600 text-sm">
                                            You can track your order from the "My Orders" section after logging in.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">How do I add money to my wallet?</h4>
                                        <p className="text-gray-600 text-sm">
                                            Go to the "NPDA Wallet" page and click "Add Money" to recharge your wallet.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Are the stamps authentic?</h4>
                                        <p className="text-gray-600 text-sm">
                                            Yes, all stamps are 100% authentic and sourced from official channels.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">What is the delivery time?</h4>
                                        <p className="text-gray-600 text-sm">
                                            Standard delivery takes 5-7 business days via India Post.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="py-16 bg-gray-100">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us Here</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <FiMapPin className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-lg">Map integration would be placed here</p>
                            <p className="text-sm">Location: Philately Bureau, New Delhi</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact