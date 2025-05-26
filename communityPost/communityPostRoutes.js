const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/auth')
const {
    createCommunityPost,
    getCommunityPosts,
    getCommunityPost,
    updateCommunityPost,
    deleteCommunityPost,
    addComment,
    deleteComment
} = require('./communityPostController')

// public
router.get('/', getCommunityPosts)
router.get('/:id', getCommunityPost)

// protected
router.post('/', requireAuth, createCommunityPost)
router.put('/:id', requireAuth, updateCommunityPost)
router.delete('/:id', requireAuth, deleteCommunityPost)

// comments
router.post('/:id/comments', requireAuth, addComment)
router.delete('/:id/comments/:commentId', requireAuth, deleteComment); // ✅ must include requireAuth

module.exports = router
