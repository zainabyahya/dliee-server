// libraryPost/libraryPostRoutes.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const {
    createLibraryPost,
    getLibraryPosts,
    getLibraryPostById,
    updateLibraryPost,
    deleteLibraryPost
} = require('./libraryPostController');

// Protect all library-post routes
router.use(requireAuth);

router.get('/', getLibraryPosts);
router.post('/', createLibraryPost);
router.get('/:id', getLibraryPostById);
router.put('/:id', updateLibraryPost);
router.delete('/:id', deleteLibraryPost);

module.exports = router;
