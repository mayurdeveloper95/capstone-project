import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="w-full bg-white shadow-md relative">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo Container */}
                <div className="logo-container flex-shrink-0">
                    <Link to="/" className="block hover:opacity-80 transition-opacity duration-200">
                        <img src="../icons/Logo.svg" alt="Logo" className="logo-image"/>
                    </Link>
                </div>
                
                {/* Desktop & Tablet Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-4 lg:space-x-8">
                        <li><Link to="/" className="text-black font-semibold hover:text-[#f4ce14] transition-colors duration-200 text-sm lg:text-base">Home</Link></li>
                        <li><Link to="/" className="text-black font-semibold hover:text-[#f4ce14] transition-colors duration-200 text-sm lg:text-base">About</Link></li>
                        <li><Link to="/" className="text-black font-semibold hover:text-[#f4ce14] transition-colors duration-200 text-sm lg:text-base">Menu</Link></li>
                        <li><Link to="/booking" className="text-black font-semibold hover:text-[#f4ce14] transition-colors duration-200 text-sm lg:text-base">Reservations</Link></li>
                        <li><Link to="/" className="text-black font-semibold hover:text-[#f4ce14] transition-colors duration-200 text-sm lg:text-base">Order Online</Link></li>
                        <li><Link to="/" className="text-black font-semibold hover:text-[#f4ce14] transition-colors duration-200 text-sm lg:text-base">Login</Link></li>
                    </ul>
                </nav>

                {/* Mobile Hamburger Menu Button */}
                <button 
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Side Navigation Overlay */}
            <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div 
                    className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
                    onClick={closeMobileMenu}
                ></div>
                
                {/* Side Navigation Panel */}
                <div className={`fixed right-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col h-full">
                            {/* Close Button */}
                            <div className="flex justify-end p-4">
                                <button 
                                    onClick={closeMobileMenu}
                                    className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                                    aria-label="Close mobile menu"
                                >
                                    <svg 
                                        className="w-6 h-6" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Navigation Menu */}
                            <nav className="flex-1 px-6">
                                <ul className="space-y-6">
                                    {/* Menu items with staggered animation */}
                                    <li className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
                                        <Link 
                                            to="/" 
                                            className="block text-lg font-semibold text-black hover:text-[#f4ce14] transition-colors duration-200 py-2 border-b border-gray-100"
                                            onClick={closeMobileMenu}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '150ms' }}>
                                        <Link 
                                            to="/" 
                                            className="block text-lg font-semibold text-black hover:text-[#f4ce14] transition-colors duration-200 py-2 border-b border-gray-100"
                                            onClick={closeMobileMenu}
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                                        <Link 
                                            to="/" 
                                            className="block text-lg font-semibold text-black hover:text-[#f4ce14] transition-colors duration-200 py-2 border-b border-gray-100"
                                            onClick={closeMobileMenu}
                                        >
                                            Menu
                                        </Link>
                                    </li>
                                    <li className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '250ms' }}>
                                        <Link 
                                            to="/booking" 
                                            className="block text-lg font-semibold text-black hover:text-[#f4ce14] transition-colors duration-200 py-2 border-b border-gray-100"
                                            onClick={closeMobileMenu}
                                        >
                                            Reservations
                                        </Link>
                                    </li>
                                    <li className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                                        <Link 
                                            to="/" 
                                            className="block text-lg font-semibold text-black hover:text-[#f4ce14] transition-colors duration-200 py-2 border-b border-gray-100"
                                            onClick={closeMobileMenu}
                                        >
                                            Order Online
                                        </Link>
                                    </li>
                                    <li className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} style={{ transitionDelay: '350ms' }}>
                                        <Link 
                                            to="/" 
                                            className="block text-lg font-semibold text-black hover:text-[#f4ce14] transition-colors duration-200 py-2 border-b border-gray-100"
                                            onClick={closeMobileMenu}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Mobile Footer */}
                            <div className="p-6 border-t border-gray-100">
                                <div className="text-center">
                                    <img src="../icons/Logo.svg" alt="Logo" className="h-8 w-auto mx-auto mb-4"/>
                                    <p className="text-sm text-gray-600">Little Lemon Restaurant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </header>
    )
}

export default Header;