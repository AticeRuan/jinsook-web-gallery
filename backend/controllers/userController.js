const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1h' })
}

//login user

const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.login(username, password)
    const token = createToken(user._id)

    res.status(200).json({ username, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//change password

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword, username } = req.body
  try {
    const user = await User.changePassword(
      currentPassword,
      newPassword,
      confirmPassword,
      username,
    )
    const token = createToken(user._id)
    res.status(200).json({ username: user.username, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//signup user

const signupUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.signup(username, password)
    const token = createToken(user._id)

    res.status(200).json({ username, token })
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}

module.exports = { loginUser, changePassword, signupUser }
