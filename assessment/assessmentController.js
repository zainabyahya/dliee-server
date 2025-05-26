// controllers/assessmentController.js

const AssessmentResult = require('../models/AssessmentResult');
const Profile = require('../models/Profile');

/**
 * POST /assessment/submit
 * {
 *   user: ObjectId,              // the logged-in user
 *   questionnaire: ObjectId,
 *   responses: [
 *     { questionId: ObjectId, selectedOption: { score: Number, … } },
 *     …
 *   ]
 * }
 */
exports.submitAssessment = async (req, res) => {
    try {
        const { user, questionnaire, responses } = req.body;

        // 1) create and score the assessment
        const assessment = new AssessmentResult({ user, questionnaire, responses });
        assessment.totalScore = responses.reduce((sum, { selectedOption }) => {
            return sum + (selectedOption.score || 0);
        }, 0);

        // 2) pick the DigCompEdu level
        const s = assessment.totalScore;
        if (s < 20) assessment.level = 'A1';
        else if (s < 34) assessment.level = 'A2';
        else if (s < 50) assessment.level = 'B1';
        else if (s < 66) assessment.level = 'B2';
        else if (s < 81) assessment.level = 'C1';
        else assessment.level = 'C2';

        await assessment.save();

        // 3) now upsert the user's profile with the new score & level
        const profile = await Profile.findOneAndUpdate(
            { user },
            {
                assessmentScore: assessment.totalScore,
                currentLevel: assessment.level
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res
            .status(201)
            .json({
                message: 'Assessment submitted successfully',
                assessment,
                profile     // optionally return updated profile too 
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * GET /assessment/user/:userId
 */
exports.getAssessmentByUser = async (req, res) => {
    try {
        const assessment = await AssessmentResult
            .findOne({ user: req.params.userId })
            .populate('questionnaire');
        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found for this user' });
        }
        return res.status(200).json({ assessment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};
