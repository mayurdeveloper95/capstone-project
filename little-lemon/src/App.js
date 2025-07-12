import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/booking" element={<BookingPage />} />
                        <Route path="/confirmed" element={<ConfirmedBooking />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;