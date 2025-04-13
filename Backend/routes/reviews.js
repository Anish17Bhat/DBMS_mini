const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Submit a review
router.post('/', authenticateToken, (req, res) => {
  const { booking_id, rating, comment, date } = req.body;

  const checkSql = 'SELECT * FROM booking_review WHERE booking_id = ?';
  db.query(checkSql, [booking_id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) return res.status(400).json({ message: 'Review already exists for this booking' });

    db.query('INSERT INTO review (rating, comment) VALUES (?, ?)', [rating, comment], (err, result) => {
      if (err) return res.status(500).send(err);
      const review_id = result.insertId;

      db.query('INSERT INTO booking_review (booking_id, review_id, date) VALUES (?, ?, ?)', [booking_id, review_id, date], (err2) => {
        if (err2) return res.status(500).send(err2);
        res.send({ message: 'Review submitted' });
      });
    });
  });
});


// List reviews
router.get('/', (req, res) => {
  const sql = `
    SELECT br.booking_id, r.rating, r.comment, br.date
    FROM booking_review br
    JOIN review r ON br.review_id = r.review_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

module.exports = router;

// GET /reviews/property/:propertyId
router.get('/property/:propertyId', (req, res) => {
  const propertyId = req.params.propertyId;
  const sql = `
    SELECT r.*, u.name AS user_name
    FROM review r
    JOIN booking_review br ON r.review_id = br.review_id
    JOIN booking b ON br.booking_id = b.booking_id
    JOIN users u ON b.user_id = u.user_id
    WHERE b.property_id = ?
  `;

  db.query(sql, [propertyId], (err, results) => {
    if (err) return res.status(500).send({ message: 'Error fetching reviews', error: err });
    res.send(results);
  });
});

