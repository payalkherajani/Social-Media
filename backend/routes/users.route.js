const express = require('express')
const { registerUser, loginUser, updateUserAvatarandBio, getLoggedInUserInfo, toggleFollowing, getSuggestions, getLoggedInUserFeed } = require('../controllers/users.controller')
const router = express.Router()
const auth = require('../middlewares/auth')
// const upload = require('../utils/multer')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/', auth, updateUserAvatarandBio)
router.get('/', auth, getLoggedInUserInfo)
router.post('/following', auth, toggleFollowing)
router.get('/suggestions', auth, getSuggestions)
router.get('/feed', auth, getLoggedInUserFeed)
module.exports = router