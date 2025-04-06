import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty'; // ✅ Import it here
import Booking from './components/BookingForm';
import Review from './components/ReviewForm';
import MyBookings from './components/MyBookingsn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} /> {/* ✅ Edit route */}
        <Route path="/my-bookings" element={<MyBookings />} /> {/* ✅ Edit route */}
        <Route path="/booking/:propertyId" element={<Booking />} />
        <Route path="/review/:bookingId" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
