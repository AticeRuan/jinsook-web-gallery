const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.statics.login = async function (username, password) {
  //validation
  if (!username || !password) {
    throw Error('All fields nedd to be filled in')
  }
  const user = await this.findOne({ username })
  if (!user) {
    throw Error('Invalid username')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect Password')
  }

  return user
}

//change password
UserSchema.statics.changePassword = async function (
  currentPassword,
  newPassword,
  confirmPassword,
  username,
) {
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error('All fields need to be filled in')
  }

  const user = await this.findOne({ username })
  if (!user) {
    throw new Error('User not found')
  }

  const match = await bcrypt.compare(currentPassword, user.password)
  if (!match) {
    throw new Error('Incorrect current password')
  }

  if (newPassword !== confirmPassword) {
    throw new Error('New password and confirm password do not match')
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error('Password is not strong enough')
  }

  const hashPassword = await bcrypt.hash(newPassword, 10)

  user.password = hashPassword
  await user.save()

  return user
}

// static signup method (used to intialize the user account, may not need it again)
UserSchema.statics.signup = async function (username, password) {
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await this.create({ username, password: hashedPassword })

  return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User
