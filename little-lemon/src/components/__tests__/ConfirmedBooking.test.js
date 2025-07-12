import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ConfirmedBooking from '../ConfirmedBooking';

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('ConfirmedBooking', () => {
    describe('Rendering', () => {
        test('renders confirmation message correctly', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
            expect(screen.getByText(/Thank you for choosing Little Lemon/)).toBeInTheDocument();
        });

        test('renders success icon', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const successIcon = screen.getByRole('img', { hidden: true });
            expect(successIcon).toBeInTheDocument();
        });

        test('renders "What\'s Next?" section with all items', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByText("What's Next?")).toBeInTheDocument();
            expect(screen.getByText(/You will receive a confirmation email shortly/)).toBeInTheDocument();
            expect(screen.getByText(/Please arrive 5 minutes before your reservation time/)).toBeInTheDocument();
            expect(screen.getByText(/Contact us if you need to modify or cancel your booking/)).toBeInTheDocument();
        });

        test('renders contact information section', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByText('Need to make changes?')).toBeInTheDocument();
            expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
            expect(screen.getByText('info@littlelemon.com')).toBeInTheDocument();
        });

        test('renders action buttons', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByRole('link', { name: /return to home/i })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /make another reservation/i })).toBeInTheDocument();
        });
    });

    describe('Navigation Links', () => {
        test('has correct link to home page', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const homeLink = screen.getByRole('link', { name: /return to home/i });
            expect(homeLink).toHaveAttribute('href', '/');
        });

        test('has correct link to booking page', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const bookingLink = screen.getByRole('link', { name: /make another reservation/i });
            expect(bookingLink).toHaveAttribute('href', '/booking');
        });

        test('has correct contact links', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
            expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
        });
    });

    describe('Accessibility', () => {
        test('has proper ARIA labels and roles', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByRole('main')).toBeInTheDocument();
            expect(screen.getByText('Booking Confirmed!')).toHaveAttribute('id', 'confirmation-heading');
        });

        test('has proper ARIA labels on action buttons', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const homeLink = screen.getByRole('link', { name: /return to home/i });
            const bookingLink = screen.getByRole('link', { name: /make another reservation/i });
            
            expect(homeLink).toHaveAttribute('aria-label', 'Return to home page');
            expect(bookingLink).toHaveAttribute('aria-label', 'Make another reservation');
        });

        test('has proper semantic structure', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByRole('main')).toBeInTheDocument();
            expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
            expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
            expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
        });

        test('has proper list structure for "What\'s Next?" items', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const listItems = screen.getAllByText(/✓/);
            expect(listItems.length).toBe(3);
        });
    });

    describe('Styling and Layout', () => {
        test('has proper CSS classes for styling', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const mainContainer = screen.getByRole('main');
            expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-50', 'flex', 'items-center', 'justify-center');
            
            const contentContainer = mainContainer.querySelector('.max-w-2xl');
            expect(contentContainer).toHaveClass('max-w-2xl', 'mx-auto', 'text-center', 'px-4');
            
            const cardContainer = contentContainer.querySelector('.bg-white');
            expect(cardContainer).toHaveClass('bg-white', 'rounded-lg', 'shadow-lg', 'p-8');
        });

        test('has proper button styling classes', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const homeButton = screen.getByRole('link', { name: /return to home/i });
            const bookingButton = screen.getByRole('link', { name: /make another reservation/i });
            
            expect(homeButton).toHaveClass('bg-[#f4ce14]', 'text-black', 'font-bold', 'py-3', 'px-6', 'rounded-lg');
            expect(bookingButton).toHaveClass('bg-gray-800', 'text-white', 'font-bold', 'py-3', 'px-6', 'rounded-lg');
        });

        test('has proper responsive design classes', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const buttonContainer = screen.getByRole('link', { name: /return to home/i }).parentElement;
            expect(buttonContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'justify-center');
        });
    });

    describe('Content Verification', () => {
        test('displays all required information sections', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            // Check main sections
            expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
            expect(screen.getByText("What's Next?")).toBeInTheDocument();
            expect(screen.getByText('Need to make changes?')).toBeInTheDocument();
            
            // Check all list items in "What's Next?" section
            const nextSteps = [
                'You will receive a confirmation email shortly',
                'Please arrive 5 minutes before your reservation time',
                'Contact us if you need to modify or cancel your booking'
            ];
            
            nextSteps.forEach(step => {
                expect(screen.getByText(step)).toBeInTheDocument();
            });
        });

        test('displays correct contact information', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            expect(screen.getByText('Contact us at')).toBeInTheDocument();
            expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
            expect(screen.getByText('info@littlelemon.com')).toBeInTheDocument();
        });
    });

    describe('Interactive Elements', () => {
        test('buttons have hover effects', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const homeButton = screen.getByRole('link', { name: /return to home/i });
            const bookingButton = screen.getByRole('link', { name: /make another reservation/i });
            
            expect(homeButton).toHaveClass('hover:bg-[#e6c200]');
            expect(bookingButton).toHaveClass('hover:bg-gray-700');
        });

        test('contact links have hover effects', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveClass('hover:underline');
            expect(emailLink).toHaveClass('hover:underline');
        });
    });

    describe('Visual Elements', () => {
        test('has success icon with proper styling', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const successIconContainer = screen.getByText('Booking Confirmed!').previousElementSibling;
            expect(successIconContainer).toHaveClass('w-20', 'h-20', 'bg-green-100', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mx-auto', 'mb-6');
        });

        test('has proper section styling', () => {
            renderWithRouter(<ConfirmedBooking />);
            
            const nextStepsSection = screen.getByText("What's Next?").closest('.bg-gray-50');
            const contactSection = screen.getByText('Need to make changes?').closest('.bg-blue-50');
            
            expect(nextStepsSection).toHaveClass('bg-gray-50', 'rounded-lg', 'p-6', 'mb-8', 'text-left');
            expect(contactSection).toHaveClass('bg-blue-50', 'rounded-lg', 'p-6', 'mb-8');
        });
    });
}); 