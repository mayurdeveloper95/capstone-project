import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header className="w-full bg-white shadow-md relative">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo Container */}
                <div className="logo-container flex-shrink-0">
                    <Link to="/" className="block hover:opacity-80 transition-opacity duration-200">
                        <img src="../icons/Logo.svg" alt="Logo" className="logo-image"/>
                    </Link>
                </div>
                
                {/* Navigation Component */}
                <Navigation />
            </div>
        </header>
    )
}

export default Header;