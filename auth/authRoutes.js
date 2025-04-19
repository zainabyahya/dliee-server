const express = require('express');
const router = express.Router();
const authController = require('./authController');

// POST route for user signup
router.post('/signup', authController.signup);

// POST route for user login
router.post('/login', authController.login);

module.exports = router;
