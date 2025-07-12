import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navigationItems = [
        { to: "/", label: "Home" },
        { to: "#", label: "About" },
        { to: "#", label: "Menu" },
        { to: "/booking", label: "Reservations" },
        { to: "#", label: "Order Online" },
        { to: "#", label: "Login" }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Handle keyboard events for mobile menu
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    };

    return (
        <>
            {/* Desktop & Tablet Navigation */}
            <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
                <ul className="flex space-x-4 lg:space-x-8" role="menubar">
                    {navigationItems.map((item, index) => (
                        <li key={index} role="none">
                            <Link 
                                to={item.to} 
                                className={`font-semibold transition-colors duration-200 text-sm lg:text-base ${
                                    isActive(item.to) 
                                        ? 'text-[#f4ce14]' 
                                        : 'text-black hover:text-[#f4ce14]'
                                }`}
                                role="menuitem"
                                aria-current={isActive(item.to) ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Hamburger Menu Button */}
            <button 
                className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Side Navigation Overlay */}
            <div 
                className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onKeyDown={handleKeyDown}
            >
                {/* Backdrop */}
                <div 
                    className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                ></div>
                
                {/* Side Navigation Panel */}
                <div 
                    id="mobile-menu"
                    className={`fixed right-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation menu"
                >
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
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Navigation Menu */}
                        <nav className="flex-1 px-6" role="navigation" aria-label="Mobile navigation">
                            <ul className="space-y-6" role="menubar">
                                {/* Menu items with staggered animation */}
                                {navigationItems.map((item, index) => (
                                    <li 
                                        key={index}
                                        className={`transform transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`} 
                                        style={{ transitionDelay: `${100 + (index * 50)}ms` }}
                                        role="none"
                                    >
                                        <Link 
                                            to={item.to} 
                                            className={`block text-lg font-semibold transition-colors duration-200 py-2 border-b border-gray-100 ${
                                                isActive(item.to) 
                                                    ? 'text-[#f4ce14]' 
                                                    : 'text-black hover:text-[#f4ce14]'
                                            }`}
                                            onClick={closeMobileMenu}
                                            role="menuitem"
                                            aria-current={isActive(item.to) ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile Footer */}
                        <div className="p-6 border-t border-gray-100">
                            <div className="text-center">
                                <img src="../icons/Logo.svg" alt="Little Lemon Restaurant Logo" className="h-8 w-auto mx-auto mb-4"/>
                                <p className="text-sm text-gray-600">Little Lemon Restaurant</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
