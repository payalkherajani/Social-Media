const express = require('express')
const { registerUser, loginUser, updateUserAvatarandBio, getLoggedInUserInfo, toggleFollowing } = require('../controllers/users.controller')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/:id', updateUserAvatarandBio)
router.get('/:id', getLoggedInUserInfo)
router.post('/following', toggleFollowing)
module.exports = router