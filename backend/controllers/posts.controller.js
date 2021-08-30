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
export { addANewPost, getPostByID, deletePost }