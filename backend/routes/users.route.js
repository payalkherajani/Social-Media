const express = require('express')
const { registerUser, loginUser, updateUserAvatarandBio, getLoggedInUserInfo, toggleFollowing, getAllUsers, getLoggedInUserFeed } = require('../controllers/users.controller')
const router = express.Router()
const auth = require('../middlewares/auth')
const upload = require('../utils/multer')

router.post('/register', upload.single('file'), registerUser)
router.post('/login', loginUser)
router.put('/:id', auth, updateUserAvatarandBio)
router.get('/', auth, getLoggedInUserInfo)
router.post('/following', auth, toggleFollowing)
router.get('/all', auth, getAllUsers)
router.get('/feed', auth, getLoggedInUserFeed)
module.exports = router