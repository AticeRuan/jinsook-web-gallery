const express = require('express')

const {
  loginUser,
  changePassword,
  signupUser,
} = require('../controllers/userController')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.patch('/change-password', requireAuth, changePassword)

module.exports = router
