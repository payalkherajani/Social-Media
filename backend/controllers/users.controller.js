const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const _ = require('lodash')

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

        const user = new User({
            name,
            email,
            password,
            followers: [],
            following: []
        })

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
            const isPasswordMatch = bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                const token = generateToken(user._id)  // need to make this function
                return res.status(200).json({ success: false, message: 'Login Successfull', token })
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
        const updatedDetails = { ...user._doc, avatar, bio }
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
        return res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};


const toggleFollowing = async (req, res) => {
    try {

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}


export { registerUser, loginUser, getLoggedInUserInfo, updateUserAvatarandBio }