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

module.exports = router;