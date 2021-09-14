const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const generateToken = require('../utils/token')
const cloudinary = require('../utils/cloudinary')
const Post = require('../models/posts.model')


const uploadImageToCloudinary = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        return res.status(200).json({ success: true, result })
    } catch (err) {
        console.log(err)
        res.send('server error')
    }

}

const registerUser = async (req, res) => {
    try {

        let { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' })
        }
        const isUserExists = await User.findOne({ email })

        if (isUserExists) {
            return res.status(400).json({ success: false, message: 'Email already use' })
        }

        password = bcrypt.hashSync(password, 10)
        // const result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result)

        const user = new User({
            name,
            email,
            password,
            followers: [],
            following: [],
        })

        await user.save()
        res.status(200).json({ success: true, user, message: 'Registration Successfull' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            const isPasswordMatch = await bcrypt.compare(password, userExists.password)

            if (isPasswordMatch) {
                const token = generateToken(userExists._id)

                const loggedInUserDetails = { 'id': userExists._id, 'name': userExists.name, 'email': userExists.email, 'following': userExists.following, 'followers': userExists.followers, 'bio': userExists.bio }

                return res.status(200).json({ success: true, message: 'Login Successfull', token, loggedInUserDetails })
            } else {
                return res.status(400).json({ success: false, message: 'Invalid Credentials' })
            }
        }
        return res.status(400).json({ success: false, message: 'Invalid Credentials' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const updateUserAvatarandBio = async (req, res) => {
    try {
        const { avatar, bio } = req.body
        const userId = req.user
        const user = await User.findOne({ _id: userId })
        let updatedDetails
        if (avatar && bio) {
            updatedDetails = { ...user._doc, avatar, bio }
        }
        else if (avatar && bio === undefined) {
            updatedDetails = { ...user._doc, avatar }
        }
        else {
            updatedDetails = { ...user._doc, bio }
        }
        const updatedUserInformation = _.extend(user, updatedDetails)
        await updatedUserInformation.save()
        res.json({ success: true, message: 'Updated Profile of user', updatedUserInformation })
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

const getLoggedInUserInfo = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ success: false, message: 'No User Found' });
        }
        const loggedInUserDetails = { 'id': user._id, 'name': user.name, 'email': user.email, 'following': user.following, 'followers': user.followers, 'bio': user.bio }
        return res.status(200).json({ success: true, loggedInUserDetails });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};


const toggleFollowing = async (req, res) => {
    try {
        const userId = req.user  // this person is trying to follow or unfollow someone :)
        const { followingpersonId } = req.body  // this person is either followed or unfollowed
        const userWhoisTryingToFollowOrUnfollow = await User.findOne({ _id: userId })
        const userWhoisGettingFollowedOrUnfollowed = await User.findOne({ _id: followingpersonId })
        const isUserAlreadyFollowed = userWhoisTryingToFollowOrUnfollow.following.some(({ user }) => user == followingpersonId)
        if (isUserAlreadyFollowed) {
            //unfollow person
            const removedUserFromFollowing = userWhoisTryingToFollowOrUnfollow.following.filter(({ user }) => user != followingpersonId)
            const updatedDocFollowing = {
                ...userWhoisTryingToFollowOrUnfollow._doc,
                following: removedUserFromFollowing
            }
            const updated = _.extend(userWhoisTryingToFollowOrUnfollow, updatedDocFollowing)
            await updated.save();
            const removedUserFromFollowersofFollowingPerson = userWhoisGettingFollowedOrUnfollowed.followers.filter(({ user }) => user != userId)
            const updatedDocFollowers = {
                ...userWhoisGettingFollowedOrUnfollowed,
                followers: removedUserFromFollowersofFollowingPerson
            }
            const removedFollowers = _.extend(userWhoisGettingFollowedOrUnfollowed, updatedDocFollowers)
            await removedFollowers.save()
            return res.status(200).json({ success: true, messaged: 'updated' })
        }
        //follow person
        const addUserIntoFollowing = [...userWhoisTryingToFollowOrUnfollow.following, { user: userWhoisGettingFollowedOrUnfollowed._id }]
        const updatedDocFollowing = {
            ...userWhoisTryingToFollowOrUnfollow._doc,
            following: addUserIntoFollowing
        }
        const updatedFollowing = _.extend(userWhoisTryingToFollowOrUnfollow, updatedDocFollowing)
        await updatedFollowing.save();
        const addUserToFollowers = [...userWhoisGettingFollowedOrUnfollowed.followers, { user: userWhoisTryingToFollowOrUnfollow._id }]
        const updatedDocFollowers = {
            ...userWhoisGettingFollowedOrUnfollowed,
            followers: addUserToFollowers
        }
        const updatedFollowers = _.extend(userWhoisGettingFollowedOrUnfollowed, updatedDocFollowers)
        await updatedFollowers.save();

        res.status(200).json({ success: true, messaged: 'updated' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}


const getSuggestions = async (req, res) => {
    try {
        const userId = req.user
        const allUsers = await User.find({})
        const loggedInUser = await User.findOne({ _id: userId })
        const filterUsers = allUsers.filter(({ _id }) => _id != userId &&
            !loggedInUser.following.some(({ user }) => user != _id))  //need to test this logic more
        return res.status(200).json({ success: true, users: filterUsers })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}


const getLoggedInUserFeed = async (req, res) => {
    try {
        const userId = req.user
        const followingUserIDS = await User.findOne({ _id: userId })

        if (followingUserIDS.following.length > 0) {
            const posts = await Promise.all(followingUserIDS.following.map(async ({ user }) => {
                const postOfUser = await Post.find({ user: user }).sort({ 'updatedAt': -1 })
                return postOfUser
            }))
            return res.status(200).json({ success: true, posts })
        }

        res.status(200).json({ success: true, posts: [] })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}

module.exports = { registerUser, loginUser, getLoggedInUserInfo, updateUserAvatarandBio, toggleFollowing, getSuggestions, uploadImageToCloudinary, getLoggedInUserFeed }