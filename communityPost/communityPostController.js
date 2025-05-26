const CommunityPost = require('../models/CommunityPost')
const mongoose = require('mongoose')

// Create a new community post (either “post” or “question”)
exports.createCommunityPost = async (req, res) => {
    try {
        const { title, html, type } = req.body;

        if (!title || !html || !type) {
            return res.status(400).json({ message: 'Title, html, and type are required.' });
        }

        const post = new CommunityPost({
            title,
            html,
            type,
            author: req.user._id,
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


exports.getCommunityPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find().sort('-createdAt').populate('author', 'firstName lastName')
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getCommunityPost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id).populate('author', 'firstName lastName').populate('comments.author', 'firstName lastName');
        if (!post) return res.status(404).json({ message: 'Not found' })
        res.json(post)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateCommunityPost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id)
        if (!post) return res.status(404).json({ message: 'Not found' })
        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'Not allowed' })
        }
        if (req.body.title) post.title = req.body.title
        if (req.body.markdown) {
            post.section.markdown = req.body.markdown
            post.section.html = CommunityPost.compile(req.body.markdown)
        }
        await post.save()
        res.json(post)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteCommunityPost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id)
        if (!post) return res.status(404).json({ message: 'Not found' })
        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'Not allowed' })
        }
        await post.deleteOne();
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// comments on a community post
exports.addComment = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id)
        if (!post) return res.status(404).json({ message: 'Not found' })
        post.comments.push({
            author: req.user._id,
            text: req.body.text
        })
        await post.save()
        res.status(201).json(post)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.deleteComment = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });

        const comment = post.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (!comment.author.equals(req.user._id) && !post.author.equals(req.user._id)) {
            return res.status(403).json({ message: 'Not allowed' });
        }


        post.comments.pull(comment._id);
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
