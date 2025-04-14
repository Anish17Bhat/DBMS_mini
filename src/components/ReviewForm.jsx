import { useState, useEffect } from 'react';
import api from '../api';
import './Styles/ReviewForm.css'

function ReviewForm({ bookingId, onSuccess }) {
  const [form, setForm] = useState({
    rating: '',
    comment: '',
    date: ''
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setForm((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', {
        booking_id: bookingId,
        ...form
      });
      alert('Review submitted!');
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>Submit Review</h4>
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        required
        onChange={handleChange}
      />
      <textarea
        name="comment"
        placeholder="Your review"
        required
        onChange={handleChange}
      ></textarea>
      <input
        type="date"
        name="date"
        value={form.date}
        readOnly 
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
