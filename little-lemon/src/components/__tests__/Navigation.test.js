import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

// Mock useLocation hook
const mockUseLocation = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => mockUseLocation(),
}));

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Navigation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseLocation.mockReturnValue({ pathname: '/' });
    });

    describe('Rendering', () => {
        test('renders desktop navigation', () => {
            renderWithRouter(<Navigation />);
            
            expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
        });

        test('renders all navigation items', () => {
            renderWithRouter(<Navigation />);
            
            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Menu')).toBeInTheDocument();
            expect(screen.getByText('Reservations')).toBeInTheDocument();
            expect(screen.getByText('Order Online')).toBeInTheDocument();
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        test('renders mobile hamburger button', () => {
            renderWithRouter(<Navigation />);
            
            expect(screen.getByRole('button', { name: /toggle mobile menu/i })).toBeInTheDocument();
        });

        test('renders mobile menu overlay when closed', () => {
            renderWithRouter(<Navigation />);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toBeInTheDocument();
            expect(overlay).toHaveClass('opacity-0', 'pointer-events-none');
        });
    });

    describe('Desktop Navigation', () => {
        test('has proper navigation structure', () => {
            renderWithRouter(<Navigation />);
            
            const nav = screen.getByRole('navigation', { name: /main navigation/i });
            const list = nav.querySelector('ul');
            const listItems = list.querySelectorAll('li');
            
            expect(nav).toHaveClass('hidden', 'md:block');
            expect(list).toHaveClass('flex', 'space-x-4', 'lg:space-x-8');
            expect(listItems).toHaveLength(6);
        });

        test('navigation items have correct links', () => {
            renderWithRouter(<Navigation />);
            
            const homeLink = screen.getByRole('link', { name: /home/i });
            const reservationsLink = screen.getByRole('link', { name: /reservations/i });
            
            expect(homeLink).toHaveAttribute('href', '/');
            expect(reservationsLink).toHaveAttribute('href', '/booking');
        });

        test('active page is highlighted', () => {
            mockUseLocation.mockReturnValue({ pathname: '/booking' });
            renderWithRouter(<Navigation />);
            
            const reservationsLink = screen.getByRole('link', { name: /reservations/i });
            expect(reservationsLink).toHaveClass('text-[#f4ce14]');
            expect(reservationsLink).toHaveAttribute('aria-current', 'page');
        });

        test('non-active pages have hover effects', () => {
            renderWithRouter(<Navigation />);
            
            const aboutLink = screen.getByRole('link', { name: /about/i });
            expect(aboutLink).toHaveClass('text-black', 'hover:text-[#f4ce14]');
        });
    });

    describe('Mobile Navigation', () => {
        test('opens mobile menu when hamburger button is clicked', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('opacity-100', 'pointer-events-auto');
        });

        test('closes mobile menu when close button is clicked', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const closeButton = screen.getByRole('button', { name: /close mobile menu/i });
            fireEvent.click(closeButton);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('opacity-0', 'pointer-events-none');
        });

        test('closes mobile menu when backdrop is clicked', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const backdrop = screen.getByRole('dialog').querySelector('.fixed.inset-0.bg-black');
            fireEvent.click(backdrop);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('opacity-0', 'pointer-events-none');
        });

        test('closes mobile menu when Escape key is pressed', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const overlay = screen.getByRole('dialog');
            fireEvent.keyDown(overlay, { key: 'Escape' });
            
            expect(overlay).toHaveClass('opacity-0', 'pointer-events-none');
        });

        test('mobile menu has proper structure when open', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
            const mobileList = mobileNav.querySelector('ul');
            const mobileListItems = mobileList.querySelectorAll('li');
            
            expect(mobileNav).toBeInTheDocument();
            expect(mobileListItems).toHaveLength(6);
        });

        test('mobile menu closes when navigation item is clicked', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const homeLink = screen.getByRole('link', { name: /home/i });
            fireEvent.click(homeLink);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('opacity-0', 'pointer-events-none');
        });

        test('mobile menu has logo and footer', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const logo = screen.getByAltText('Little Lemon Restaurant Logo');
            expect(logo).toBeInTheDocument();
            expect(screen.getByText('Little Lemon Restaurant')).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        test('has proper ARIA labels and roles', () => {
            renderWithRouter(<Navigation />);
            
            expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /toggle mobile menu/i })).toBeInTheDocument();
        });

        test('hamburger button has proper ARIA attributes', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
            expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-menu');
            expect(hamburgerButton).toHaveAttribute('aria-haspopup', 'true');
        });

        test('mobile menu has proper ARIA attributes when open', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
            
            const mobileMenu = screen.getByRole('dialog');
            expect(mobileMenu).toHaveAttribute('aria-modal', 'true');
            expect(mobileMenu).toHaveAttribute('aria-label', 'Mobile navigation menu');
        });

        test('navigation items have proper roles', () => {
            renderWithRouter(<Navigation />);
            
            const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
            const desktopList = desktopNav.querySelector('ul');
            const desktopListItems = desktopList.querySelectorAll('li');
            
            expect(desktopList).toHaveAttribute('role', 'menubar');
            desktopListItems.forEach(item => {
                expect(item).toHaveAttribute('role', 'none');
            });
        });

        test('active page has proper ARIA current attribute', () => {
            mockUseLocation.mockReturnValue({ pathname: '/booking' });
            renderWithRouter(<Navigation />);
            
            const reservationsLink = screen.getByRole('link', { name: /reservations/i });
            expect(reservationsLink).toHaveAttribute('aria-current', 'page');
        });

        test('hamburger icon has proper ARIA hidden attribute', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            const icon = hamburgerButton.querySelector('svg');
            expect(icon).toHaveAttribute('aria-hidden', 'true');
        });
    });

    describe('Styling and Layout', () => {
        test('desktop navigation has proper responsive classes', () => {
            renderWithRouter(<Navigation />);
            
            const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
            expect(desktopNav).toHaveClass('hidden', 'md:block');
        });

        test('mobile hamburger button has proper responsive classes', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            expect(hamburgerButton).toHaveClass('md:hidden');
        });

        test('mobile overlay has proper responsive classes', () => {
            renderWithRouter(<Navigation />);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('md:hidden');
        });

        test('navigation items have proper text sizing', () => {
            renderWithRouter(<Navigation />);
            
            const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
            const links = desktopNav.querySelectorAll('a');
            
            links.forEach(link => {
                expect(link).toHaveClass('text-sm', 'lg:text-base');
            });
        });

        test('mobile navigation items have proper styling', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
            const links = mobileNav.querySelectorAll('a');
            
            links.forEach(link => {
                expect(link).toHaveClass('text-lg', 'font-semibold');
            });
        });
    });

    describe('Interactive Elements', () => {
        test('hamburger button has hover effect', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            expect(hamburgerButton).toHaveClass('hover:bg-gray-100');
        });

        test('close button has hover effect', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const closeButton = screen.getByRole('button', { name: /close mobile menu/i });
            expect(closeButton).toHaveClass('hover:bg-gray-100');
        });

        test('navigation links have transition effects', () => {
            renderWithRouter(<Navigation />);
            
            const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
            const links = desktopNav.querySelectorAll('a');
            
            links.forEach(link => {
                expect(link).toHaveClass('transition-colors', 'duration-200');
            });
        });

        test('mobile menu has smooth transitions', () => {
            renderWithRouter(<Navigation />);
            
            const overlay = screen.getByRole('dialog');
            expect(overlay).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
        });
    });

    describe('State Management', () => {
        test('toggles mobile menu state correctly', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            
            // Initially closed
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
            
            // Open menu
            fireEvent.click(hamburgerButton);
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
            
            // Close menu
            fireEvent.click(hamburgerButton);
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
        });

        test('mobile menu state resets when navigation item is clicked', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const homeLink = screen.getByRole('link', { name: /home/i });
            fireEvent.click(homeLink);
            
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
        });
    });

    describe('Keyboard Navigation', () => {
        test('Escape key closes mobile menu', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const overlay = screen.getByRole('dialog');
            fireEvent.keyDown(overlay, { key: 'Escape' });
            
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
        });

        test('other keys do not close mobile menu', () => {
            renderWithRouter(<Navigation />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            fireEvent.click(hamburgerButton);
            
            const overlay = screen.getByRole('dialog');
            fireEvent.keyDown(overlay, { key: 'Enter' });
            
            expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
        });
    });
}); 