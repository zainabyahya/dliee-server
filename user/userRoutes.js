const express = require('express');
const router = express.Router();
const userController = require('./userController');
const requireAuth = require('../middleware/auth')

router.get('/:id', userController.getUserById);
router.put('/me', requireAuth, userController.updateUser);

module.exports = router;
