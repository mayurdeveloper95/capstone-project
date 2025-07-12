import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BookingPage from '../BookingPage';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

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

describe('BookingPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock fetchAPI to return default times
        global.fetchAPI.mockResolvedValue(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
        // Mock submitAPI to return success
        global.submitAPI.mockResolvedValue(true);
    });

    describe('Rendering', () => {
        test('renders hero section with correct content', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
            expect(screen.getByText('Experience the finest Mediterranean cuisine')).toBeInTheDocument();
            expect(screen.getByText(/Join us for an unforgettable dining experience/)).toBeInTheDocument();
        });

        test('renders restaurant features section', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByText('Why Choose Little Lemon?')).toBeInTheDocument();
            expect(screen.getByText('Authentic Mediterranean Cuisine')).toBeInTheDocument();
            expect(screen.getByText('Fresh, Local Ingredients')).toBeInTheDocument();
            expect(screen.getByText('Warm, Welcoming Atmosphere')).toBeInTheDocument();
            expect(screen.getByText('Expert Service')).toBeInTheDocument();
        });

        test('renders booking form section', async () => {
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
        });

        test('renders additional information section', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByText('Opening Hours')).toBeInTheDocument();
            expect(screen.getByText('Contact Us')).toBeInTheDocument();
            expect(screen.getByText('Location')).toBeInTheDocument();
        });

        test('renders restaurant image', async () => {
            renderWithRouter(<BookingPage />);
            
            const restaurantImage = screen.getByAltText('Little Lemon Restaurant interior showing warm dining atmosphere');
            expect(restaurantImage).toBeInTheDocument();
            expect(restaurantImage).toHaveAttribute('src', '../icons/restaurant.jpg');
        });
    });

    describe('API Integration', () => {
        test('initializes available times on component mount', async () => {
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(global.fetchAPI).toHaveBeenCalled();
            });
        });

        test('handles fetchAPI when external API is available', async () => {
            const mockTimes = ['10:00', '11:00', '12:00'];
            global.fetchAPI.mockResolvedValue(mockTimes);
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(global.fetchAPI).toHaveBeenCalled();
            });
        });

        test('falls back to default times when fetchAPI fails', async () => {
            global.fetchAPI.mockRejectedValue(new Error('API Error'));
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(consoleSpy).toHaveBeenCalled();
            });
            
            consoleSpy.mockRestore();
        });

        test('falls back to default times when fetchAPI is not available', async () => {
            delete global.fetchAPI;
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
        });
    });

    describe('Form Submission', () => {
        test('handles successful form submission', async () => {
            const user = userEvent.setup();
            global.submitAPI.mockResolvedValue(true);
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(global.submitAPI).toHaveBeenCalledWith({
                    date: tomorrowStr,
                    time: '17:00',
                    guests: 4,
                    occasion: '',
                    seating: ''
                });
                expect(mockNavigate).toHaveBeenCalledWith('/confirmed');
            });
        });

        test('handles failed form submission', async () => {
            const user = userEvent.setup();
            global.submitAPI.mockResolvedValue(false);
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(screen.getByText('Failed to submit booking. Please try again.')).toBeInTheDocument();
            });
        });

        test('handles submission error', async () => {
            const user = userEvent.setup();
            global.submitAPI.mockRejectedValue(new Error('Network Error'));
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(screen.getByText('An error occurred while submitting your booking. Please try again.')).toBeInTheDocument();
                expect(consoleSpy).toHaveBeenCalled();
            });
            
            consoleSpy.mockRestore();
        });

        test('handles submitAPI when external API is not available', async () => {
            const user = userEvent.setup();
            delete global.submitAPI;
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
                    date: tomorrowStr,
                    time: '17:00',
                    guests: 4,
                    occasion: '',
                    seating: ''
                });
                expect(mockNavigate).toHaveBeenCalledWith('/confirmed');
            });
            
            consoleSpy.mockRestore();
        });
    });

    describe('Loading States', () => {
        test('shows loading state during form submission', async () => {
            const user = userEvent.setup();
            // Make submitAPI take some time
            global.submitAPI.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(screen.getByText('Submitting your reservation...')).toBeInTheDocument();
            });
        });
    });

    describe('Error Display', () => {
        test('displays error message when submission fails', async () => {
            const user = userEvent.setup();
            global.submitAPI.mockResolvedValue(false);
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                const errorMessage = screen.getByText('Failed to submit booking. Please try again.');
                expect(errorMessage).toBeInTheDocument();
                expect(errorMessage.closest('[role="alert"]')).toBeInTheDocument();
            });
        });

        test('displays error message when submission throws error', async () => {
            const user = userEvent.setup();
            global.submitAPI.mockRejectedValue(new Error('Network Error'));
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
            
            renderWithRouter(<BookingPage />);
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            });
            
            // Fill in form fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                const errorMessage = screen.getByText('An error occurred while submitting your booking. Please try again.');
                expect(errorMessage).toBeInTheDocument();
                expect(errorMessage.closest('[role="alert"]')).toBeInTheDocument();
            });
            
            consoleSpy.mockRestore();
        });
    });

    describe('Accessibility', () => {
        test('has proper ARIA labels and roles', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByRole('main')).toBeInTheDocument();
            expect(screen.getByText('Reserve Your Table')).toHaveAttribute('id', 'hero-heading');
            expect(screen.getByText('Why Choose Little Lemon?')).toHaveAttribute('id', 'features-heading');
            
            await waitFor(() => {
                expect(screen.getByText('Make a Reservation')).toHaveAttribute('id', 'booking-heading');
            });
        });

        test('has proper live regions for dynamic content', async () => {
            renderWithRouter(<BookingPage />);
            
            const alertRegions = screen.getAllByRole('alert');
            const statusRegions = screen.getAllByRole('status');
            
            expect(alertRegions.length).toBeGreaterThan(0);
            expect(statusRegions.length).toBeGreaterThan(0);
        });

        test('has proper semantic structure', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByRole('main')).toBeInTheDocument();
            expect(screen.getAllByRole('list')).toHaveLength(1);
            expect(screen.getAllByRole('listitem')).toHaveLength(4);
        });
    });

    describe('Contact Information', () => {
        test('displays correct contact information', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
            expect(screen.getByText('info@littlelemon.com')).toBeInTheDocument();
            expect(screen.getByText('123 Mediterranean Way')).toBeInTheDocument();
            expect(screen.getByText('Chicago, IL 60601')).toBeInTheDocument();
        });

        test('has proper contact links', async () => {
            renderWithRouter(<BookingPage />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
            expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
        });
    });

    describe('Opening Hours', () => {
        test('displays correct opening hours', async () => {
            renderWithRouter(<BookingPage />);
            
            expect(screen.getByText(/Monday - Friday: 11:00 AM - 10:00 PM/)).toBeInTheDocument();
            expect(screen.getByText(/Saturday - Sunday: 10:00 AM - 11:00 PM/)).toBeInTheDocument();
        });
    });
}); 