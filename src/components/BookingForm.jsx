import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';
import './Styles/BookingForm.css'

function BookingForm() {
  const { propertyId } = useParams();
  const [form, setForm] = useState({
    check_in_date: '',
    check_out_date: '',
    total_amt: ''
  });

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const todayDate = new Date().toISOString().split('T')[0];

  const nextDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${propertyId}`);
        setProperty(res.data);
      } catch (err) {
        alert("Failed to load property details");
      }
    };
    fetchProperty();
  }, [propertyId]);

  // Calculate total amount when dates change
  useEffect(() => {
    if (form.check_in_date && form.check_out_date && property) {
      const checkIn = new Date(form.check_in_date);
      const checkOut = new Date(form.check_out_date);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const total = nights > 0 ? (nights * property.price).toFixed(2) : '';
      setForm((prev) => ({ ...prev, total_amt: total }));
    }
  }, [form.check_in_date, form.check_out_date, property]);

  // Fetch reviews for the property
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/property/${propertyId}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

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
    <div>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>Check-in Date:</label>
        <input
          type="date"
          name="check_in_date"
          required
          onChange={handleChange}
          min={todayDate}
        />

        <label>Check-out Date:</label>
        <input
          type="date"
          name="check_out_date"
          required
          onChange={handleChange}
          min={form.check_in_date ? nextDay(form.check_in_date) : todayDate}
        />

        <label>Total Amount (₹):</label>
        <input
          type="text"
          value={form.total_amt}
          readOnly
        />

        <button type="submit">Confirm Booking</button>
      </form>

      {reviews.length > 0 && (
        <div className="reviews-section">
          <h3>Reviews for this Property</h3>
          {reviews.map((r, i) => (
            <div key={i} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }} className="review-card">
              <p><strong>User:</strong> {r.user_name}</p>
              <p><strong>Rating:</strong> {r.rating} ⭐</p>
              <p><strong>Comment:</strong> {r.comment}</p>
              <p><em>Date:</em> {new Date(r.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingForm;
