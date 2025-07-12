const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8" role="contentinfo">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Little Lemon</h3>
                        <p className="text-gray-300">
                            A family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <address className="text-gray-300 space-y-2 not-italic">
                            <p>123 Mediterranean Way</p>
                            <p>Phone: <a href="tel:+15551234567" className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded">(555) 123-4567</a></p>
                            <p>Email: <a href="mailto:info@littlelemon.com" className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded">info@littlelemon.com</a></p>
                        </address>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hours</h3>
                        <div className="text-gray-300 space-y-2">
                            <p>Monday - Sunday</p>
                            <p>11:00 AM - 10:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
