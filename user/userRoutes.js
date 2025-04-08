const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/register', userController.register);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
