const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const {
    createLibraryPost,
    getLibraryPosts,
    getLibraryPostById,
    updateLibraryPost,
    deleteLibraryPost,
} = require('./libraryPostController');

// Robust admin-only check
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    next();
};

// ✅ Public access (no auth required)
router.get('/', getLibraryPosts);
router.get('/:id', getLibraryPostById);

// 🔐 Admin-only (auth + role check)
router.post('/', requireAuth, requireAdmin, createLibraryPost);
router.put('/:id', requireAuth, requireAdmin, updateLibraryPost);
router.delete('/:id', requireAuth, requireAdmin, deleteLibraryPost);

module.exports = router;
