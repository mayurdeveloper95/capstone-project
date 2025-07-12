import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookingForm = ({ availableTimes, dispatch, updateTimes, onSubmit, isSubmitting = false }) => {
    // Validation schema using Yup
    const validationSchema = Yup.object({
        date: Yup.string().required('Please select a date'),
        time: Yup.string().required('Please select a time'),
        guests: Yup.number()
            .required('Please select number of guests')
            .min(1, 'Number of guests must be between 1 and 10')
            .max(10, 'Number of guests must be between 1 and 10'),
        occasion: Yup.string(),
        seating: Yup.string(),
    });

    // Initial values for the form
    const initialValues = {
        date: '',
        time: '',
        guests: '',
        occasion: '',
        seating: '',
    };

    // Handle date change to update available times
    const handleDateChange = async (e, setFieldValue) => {
        const value = e.target.value;
        setFieldValue('date', value);
        try {
            const newTimes = await updateTimes(value);
            dispatch({ type: 'UPDATE_TIMES', payload: newTimes });
        } catch (error) {
            // Optionally handle error
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={onSubmit}
        >
            {({ isValid, setFieldValue, values }) => (
                <Form
                    className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
                    aria-labelledby="booking-form-title"
                    noValidate
                >
                    <h2 id="booking-form-title" className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Make a Reservation
                    </h2>
                    <div className="space-y-6" role="group" aria-labelledby="booking-form-title">
                        {/* Date Selection */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                                Date <span aria-label="required">*</span>
                            </label>
                            <Field
                                type="date"
                                id="date"
                                name="date"
                                min={(() => {
                                    const today = new Date();
                                    const yyyy = today.getFullYear();
                                    const mm = String(today.getMonth() + 1).padStart(2, '0');
                                    const dd = String(today.getDate()).padStart(2, '0');
                                    return `${yyyy}-${mm}-${dd}`;
                                })()}
                                aria-required="true"
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f4ce14] focus:border-[#f4ce14] transition-colors duration-200"
                                onChange={e => handleDateChange(e, setFieldValue)}
                            />
                            <ErrorMessage name="date">
                                {msg => <p className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">{msg}</p>}
                            </ErrorMessage>
                            <p id="date-help" className="sr-only">Select a date for your reservation</p>
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                                Time <span aria-label="required">*</span>
                            </label>
                            <Field
                                as="select"
                                id="time"
                                name="time"
                                aria-required="true"
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f4ce14] focus:border-[#f4ce14] transition-colors duration-200"
                            >
                                <option value="">Select a time</option>
                                {availableTimes.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="time">
                                {msg => <p className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">{msg}</p>}
                            </ErrorMessage>
                            <p id="time-help" className="sr-only">Select an available time for your reservation</p>
                        </div>

                        {/* Number of Guests */}
                        <div>
                            <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                                Number of Guests <span aria-label="required">*</span>
                            </label>
                            <Field
                                type="number"
                                id="guests"
                                name="guests"
                                min={1}
                                max={10}
                                aria-required="true"
                                required
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f4ce14] focus:border-[#f4ce14] transition-colors duration-200"
                            />
                            <ErrorMessage name="guests">
                                {msg => <p className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">{msg}</p>}
                            </ErrorMessage>
                            <p id="guests-help" className="sr-only">Select the number of guests for your reservation (1-10 people)</p>
                        </div>

                        {/* Occasion */}
                        <div>
                            <label htmlFor="occasion" className="block text-sm font-semibold text-gray-700 mb-2">
                                Occasion
                            </label>
                            <Field
                                as="select"
                                id="occasion"
                                name="occasion"
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4ce14] focus:border-[#f4ce14] transition-colors duration-200"
                            >
                                <option value="">Select an occasion (optional)</option>
                                <option value="birthday">Birthday</option>
                                <option value="anniversary">Anniversary</option>
                                <option value="business">Business Dinner</option>
                                <option value="casual">Casual Dining</option>
                                <option value="celebration">Celebration</option>
                            </Field>
                            <p id="occasion-help" className="sr-only">Select the occasion for your reservation (optional)</p>
                        </div>

                        {/* Seating Preference */}
                        <div>
                            <label htmlFor="seating" className="block text-sm font-semibold text-gray-700 mb-2">
                                Seating Preference
                            </label>
                            <Field
                                as="select"
                                id="seating"
                                name="seating"
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f4ce14] focus:border-[#f4ce14] transition-colors duration-200"
                            >
                                <option value="">Select seating preference (optional)</option>
                                <option value="indoor">Indoor</option>
                                <option value="outdoor">Outdoor</option>
                                <option value="window">Window Seat</option>
                                <option value="quiet">Quiet Area</option>
                            </Field>
                            <p id="seating-help" className="sr-only">Select your preferred seating area (optional)</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            aria-describedby="submit-help"
                            className={`w-full font-bold py-4 px-6 rounded-lg transition-colors duration-200 transform focus:outline-none focus:ring-2 focus:ring-[#f4ce14] focus:ring-offset-2 ${
                                isSubmitting || !isValid
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                    : 'bg-[#f4ce14] text-black hover:bg-[#e6c200] hover:scale-105'
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Reserve Table'}
                        </button>
                        <p id="submit-help" className="sr-only">Submit your reservation request</p>
                    </div>

                    <p className="text-sm text-gray-600 text-center mt-6" aria-live="polite">
                        <span aria-label="required">*</span> Required fields
                    </p>
                </Form>
            )}
        </Formik>
    );
};

export default BookingForm; 