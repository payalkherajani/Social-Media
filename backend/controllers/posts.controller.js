const Post = require('../models/posts.model')
const _ = require('lodash')
const User = require('../models/users.model')

const addANewPost = async (req, res) => {
    try {
        const userId = req.user
        const { description, image_of_post, caption } = req.body
        if (!description) {
            return res.status(400).json({ success: false, message: 'Missing Required Fields' })
        }
        const post = new Post({
            user: userId,
            description,
            image_of_post,
            caption,
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
        const post = await Post.findOne({ _id: postId }).populate('user', ['name', 'avatar'])
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
        const { description, caption } = req.body
        const updatedPost = { ...post._doc, description, caption }
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
        return res.status(200).json({ success: true, message: 'Post Removed' })
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
        const post = await Post.findOne({ _id: postId }).populate('user', ['name', 'avatar'])
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }
        const { text } = req.body
        const user = await User.findOne({ _id: userId })
        const addComment = [...post._doc.comments, { user: userId, text, name: user.name }]
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

const getAllLoggedInUserPosts = async (req, res) => {
    try {
        const userId = req.user
        const allPostsofUser = await Post.find({ user: userId }).sort({ 'updatedAt': -1 })
        return res.status(200).json({ success: true, allPostsofUser })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}
module.exports = { addANewPost, getPostByID, deletePost, toggleLikesOnPostByID, addCommentOnPostByID, removeCommentOnPost, updatePostDetails, getAllLoggedInUserPosts }