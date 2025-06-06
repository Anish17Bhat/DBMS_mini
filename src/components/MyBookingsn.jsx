import { useEffect, useState } from 'react';
import api from '../api';
import ReviewForm from './ReviewForm';
import './Styles/MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewedBookings, setReviewedBookings] = useState([]);


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

    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews');
        const reviewed = res.data.map(r => r.booking_id);
        setReviewedBookings(reviewed);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };

    fetchBookings();
    fetchReviews();
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

  const markAsReviewed = (bookingId) => {
    setReviewedBookings([...reviewedBookings, bookingId]);
  };

  return (
    <>
    <h2 className='heading'>My Bookings</h2>
    <div className="my-bookings-container">
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.booking_id} className="booking-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p><strong>Property:</strong> {b.property_title}</p>
            <p><strong>Property ID:</strong> {b.property_id}</p>
            <p><strong>Check-in:</strong> {b.check_in_date}</p>
            <p><strong>Check-out:</strong> {b.check_out_date}</p>
            <p><strong>Total:</strong> ₹{b.total_amt}</p>
            <button onClick={()=>cancelBooking(b.booking_id)}>Cancel Booking</button>
            {!reviewedBookings.includes(b.booking_id) ? (
              <ReviewForm bookingId={b.booking_id} onSuccess={() => markAsReviewed(b.booking_id)} />
            ) : (
              <p style={{ color: 'green' }}>✅ Review submitted</p>
            )}
          </div>
        ))
      )}
    </div>
      </>
  );
}

export default MyBookings;
