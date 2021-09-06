const Post = require('../models/posts.model')

const addANewPost = async (req, res) => {
    try {

        const userId = req.user
        const { description, image_of_post } = req.body
        const post = new Post({
            user: userId,
            description,
            image_of_post,
            likes: [],
            comments: []
        })
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
        const post = Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }
        const hasUserAlreadyLikedPost = post.likes.some(({ user }) => user == userId)
        if (hasUserAlreadyLikedPost) {
            const filteredLikes = post.likes.filter(({ user }) => user === userId)
            const updatedLikes = { ...post._doc, likes: filteredLikes }
            const updatedPost = _.extend(post, updatedLikes)
            return res.status(200).json({ success: true, post: updatedPost })
        }
        else {
            const addedLikes = [...post.likes, { user: userId }]
            const updatedLikes = { ...post._doc, likes: addedLikes }
            const updatedPost = _.extend(post, updatedLikes)
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
        const post = Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }
        const { text } = req.body
        const addComment = [...post.comment, { user: userId, text }]
        const updatedComment = { ...post._doc, likes: addComment }
        const updatedPost = _.extend(post, updatedComment)
        return res.status(200).json({ success: true, post: updatedPost })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const removeCommentOnPost = async (req, res) => {
    try {
        const { commentId } = req.params
        const userId = req.user
        const post = Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ success: false, message: 'No Post Found' })
        }

        const isUserAuthorizedToRemoveComment = post.comments.some(({ user }) => user == userId)
        if (isUserAuthorizedToRemoveComment) {
            const filterComment = post.comments.filter(({ _id }) => _id !== commentId)
            const updatedPost = { ...post._doc, comments: filterComment }
            const updated = _.extend(post, updatedPost)
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
export { addANewPost, getPostByID, deletePost, toggleLikesOnPostByID, addCommentOnPostByID, removeCommentOnPost, updatePostDetails }