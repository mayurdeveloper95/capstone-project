import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the external API functions
global.fetchAPI = jest.fn();
global.submitAPI = jest.fn();

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock fetchAPI to return default times
        global.fetchAPI.mockResolvedValue(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
        // Mock submitAPI to return success
        global.submitAPI.mockResolvedValue(true);
    });

    describe('Rendering', () => {
        test('renders without crashing', () => {
            renderWithRouter(<App />);
        });

        test('renders header with logo', () => {
            renderWithRouter(<App />);
            
            const logo = screen.getByAltText('Little Lemon Restaurant Logo');
            expect(logo).toBeInTheDocument();
        });

        test('renders navigation menu', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByText('About')).toBeInTheDocument();
            expect(screen.getByText('Menu')).toBeInTheDocument();
            expect(screen.getByText('Reservations')).toBeInTheDocument();
            expect(screen.getByText('Order Online')).toBeInTheDocument();
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        test('renders hero section on home page', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Little Lemon')).toBeInTheDocument();
            expect(screen.getByText('Chicago')).toBeInTheDocument();
            expect(screen.getByText(/We are a family owned Mediterranean restaurant/)).toBeInTheDocument();
        });

        test('renders specials section on home page', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText("This weeks specials!")).toBeInTheDocument();
            expect(screen.getByText('Greek salad')).toBeInTheDocument();
            expect(screen.getByText('Bruschetta')).toBeInTheDocument();
            expect(screen.getByText('Lemon Dessert')).toBeInTheDocument();
        });

        test('renders footer', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Little Lemon')).toBeInTheDocument();
            expect(screen.getByText('Contact')).toBeInTheDocument();
            expect(screen.getByText('Hours')).toBeInTheDocument();
        });
    });

    describe('Navigation', () => {
        test('has proper routing structure', () => {
            renderWithRouter(<App />);
            
            // Check that main navigation elements are present
            expect(screen.getByRole('banner')).toBeInTheDocument();
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        });

        test('logo links to home page', () => {
            renderWithRouter(<App />);
            
            const logoLink = screen.getByRole('link', { name: /little lemon restaurant - home/i });
            expect(logoLink).toHaveAttribute('href', '/');
        });

        test('reservations link navigates to booking page', () => {
            renderWithRouter(<App />);
            
            const reservationsLink = screen.getByRole('link', { name: /reservations/i });
            expect(reservationsLink).toHaveAttribute('href', '/booking');
        });
    });

    describe('Home Page Content', () => {
        test('displays restaurant information correctly', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Little Lemon')).toBeInTheDocument();
            expect(screen.getByText('Chicago')).toBeInTheDocument();
            expect(screen.getByText(/family owned Mediterranean restaurant/)).toBeInTheDocument();
        });

        test('displays reserve table button', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
        });

        test('displays special menu items', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Greek salad')).toBeInTheDocument();
            expect(screen.getByText('Bruschetta')).toBeInTheDocument();
            expect(screen.getByText('Lemon Dessert')).toBeInTheDocument();
        });

        test('displays special item prices', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('$12.99')).toBeInTheDocument();
            expect(screen.getByText('$ 5.99')).toBeInTheDocument();
            expect(screen.getByText('$ 5.00')).toBeInTheDocument();
        });
    });

    describe('Footer Content', () => {
        test('displays contact information', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('123 Mediterranean Way')).toBeInTheDocument();
            expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
            expect(screen.getByText('info@littlelemon.com')).toBeInTheDocument();
        });

        test('displays business hours', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Monday - Sunday')).toBeInTheDocument();
            expect(screen.getByText('11:00 AM - 10:00 PM')).toBeInTheDocument();
        });

        test('displays copyright notice', () => {
            renderWithRouter(<App />);
            
            const currentYear = new Date().getFullYear();
            expect(screen.getByText(`© ${currentYear} Little Lemon. All rights reserved.`)).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        test('has proper semantic structure', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByRole('banner')).toBeInTheDocument();
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
            expect(screen.getByRole('main')).toBeInTheDocument();
        });

        test('has proper ARIA labels', () => {
            renderWithRouter(<App />);
            
            const logoLink = screen.getByRole('link', { name: /little lemon restaurant - home/i });
            expect(logoLink).toBeInTheDocument();
        });

        test('has proper heading hierarchy', () => {
            renderWithRouter(<App />);
            
            const headings = screen.getAllByRole('heading');
            expect(headings.length).toBeGreaterThan(0);
        });
    });

    describe('Responsive Design', () => {
        test('has responsive navigation', () => {
            renderWithRouter(<App />);
            
            const desktopNav = screen.getByRole('navigation', { name: /main navigation/i });
            expect(desktopNav).toHaveClass('hidden', 'md:block');
        });

        test('has mobile hamburger menu', () => {
            renderWithRouter(<App />);
            
            const hamburgerButton = screen.getByRole('button', { name: /toggle mobile menu/i });
            expect(hamburgerButton).toHaveClass('md:hidden');
        });
    });

    describe('Interactive Elements', () => {
        test('reserve table button is functional', () => {
            renderWithRouter(<App />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).not.toBeDisabled();
        });

        test('online menu button is functional', () => {
            renderWithRouter(<App />);
            
            const onlineMenuButton = screen.getByRole('button', { name: /online menu/i });
            expect(onlineMenuButton).not.toBeDisabled();
        });

        test('contact links are functional', () => {
            renderWithRouter(<App />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
            expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
        });
    });

    describe('Content Verification', () => {
        test('displays correct restaurant branding', () => {
            renderWithRouter(<App />);
            
            const logoElements = screen.getAllByText('Little Lemon');
            expect(logoElements.length).toBeGreaterThan(0);
        });

        test('displays correct location information', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText('Chicago')).toBeInTheDocument();
        });

        test('displays correct restaurant description', () => {
            renderWithRouter(<App />);
            
            expect(screen.getByText(/family owned Mediterranean restaurant/)).toBeInTheDocument();
        });
    });
});
