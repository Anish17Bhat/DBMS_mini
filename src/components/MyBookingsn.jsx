import { useEffect, useState } from 'react';
import api from '../api';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        alert('Could not load bookings');
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter(b => b.booking_id !== bookingId));
      alert('Booking cancelled successfully!');
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert('Failed to cancel booking');
    }
  };


  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.booking_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p><strong>Property ID:</strong> {b.property_id}</p>
            <p><strong>Check-in:</strong> {b.check_in_date}</p>
            <p><strong>Check-out:</strong> {b.check_out_date}</p>
            <p><strong>Total:</strong> ₹{b.total_amt}</p>
            <button onClick={()=>cancelBooking(b.booking_id)}>Cancel Booking</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
