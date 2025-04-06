const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Add a property (host only)
router.post('/', authenticateToken, authorizeRole("host"), (req, res) => {
  console.log(">> Add Property Body:", req.body);
  console.log(">> Authenticated User:", req.user);

  const { title, location, description, price } = req.body;
  const user_id = req.user.user_id;

  const sql = 'INSERT INTO property (user_id, title, location, description, price) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user_id, title, location, description, price], (err, result) => {
    if (err) {
      console.error(">> DB Error:", err);
      return res.status(500).send(err);
    }
    res.send({ message: 'Property added', property_id: result.insertId });
  });
});



// Get all properties for the currently logged-in host
router.get('/dashboard', authenticateToken, (req, res) => {
  const userId = req.user.user_id; // ✅ Corrected from req.user.id

  const sql = 'SELECT * FROM properties WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
});

// Update a property (host only)
router.put('/:id', authenticateToken, authorizeRole("host"), (req, res) => {
  const property_id = req.params.id;
  const user_id = req.user.user_id;
  const { title, location, description, price } = req.body;

  const sql = `
    UPDATE property 
    SET title = ?, location = ?, description = ?, price = ?
    WHERE property_id = ? AND user_id = ?
  `;
  db.query(sql, [title, location, description, price, property_id, user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Property not found or not owned by user' });
    res.send({ message: 'Property updated' });
  });
});

// Delete a property (host only)
router.delete('/:id', authenticateToken, authorizeRole("host"), (req, res) => {
  const property_id = req.params.id;
  const user_id = req.user.user_id;

  const sql = 'DELETE FROM property WHERE property_id = ? AND user_id = ?';
  db.query(sql, [property_id, user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Property not found or not owned by user' });
    res.send({ message: 'Property deleted' });
  });
});

// Get properties added by the logged-in host
router.get('/my-properties', authenticateToken, authorizeRole("host"), (req, res) => {
  const user_id = req.user.user_id;
  db.query('SELECT * FROM property WHERE user_id = ?', [user_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});


// List all properties
router.get('/', (req, res) => {
  db.query('SELECT * FROM property', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

module.exports = router;
