import { Link } from 'react-router-dom';

const ConfirmedBooking = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" role="main">
            <div className="max-w-2xl mx-auto text-center px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Confirmation Message */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4" id="confirmation-heading">
                        Booking Confirmed!
                    </h1>
                    
                    <p className="text-lg text-gray-600 mb-8">
                        Thank you for choosing Little Lemon. Your reservation has been successfully confirmed.
                    </p>

                    {/* Additional Information */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>You will receive a confirmation email shortly</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Please arrive 5 minutes before your reservation time</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Contact us if you need to modify or cancel your booking</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-blue-50 rounded-lg p-6 mb-8">
                        <h3 className="font-semibold text-gray-800 mb-2">Need to make changes?</h3>
                        <p className="text-gray-600 mb-3">
                            Contact us at <a href="tel:+15551234567" className="text-blue-600 hover:underline">(555) 123-4567</a> or 
                            <a href="mailto:info@littlelemon.com" className="text-blue-600 hover:underline ml-1">info@littlelemon.com</a>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="bg-[#f4ce14] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#e6c200] transition-colors duration-200"
                            aria-label="Return to home page"
                        >
                            Return to Home
                        </Link>
                        <Link
                            to="/booking"
                            className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Make another reservation"
                        >
                            Make Another Reservation
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedBooking; 