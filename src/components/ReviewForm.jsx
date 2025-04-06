import { useState } from 'react';
import api from '../api';

function ReviewForm() {
  const [form, setForm] = useState({
    booking_id: '',
    rating: '',
    comment: '',
    date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', form);
      alert('Review submitted!');
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Review</h2>
      <input type="text" name="booking_id" placeholder="Booking ID" required onChange={handleChange} />
      <input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" required onChange={handleChange} />
      <textarea name="comment" placeholder="Your review" required onChange={handleChange}></textarea>
      <input type="date" name="date" required onChange={handleChange} />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
