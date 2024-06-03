const express = require('express')

const {
  loginUser,
  changePassword,
  signupUser,
} = require('../controllers/userController')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.post('/login', loginUser)

//for use in testing only
// router.post('/signup', signupUser)

router.patch('/change-password', requireAuth, changePassword)

module.exports = router
