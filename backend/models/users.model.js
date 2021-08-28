const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    followers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            }
        }
    ],
    following: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'Users'
            }
        }
    ],
    bio: {
        type: String
    }

},
    {
        timestamps: true
    }
)

const User = mongoose.model('Users', userSchema)
module.exports = User