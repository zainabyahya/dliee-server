const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/me', userController.deleteMyAccount);

module.exports = router;
