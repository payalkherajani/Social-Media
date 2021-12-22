const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 150,
        required: true
    },
    image_of_post: {
        type: String,
        default: null
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            name: {
                type: String
            }
        }
    ]

}, {
    timestamps: true
})


const Post = mongoose.model('Posts', postSchema)

module.exports = Post