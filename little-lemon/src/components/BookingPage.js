import { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

// Reducer function to handle available times state
const availableTimesReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALIZE_TIMES':
            return action.payload;
        case 'UPDATE_TIMES':
            return action.payload;
        default:
            return state;
    }
};

// Initialize times function
const initializeTimes = async () => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    
    try {
        if (typeof window.fetchAPI === 'function') {
            return window.fetchAPI(todayStr);
        }
        return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    } catch (error) {
        console.log(error);
        return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    }
};

// Update times function
const updateTimes = async (date) => {
    try {
        if (typeof window.fetchAPI === 'function') {
            return window.fetchAPI(date);
        }
        const dayOfWeek = new Date(date).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return [
                '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
            ];
        } else {
            return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
        }
    } catch (error) {
        console.log(error);
        const dayOfWeek = new Date(date).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return [
                '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
            ];
        } else {
            return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
        }
    }
};

// Submit form function
const submitForm = async (formData) => {
    try {
        if (typeof window.submitAPI === 'function') {
            const result = await window.submitAPI(formData);
            return result;
        }
        console.log('Form submitted:', formData);
        return true;
    } catch (error) {
        console.log('Error submitting form:', error);
        return false;
    }
};

const BookingPage = () => {
    const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    // Initialize available times on component mount
    useEffect(() => {
        const initializeAvailableTimes = async () => {
            const times = await initializeTimes();
            dispatch({ type: 'INITIALIZE_TIMES', payload: times });
        };
        initializeAvailableTimes();
    }, []);

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const success = await submitForm(formData);
            if (success) {
                navigate('/confirmed');
            } else {
                setSubmitError('Failed to submit booking. Please try again.');
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            setSubmitError('An error occurred while submitting your booking. Please try again.');
            setIsSubmitting(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-50" role="main">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#495e57] to-[#333] text-white py-16" aria-labelledby="hero-heading">
                <div className="container mx-auto px-4 text-center">
                    <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-4">Reserve Your Table</h1>
                    <p className="text-xl md:text-2xl mb-8 text-[#f4ce14]">
                        Experience the finest Mediterranean cuisine
                    </p>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg text-gray-200">
                            Join us for an unforgettable dining experience at Little Lemon. 
                            Our expert chefs craft authentic Mediterranean dishes using the 
                            freshest ingredients and traditional recipes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Restaurant Info Section */}
            <section className="py-12 bg-white" aria-labelledby="features-heading">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 id="features-heading" className="text-3xl font-bold text-gray-800 mb-6">
                                Why Choose Little Lemon?
                            </h2>
                            <div className="space-y-4" role="list">
                                <div className="flex items-start space-x-4" role="listitem">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#f4ce14] rounded-full flex items-center justify-center" aria-hidden="true">
                                        <span className="text-black font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Authentic Mediterranean Cuisine</h3>
                                        <p className="text-gray-600">Traditional recipes passed down through generations</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4" role="listitem">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#f4ce14] rounded-full flex items-center justify-center" aria-hidden="true">
                                        <span className="text-black font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Fresh, Local Ingredients</h3>
                                        <p className="text-gray-600">We source the finest local and seasonal ingredients</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4" role="listitem">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#f4ce14] rounded-full flex items-center justify-center" aria-hidden="true">
                                        <span className="text-black font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Warm, Welcoming Atmosphere</h3>
                                        <p className="text-gray-600">Perfect for intimate dinners and family celebrations</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4" role="listitem">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#f4ce14] rounded-full flex items-center justify-center" aria-hidden="true">
                                        <span className="text-black font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Expert Service</h3>
                                        <p className="text-gray-600">Our staff ensures every visit is memorable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <img 
                                src="../icons/restaurant.jpg" 
                                alt="Little Lemon Restaurant interior showing warm dining atmosphere" 
                                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="py-16 bg-gray-50" aria-labelledby="booking-heading">
                <div className="container mx-auto px-4">
                    {/* Error Message */}
                    {submitError && (
                        <div className="max-w-2xl mx-auto mb-6" role="alert" aria-live="polite">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-5 h-5 text-red-400" aria-hidden="true">
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{submitError}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {isSubmitting && (
                        <div className="max-w-2xl mx-auto mb-6" role="status" aria-live="polite">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3" aria-hidden="true"></div>
                                    <p className="text-sm text-blue-700">Submitting your reservation...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div aria-labelledby="booking-heading">
                        <h2 id="booking-heading" className="sr-only">Make a Reservation</h2>
                        <BookingForm
                            onSubmit={handleFormSubmit}
                            availableTimes={availableTimes}
                            dispatch={dispatch}
                            updateTimes={updateTimes}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </section>

            {/* Additional Information Section */}
            <section className="py-12 bg-white" aria-labelledby="info-heading">
                <div className="container mx-auto px-4">
                    <h2 id="info-heading" className="sr-only">Additional Information</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="w-16 h-16 bg-[#f4ce14] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Opening Hours</h3>
                            <p className="text-gray-600">
                                Monday - Friday: 11:00 AM - 10:00 PM<br />
                                Saturday - Sunday: 10:00 AM - 11:00 PM
                            </p>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-[#f4ce14] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h3>
                            <address className="text-gray-600 not-italic">
                                <p>123 Mediterranean Way</p>
                                <p>Phone: <a href="tel:+15551234567" className="hover:underline">(555) 123-4567</a></p>
                                <p>Email: <a href="mailto:info@littlelemon.com" className="hover:underline">info@littlelemon.com</a></p>
                            </address>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-[#f4ce14] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
                            <address className="text-gray-600 not-italic">
                                123 Mediterranean Ave<br />
                                Chicago, IL 60601
                            </address>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookingPage; 