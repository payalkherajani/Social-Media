const express = require('express')
const router = express.Router()
const { addANewPost, getPostByID, updatePostDetails, deletePost, toggleLikesOnPostByID, addCommentOnPostByID, removeCommentOnPost } = require('../controllers/posts.controller')

router.post('/', addANewPost)
router.get('/:id', getPostByID)
router.put('/:id', updatePostDetails)
router.delete('/:id', deletePost)
router.post('/likes/:id', toggleLikesOnPostByID)
router.post('/addcomment', addCommentOnPostByID)
router.delete('/removecomment/:id', removeCommentOnPost)

module.exports = router