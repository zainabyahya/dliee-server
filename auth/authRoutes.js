const express = require('express');
const router = express.Router();
const authController = require('./authController');
const requireAuth = require('../middleware/auth')

// POST route for user signup
router.post('/signup', authController.signup);

// POST route for user login
router.post('/login', authController.login);

router.delete('/me', requireAuth, authController.deleteMyAccount);

module.exports = router;
