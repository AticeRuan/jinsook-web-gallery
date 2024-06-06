const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema(
  {
    email: { type: String, required: true },

    name: { type: String, required: true },
    msg: { type: String, required: true },
    unread: { type: Boolean, default: true },
  },
  { timestamps: true },
)

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
