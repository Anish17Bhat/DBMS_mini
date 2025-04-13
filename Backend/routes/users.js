const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

//Register
router.post('/register', async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).send({ message: 'Error registering user', error: err });
    res.send({ message: 'User registered successfully', user_id: result.insertId });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(401).send({ message: 'Invalid email' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Invalid password' });

    const token = jwt.sign(
      { user_id: user.user_id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.send({ message: 'Login successful', token });
  });
});

//Get Current User
router.get('/me', authenticateToken, (req, res) => {
  const userId = req.user.user_id;

  const sql = 'SELECT user_id, name, email, phone, role FROM users WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send({ message: 'Database error', error: err });
    console.log("Logged-in user_id:", userId);
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });

    res.send(results[0]);
  });
});

// Public: List all users
router.get('/', (req, res) => {
  db.query('SELECT id, name, email, phone, role FROM users', (err, results) => {
    if (err) return res.status(500).send({ message: 'Database error', error: err });
    res.send(results);
  });
});

module.exports = router;
