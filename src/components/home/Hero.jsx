// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FiArrowRight, FiSearch } from 'react-icons/fi'

// const Hero = () => {
//     return (
//         <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
//             <div className="container-custom py-20 md:py-32">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                     {/* Left Content */}
//                     <div className="space-y-8 fade-in">
//                         <div className="inline-block">
//                             <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
//                                 🎯 India's #1 Digital Philately Platform
//                             </span>
//                         </div>

//                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                             Discover, Collect & Trade
//                             <span className="block text-yellow-300 mt-2">Rare Indian Stamps</span>
//                         </h1>

//                         <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-xl">
//                             Join thousands of philatelists across India. Browse our extensive catalog,
//                             manage your collection, and connect with fellow collectors on our unified platform.
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-4">
//                             <Link
//                                 to="/products"
//                                 className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
//                             >
//                                 <FiSearch className="w-5 h-5" />
//                                 Browse Stamps
//                             </Link>
//                             <Link
//                                 to="/register"
//                                 className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-all duration-200"
//                             >
//                                 Get Started
//                                 <FiArrowRight className="w-5 h-5" />
//                             </Link>
//                         </div>

//                         {/* Stats */}
//                         <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
//                             <div>
//                                 <div className="text-3xl md:text-4xl font-bold">500+</div>
//                                 <div className="text-gray-200 text-sm mt-1">Rare Stamps</div>
//                             </div>
//                             <div>
//                                 <div className="text-3xl md:text-4xl font-bold">2000+</div>
//                                 <div className="text-gray-200 text-sm mt-1">Collectors</div>
//                             </div>
//                             <div>
//                                 <div className="text-3xl md:text-4xl font-bold">100%</div>
//                                 <div className="text-gray-200 text-sm mt-1">Authentic</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Image/Illustration */}
//                     <div className="hidden lg:block">
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-pink-400/20 rounded-3xl blur-3xl"></div>
//                             <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
//                                 <div className="grid grid-cols-2 gap-4">
//                                     {[1, 2, 3, 4].map((item) => (
//                                         <div
//                                             key={item}
//                                             className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
//                                         >
//                                             <div className="aspect-square bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg mb-3 flex items-center justify-center">
//                                                 <span className="text-4xl">📮</span>
//                                             </div>
//                                             <div className="h-2 bg-gray-200 rounded mb-2"></div>
//                                             <div className="h-2 bg-gray-200 rounded w-3/4"></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Hero

















import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiSearch } from 'react-icons/fi'


const images = [
    'home stamp1.jpg',
    'home stamp2.jpg',
    'home stamp3.jpg',
    'home stamp4.png',
]


const Hero = () => {
    return (
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
            <div className="container-custom py-20 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 fade-in">
                        {/* <div className="inline-block">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                                🎯 India's #1 Digital Philately Platform
                            </span>
                        </div> */}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Discover, Collect & Trade
                            <span className="block text-yellow-300 mt-2">Rare Indian Stamps</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-xl">
                            Join thousands of philatelists across India. Browse our extensive catalog,
                            manage your collection, and connect with fellow collectors on our unified platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <FiSearch className="w-5 h-5" />
                                Browse Stamps
                            </Link>
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-all duration-200"
                            >
                                Get Started
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                            <div>
                                {/* <div className="text-3xl md:text-4xl font-bold">500+</div> */}
                                <div className="text-gray-200 text-3xl mt-1">Rare Stamps Collection</div>
                            </div>
                            <div>
                                {/* <div className="text-3xl md:text-4xl font-bold">2000+</div> */}
                                <div className="text-gray-200 text-3xl mt-1">Philatelic Community</div>
                            </div>
                            <div>
                                {/* <div className="text-3xl md:text-4xl font-bold">100%</div> */}
                                <div className="text-gray-200 text-3xl mt-1">Verified & Authentic</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Illustration */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-pink-400/20 rounded-3xl blur-3xl"></div>
                            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="bg-white rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
                                        >
                                            <div className="aspect-square bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg mb-3 flex items-center justify-center">
                                                <img
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${images[item - 1]}`}
                                                    alt="Indian Stamp"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded mb-2"><img src="" alt="" /></div>
                                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero