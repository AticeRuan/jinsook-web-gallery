const mongoose = require('mongoose')
const Message = require('../models/messageModel')
const validator = require('validator')

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Get one message
const getOneMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    res.status(200).json(message)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Create a new artwork
const createMessage = async (req, res) => {
  const { name, email, msg, unread } = req.body
  let emptyFields = []
  //input validation
  if (!name) {
    emptyFields.push('name')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!msg) {
    emptyFields.push('message')
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ err: 'Please fill in all the fields.', emptyFields })
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ err: 'Please enter a valid email address.' })
  }

  try {
    const message = await Message.create({
      name,
      email,
      msg,
      unread,
    })
    res.status(200).json(message)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

//delete a message
const deleteMessage = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'Message not found' })
  }

  const message = await Message.findOneAndDelete({ _id: id })

  if (!artwork) return res.status(404).json({ err: 'Message not found' })

  res.status(200).json(message)
}

module.exports = {
  getMessages,
  getOneMessage,
  createMessage,
  deleteMessage,
}
