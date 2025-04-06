import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';

function BookingForm() {
  const { propertyId } = useParams();
  const [form, setForm] = useState({
    check_in_date: '',
    check_out_date: '',
    total_amt: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', { ...form, property_id: propertyId });
      alert('Booking successful');
    } catch (err) {
      alert('Booking failed');
    }
  };

  return (
<form onSubmit={handleSubmit} className="booking-form">
        <label>Check-in Date:</label>
        <input type="date" name="check_in_date" required onChange={handleChange} />

        <label>Check-out Date:</label>
        <input type="date" name="check_out_date" required onChange={handleChange} />

        <label>Total Amount (₹):</label>
        <input
          type="number"
          name="total_amt"
          placeholder="Total Amount"
          min="0"
          required
          onChange={handleChange}
        />

        <button type="submit">Confirm Booking</button>
      </form>
  );
}

export default BookingForm;
