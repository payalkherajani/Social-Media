const Post = require('../models/posts.model')
const _ = require('lodash')

const addANewPost = async (req, res) => {
    try {
        const userId = req.user
        const { description, image_of_post } = req.body
        if (!description) {
            return res.status(400).json({ success: false, message: 'Missing Required Fields' })
        }
        const post = new Post({
            user: userId,
            description,
            image_of_post,
            likes: [],
            comments: []
        })
        await post.save()
        res.status(200).json({ success: true, post })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


const getPostByID = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await Post.findOne({ _id: postId })
        res.status(200).json({ success: true, post })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const updatePostDetails = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await Post.findOne({ _id: postId })
        const { description } = req.body
        const updatedPost = { ...post._doc, description }
        const updated = _.extend(post, updatedPost)
        await updated.save()
        res.status(200).json({ success: true, message: 'Post Updated', post: updated })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await Post.findOne({ _id: postId })
        await post.remove()
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const toggleLikesOnPostByID = async (req, res) => {
    try {
        const { postId } = req.params
        const userId = req.user
        const post = await Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }

        const hasUserAlreadyLikedPost = post.likes.some(({ user }) => {
            console.log(user, userId)
            return user == userId
        })

        if (hasUserAlreadyLikedPost) {
            //remove like
            const filteredLikes = post.likes.filter(({ user }) => user != userId)
            const updatedLikes = { ...post._doc, likes: filteredLikes }
            const updatedPost = _.extend(post, updatedLikes)
            await updatedPost.save()
            return res.status(200).json({ success: true, post: updatedPost })
        }
        else {
            //add like
            const addedLikes = [...post.likes, { user: userId }]
            const updatedLikes = { ...post._doc, likes: addedLikes }
            const updatedPost = _.extend(post, updatedLikes)
            await updatedPost.save()
            return res.status(200).json({ success: true, post: updatedPost })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


const addCommentOnPostByID = async (req, res) => {
    try {
        const { postId } = req.params
        const userId = req.user
        const post = await Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }
        const { text } = req.body
        console.log(post)
        const addComment = [...post._doc.comments, { user: userId, text }]
        console.log(addComment)
        const updatedComment = { ...post._doc, comments: addComment }
        const updatedPost = _.extend(post, updatedComment)
        await updatedPost.save()
        return res.status(200).json({ success: true, post: updatedPost })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const removeCommentOnPost = async (req, res) => {
    try {
        const { commentId, postId } = req.params
        const userId = req.user
        const post = await Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }

        const isUserAuthorizedToRemoveComment = post.comments.some(({ user }) => user == userId || user == post.user)
        if (isUserAuthorizedToRemoveComment) {
            const filterComment = post.comments.filter(({ _id }) => _id != commentId)
            const updatedPost = { ...post._doc, comments: filterComment }
            const updated = _.extend(post, updatedPost)
            await updated.save()
            return res.status(200).json({ success: true, post: updated })
        }
        else {
            return res.status(400).json({ success: false, message: 'You are Unauthrozied to remove comment' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })

    }
}
module.exports = { addANewPost, getPostByID, deletePost, toggleLikesOnPostByID, addCommentOnPostByID, removeCommentOnPost, updatePostDetails }