const AssessmentQuestionnaire = require('../models/AssessmentQuestionnaire');

// Retrieve all questionnaires
exports.getAllQuestionnaires = async (req, res) => {
    try {
        const questionnaires = await AssessmentQuestionnaire.find();
        res.status(200).json({ questionnaires });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new questionnaire
exports.createQuestionnaire = async (req, res) => {
    try {
        const questionnaire = new AssessmentQuestionnaire(req.body);
        await questionnaire.save();
        res.status(201).json({ message: 'Questionnaire created successfully', questionnaire });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a questionnaire by id
exports.updateQuestionnaire = async (req, res) => {
    try {
        const updated = await AssessmentQuestionnaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ message: 'Questionnaire not found' });
        res.status(200).json({ message: 'Questionnaire updated successfully', updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a questionnaire by id
exports.deleteQuestionnaire = async (req, res) => {
    try {
        const deleted = await AssessmentQuestionnaire.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: 'Questionnaire not found' });
        res.status(200).json({ message: 'Questionnaire deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
