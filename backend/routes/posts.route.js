const express = require('express')
const router = express.Router()
const { addANewPost, getPostByID, updatePostDetails, deletePost, toggleLikesOnPostByID, addCommentOnPostByID, removeCommentOnPost } = require('../controllers/posts.controller')

router.post('/', addANewPost)
router.get('/:postId', getPostByID)
router.put('/:postId', updatePostDetails)
router.delete('/:id', deletePost)
router.post('/likes/:postId', toggleLikesOnPostByID)
router.post('/addcomment/:postId', addCommentOnPostByID)
router.delete('/removecomment/:commentId/:postId', removeCommentOnPost)

module.exports = router