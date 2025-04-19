const Competency = require('../models/Competency');

// Retrieve all competencies and populate their associated Area
exports.getAllCompetencies = async (req, res) => {
    try {
        const competencies = await Competency.find().populate('area');
        res.status(200).json({ competencies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a single competency by its ID and populate the Area
exports.getCompetencyById = async (req, res) => {
    try {
        const competency = await Competency.findById(req.params.id).populate('area');
        if (!competency) {
            return res.status(404).json({ message: 'Competency not found' });
        }
        res.status(200).json({ competency });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new competency (expect name, description, and area id in req.body)
exports.createCompetency = async (req, res) => {
    try {
        const { name, description, area } = req.body;
        const competency = new Competency({ name, description, area });
        await competency.save();
        res.status(201).json({ message: 'Competency created successfully', competency });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing competency by its ID
exports.updateCompetency = async (req, res) => {
    try {
        const updatedCompetency = await Competency.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('area');
        if (!updatedCompetency) {
            return res.status(404).json({ message: 'Competency not found' });
        }
        res.status(200).json({ message: 'Competency updated successfully', competency: updatedCompetency });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a competency by its ID
exports.deleteCompetency = async (req, res) => {
    try {
        const deletedCompetency = await Competency.findByIdAndDelete(req.params.id);
        if (!deletedCompetency) {
            return res.status(404).json({ message: 'Competency not found' });
        }
        res.status(200).json({ message: 'Competency deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
