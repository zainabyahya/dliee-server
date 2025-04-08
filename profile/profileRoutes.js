const express = require('express');
const router = express.Router();
const profileController = require('./profileController');

router.post('/', profileController.createProfile);
router.get('/:userId', profileController.getProfileByUser);
router.put('/:userId', profileController.updateProfile);
router.delete('/:userId', profileController.deleteProfile);

module.exports = router;
