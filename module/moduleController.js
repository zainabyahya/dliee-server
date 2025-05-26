const Module = require('../models/Module');

// GET /api/modules
exports.getAllModules = async (req, res) => {
    try {
        // populate the competencies array
        const modules = await Module.find().populate('competencies');
        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/modules/:id
exports.getModuleById = async (req, res) => {
    try {
        const module = await Module
            .findById(req.params.id)
            .populate('competencies');
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.status(200).json({ module });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /api/modules
exports.createModule = async (req, res) => {
    try {
        const module = new Module(req.body);
        await module.save();
        res
            .status(201)
            .json({ message: 'Module created successfully', module });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /api/modules/:id
exports.updateModule = async (req, res) => {
    try {
        const module = await Module.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res
            .status(200)
            .json({ message: 'Module updated successfully', module });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /api/modules/:id
exports.deleteModule = async (req, res) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.status(200).json({ message: 'Module deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
