const express = require('express');
const router = express.Router();
const assessmentController = require('./assessmentController');

router.post('/', assessmentController.submitAssessment);
router.get('/:userId', assessmentController.getAssessmentByUser);

module.exports = router;
