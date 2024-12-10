const express = require('express');
const router = express.Router();

// Example route
router.get('/example', (req, res) => {
  res.json({ message: 'Example API endpoint' });
});

// Users routes
router.get('/users', (req, res) => {
  res.json({ users: [] });
});

router.post('/users', (req, res) => {
  const { name, email } = req.body;
  // Add user logic here
  res.status(201).json({ message: 'User created' });
});

module.exports = router;