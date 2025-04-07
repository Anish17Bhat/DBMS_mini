const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Create a booking (guest only)
router.post('/', authenticateToken, authorizeRole("guest"), (req, res) => {
  const { property_id, check_in_date, check_out_date, total_amt } = req.body;
  const user_id = req.user.user_id;

  const sql = 'INSERT INTO booking (user_id, property_id, check_in_date, check_out_date, total_amt) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user_id, property_id, check_in_date, check_out_date, total_amt], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Booking created', booking_id: result.insertId });
  });
});

// List bookings for logged in user
router.get('/', authenticateToken, (req, res) => {
  const user_id = req.user.user_id;
  db.query('SELECT * FROM booking WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Cancel a booking (guest only, must own the booking)
router.delete('/:id', authenticateToken, authorizeRole("guest"), (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.user_id;

  // First, check if the booking belongs to this user
  const checkSql = 'SELECT * FROM booking WHERE booking_id = ? AND user_id = ?';
  db.query(checkSql, [bookingId, userId], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(403).send({ message: "You are not authorized to cancel this booking" });
    }

    // Delete the booking
    const deleteSql = 'DELETE FROM booking WHERE booking_id = ?';
    db.query(deleteSql, [bookingId], (err, result) => {
      if (err) return res.status(500).send(err);

      res.send({ message: 'Booking cancelled successfully' });
    });
  });
});



module.exports = router;