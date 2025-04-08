const Skill = require('../models/Skill');

// Get all skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().populate('area');
        res.status(200).json({ skills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single skill by id
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id).populate('area');
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.status(200).json({ skill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new skill (requires an existing area id in the body)
exports.createSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json({ message: 'Skill created successfully', skill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing skill
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.status(200).json({ message: 'Skill updated successfully', skill });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
