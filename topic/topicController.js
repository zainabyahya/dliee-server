const Topic = require('../models/Topic');

// Get all topics
exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('resource');
        res.status(200).json({ topics });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single topic by id
exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).populate('resource');
        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.status(200).json({ topic });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new topic (requires a valid resource id)
exports.createTopic = async (req, res) => {
    try {
        const topic = new Topic(req.body);
        await topic.save();
        res.status(201).json({ message: 'Topic created successfully', topic });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing topic
exports.updateTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.status(200).json({ message: 'Topic updated successfully', topic });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a topic
exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id);
        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
