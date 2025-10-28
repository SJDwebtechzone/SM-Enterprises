const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

router.get('/dashboard', authenticateUser, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;