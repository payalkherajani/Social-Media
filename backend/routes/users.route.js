const express = require('express')
const { registerUser, loginUser, updateUserAvatarandBio, getLoggedInUserInfo, toggleFollowing, getAllUsers } = require('../controllers/users.controller')
const router = express.Router()
const auth = require('../middlewares/auth')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/:id', auth, updateUserAvatarandBio)
router.get('/', auth, getLoggedInUserInfo)
router.post('/following', auth, toggleFollowing)
router.get('/all', auth, getAllUsers)
module.exports = router