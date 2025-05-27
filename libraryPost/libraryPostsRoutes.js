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

router.use(requireAuth);

// Admin-only check
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    next();
};

// Public for all authenticated users
router.get('/', getLibraryPosts);
router.get('/:id', getLibraryPostById);

// Admin-only for modifications
router.post('/', requireAdmin, createLibraryPost);
router.put('/:id', requireAdmin, updateLibraryPost);
router.delete('/:id', requireAdmin, deleteLibraryPost);

module.exports = router;
