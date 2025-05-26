// routes/assessmentRoutes.js
const express = require('express');
const router = express.Router();
const { submitAssessment, getAssessmentByUser } = require('./assessmentController');
const requireAuth = require('../middleware/auth');

router.post('/submit', requireAuth, submitAssessment);
router.get('/user/:userId', requireAuth, getAssessmentByUser);

module.exports = router;
