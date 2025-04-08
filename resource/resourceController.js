const Resource = require('../models/Resource');

// Get all resources
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find().populate('skill');
        res.status(200).json({ resources });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single resource by id
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id).populate('skill');
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ resource });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new resource (requires a valid skill id)
exports.createResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json({ message: 'Resource created successfully', resource });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing resource
exports.updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ message: 'Resource updated successfully', resource });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
