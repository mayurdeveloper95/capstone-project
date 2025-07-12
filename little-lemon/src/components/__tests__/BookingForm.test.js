import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../BookingForm';

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

describe('BookingForm', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
        dispatch: jest.fn(),
        updateTimes: jest.fn(),
        onSubmit: jest.fn(),
        isSubmitting: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders all form fields correctly', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/seating preference/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument();
        });

        test('renders form title and required field indicator', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
            expect(screen.getByText('* Required fields')).toBeInTheDocument();
        });

        test('populates time options with available times', () => {
            const customTimes = ['10:00', '11:00', '12:00'];
            renderWithRouter(<BookingForm {...mockProps} availableTimes={customTimes} />);
            
            customTimes.forEach(time => {
                expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
            });
        });

        test('populates occasion options correctly', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const occasionSelect = screen.getByLabelText(/occasion/i);
            fireEvent.click(occasionSelect);
            
            expect(screen.getByRole('option', { name: 'Birthday' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Anniversary' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Business Dinner' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Casual Dining' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Celebration' })).toBeInTheDocument();
        });

        test('populates seating preference options correctly', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const seatingSelect = screen.getByLabelText(/seating preference/i);
            fireEvent.click(seatingSelect);
            
            expect(screen.getByRole('option', { name: 'Indoor' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Outdoor' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Window Seat' })).toBeInTheDocument();
            expect(screen.getByRole('option', { name: 'Quiet Area' })).toBeInTheDocument();
        });
    });

    describe('Form Validation', () => {
        test('shows validation errors for empty required fields', async () => {
            const user = userEvent.setup();
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(screen.getByText('Please select a date')).toBeInTheDocument();
                expect(screen.getByText('Please select a time')).toBeInTheDocument();
                expect(screen.getByText('Please select number of guests')).toBeInTheDocument();
            });
        });

        test('validates guest number range', async () => {
            const user = userEvent.setup();
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            
            // Test minimum value
            await user.clear(guestsInput);
            await user.type(guestsInput, '0');
            await user.tab();
            
            await waitFor(() => {
                expect(screen.getByText('Number of guests must be between 1 and 10')).toBeInTheDocument();
            });
            
            // Test maximum value
            await user.clear(guestsInput);
            await user.type(guestsInput, '11');
            await user.tab();
            
            await waitFor(() => {
                expect(screen.getByText('Number of guests must be between 1 and 10')).toBeInTheDocument();
            });
        });

        test('accepts valid guest numbers', async () => {
            const user = userEvent.setup();
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '5');
            await user.tab();
            
            await waitFor(() => {
                expect(screen.queryByText('Number of guests must be between 1 and 10')).not.toBeInTheDocument();
            });
        });
    });

    describe('Date Handling', () => {
        test('sets minimum date to today', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const dateInput = screen.getByLabelText(/date/i);
            const today = new Date();
            const expectedMinDate = today.toISOString().split('T')[0];
            
            expect(dateInput).toHaveAttribute('min', expectedMinDate);
        });

        test('calls updateTimes when date changes', async () => {
            const user = userEvent.setup();
            const mockUpdateTimes = jest.fn().mockResolvedValue(['10:00', '11:00']);
            renderWithRouter(<BookingForm {...mockProps} updateTimes={mockUpdateTimes} />);
            
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            await user.type(dateInput, tomorrowStr);
            
            await waitFor(() => {
                expect(mockUpdateTimes).toHaveBeenCalledWith(tomorrowStr);
            });
        });

        test('dispatches updated times when date changes', async () => {
            const user = userEvent.setup();
            const mockDispatch = jest.fn();
            const mockUpdateTimes = jest.fn().mockResolvedValue(['10:00', '11:00']);
            
            renderWithRouter(<BookingForm {...mockProps} dispatch={mockDispatch} updateTimes={mockUpdateTimes} />);
            
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            await user.type(dateInput, tomorrowStr);
            
            await waitFor(() => {
                expect(mockDispatch).toHaveBeenCalledWith({
                    type: 'UPDATE_TIMES',
                    payload: ['10:00', '11:00']
                });
            });
        });
    });

    describe('Form Submission', () => {
        test('calls onSubmit with form data when valid form is submitted', async () => {
            const user = userEvent.setup();
            const mockOnSubmit = jest.fn();
            renderWithRouter(<BookingForm {...mockProps} onSubmit={mockOnSubmit} />);
            
            // Fill in required fields
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
                expect(mockOnSubmit).toHaveBeenCalledWith({
                    date: tomorrowStr,
                    time: '17:00',
                    guests: 4,
                    occasion: '',
                    seating: ''
                }, expect.any(Object));
            });
        });

        test('includes optional fields in submission data', async () => {
            const user = userEvent.setup();
            const mockOnSubmit = jest.fn();
            renderWithRouter(<BookingForm {...mockProps} onSubmit={mockOnSubmit} />);
            
            // Fill in required fields
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            // Fill in optional fields
            const occasionSelect = screen.getByLabelText(/occasion/i);
            await user.selectOptions(occasionSelect, 'birthday');
            
            const seatingSelect = screen.getByLabelText(/seating preference/i);
            await user.selectOptions(seatingSelect, 'indoor');
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalledWith({
                    date: tomorrowStr,
                    time: '17:00',
                    guests: 4,
                    occasion: 'birthday',
                    seating: 'indoor'
                }, expect.any(Object));
            });
        });
    });

    describe('Loading States', () => {
        test('disables form fields when submitting', () => {
            renderWithRouter(<BookingForm {...mockProps} isSubmitting={true} />);
            
            expect(screen.getByLabelText(/date/i)).toBeDisabled();
            expect(screen.getByLabelText(/time/i)).toBeDisabled();
            expect(screen.getByLabelText(/number of guests/i)).toBeDisabled();
            expect(screen.getByLabelText(/occasion/i)).toBeDisabled();
            expect(screen.getByLabelText(/seating preference/i)).toBeDisabled();
        });

        test('shows submitting text on button when submitting', () => {
            renderWithRouter(<BookingForm {...mockProps} isSubmitting={true} />);
            
            expect(screen.getByRole('button', { name: /submitting/i })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /reserve table/i })).not.toBeInTheDocument();
        });

        test('disables submit button when form is invalid', async () => {
            const user = userEvent.setup();
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            expect(submitButton).toBeDisabled();
            
            // Fill in required fields to make form valid
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            await user.type(dateInput, tomorrowStr);
            
            const timeSelect = screen.getByLabelText(/time/i);
            await user.selectOptions(timeSelect, '17:00');
            
            const guestsInput = screen.getByLabelText(/number of guests/i);
            await user.type(guestsInput, '4');
            
            await waitFor(() => {
                expect(submitButton).not.toBeDisabled();
            });
        });
    });

    describe('Accessibility', () => {
        test('has proper ARIA labels and roles', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            expect(screen.getByRole('form')).toHaveAttribute('aria-labelledby', 'booking-form-title');
            expect(screen.getByText('Make a Reservation')).toHaveAttribute('id', 'booking-form-title');
            
            // Check required field indicators
            const requiredSpans = screen.getAllByText('*');
            requiredSpans.forEach(span => {
                expect(span).toHaveAttribute('aria-label', 'required');
            });
        });

        test('has proper form validation attributes', () => {
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const dateInput = screen.getByLabelText(/date/i);
            const timeSelect = screen.getByLabelText(/time/i);
            const guestsInput = screen.getByLabelText(/number of guests/i);
            
            expect(dateInput).toHaveAttribute('aria-required', 'true');
            expect(timeSelect).toHaveAttribute('aria-required', 'true');
            expect(guestsInput).toHaveAttribute('aria-required', 'true');
        });

        test('has proper error message roles', async () => {
            const user = userEvent.setup();
            renderWithRouter(<BookingForm {...mockProps} />);
            
            const submitButton = screen.getByRole('button', { name: /reserve table/i });
            await user.click(submitButton);
            
            await waitFor(() => {
                const errorMessages = screen.getAllByRole('alert');
                expect(errorMessages.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Error Handling', () => {
        test('handles updateTimes errors gracefully', async () => {
            const user = userEvent.setup();
            const mockUpdateTimes = jest.fn().mockRejectedValue(new Error('API Error'));
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            
            renderWithRouter(<BookingForm {...mockProps} updateTimes={mockUpdateTimes} />);
            
            const dateInput = screen.getByLabelText(/date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            await user.type(dateInput, tomorrowStr);
            
            await waitFor(() => {
                expect(mockUpdateTimes).toHaveBeenCalledWith(tomorrowStr);
            });
            
            consoleSpy.mockRestore();
        });
    });
}); 