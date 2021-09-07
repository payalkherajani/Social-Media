const express = require('express')
const { registerUser, loginUser, updateUserAvatarandBio, getLoggedInUserInfo, toggleFollowing } = require('../controllers/users.controller')
const router = express.Router()
const auth = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/:id', updateUserAvatarandBio)
router.get('/', auth, getLoggedInUserInfo)
router.post('/following', toggleFollowing)
module.exports = router