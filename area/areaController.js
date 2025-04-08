const Area = require('../models/Area');

// Get all areas
exports.getAllAreas = async (req, res) => {
    try {
        const areas = await Area.find();
        res.status(200).json({ areas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single area by id
exports.getAreaById = async (req, res) => {
    try {
        const area = await Area.findById(req.params.id);
        if (!area) return res.status(404).json({ message: 'Area not found' });
        res.status(200).json({ area });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new area
exports.createArea = async (req, res) => {
    try {
        const area = new Area(req.body);
        await area.save();
        res.status(201).json({ message: 'Area created successfully', area });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing area
exports.updateArea = async (req, res) => {
    try {
        const area = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!area) return res.status(404).json({ message: 'Area not found' });
        res.status(200).json({ message: 'Area updated successfully', area });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an area
exports.deleteArea = async (req, res) => {
    try {
        const area = await Area.findByIdAndDelete(req.params.id);
        if (!area) return res.status(404).json({ message: 'Area not found' });
        res.status(200).json({ message: 'Area deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
