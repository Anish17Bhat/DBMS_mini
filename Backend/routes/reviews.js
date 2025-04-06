const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Submit a review
router.post('/', authenticateToken, (req, res) => {
  const { booking_id, rating, comment, date } = req.body;

  db.query('INSERT INTO review (rating, comment) VALUES (?, ?)', [rating, comment], (err, result) => {
    if (err) return res.status(500).send(err);
    const review_id = result.insertId;

    db.query('INSERT INTO booking_review (booking_id, review_id, date) VALUES (?, ?, ?)', [booking_id, review_id, date], (err2) => {
      if (err2) return res.status(500).send(err2);
      res.send({ message: 'Review submitted' });
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