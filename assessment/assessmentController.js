const AssessmentResult = require('../models/AssessmentResult');

// Submit an assessment (store user responses)
exports.submitAssessment = async (req, res) => {
    try {
        // The request body should include: user, questionnaire, and an array of responses (each with questionId and selectedOption)
        const assessment = new AssessmentResult(req.body);

        // Optionally, calculate the total score based on responses
        assessment.totalScore = req.body.responses.reduce((sum, resp) => {
            return sum + (resp.selectedOption.score || 0);
        }, 0);

        // Determine the user's level based on the scoring rules
        if (assessment.totalScore < 20) assessment.level = 'A1';
        else if (assessment.totalScore < 34) assessment.level = 'A2';
        else if (assessment.totalScore < 50) assessment.level = 'B1';
        else if (assessment.totalScore < 66) assessment.level = 'B2';
        else if (assessment.totalScore < 81) assessment.level = 'C1';
        else assessment.level = 'C2';

        await assessment.save();
        res.status(201).json({ message: 'Assessment submitted successfully', assessment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve assessment result for a given user
exports.getAssessmentByUser = async (req, res) => {
    try {
        const assessment = await AssessmentResult.findOne({ user: req.params.userId }).populate('questionnaire');
        if (!assessment)
            return res.status(404).json({ message: 'Assessment not found for the user' });
        res.status(200).json({ assessment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
