const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const {
    createProfile,
    getMyProfile,
    updateProfile,
    deleteProfile
} = require('./profileController');

router.post('/', requireAuth, createProfile);
router.get('/me', requireAuth, getMyProfile);
router.put('/:userId', requireAuth, updateProfile);
router.delete('/:userId', requireAuth, deleteProfile);

module.exports = router;
