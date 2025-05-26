// libraryPost/libraryPostController.js
const LibraryPost = require('../models/LibraryPost');

// Create
exports.createLibraryPost = async (req, res) => {
    try {
        const { title, sections } = req.body;
        const post = await LibraryPost.create({
            title,
            sections,
            author: req.user._id
        });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Read all
exports.getLibraryPosts = async (req, res) => {
    try {
        const posts = await LibraryPost.find().populate('author', 'firstName lastName');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read one
exports.getLibraryPostById = async (req, res) => {
    try {
        const post = await LibraryPost.findById(req.params.id).populate('author', 'firstName lastName');
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update
exports.updateLibraryPost = async (req, res) => {
    try {
        const post = await LibraryPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete
exports.deleteLibraryPost = async (req, res) => {
    try {
        const post = await LibraryPost.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
