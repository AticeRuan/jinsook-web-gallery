const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ParagraphSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
})

const ContentSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    text: {
      type: [String],
      required: true,
      validate: [
        (array) => array.length > 0,
        'Content must have at least one paragraph',
      ],
    },
  },
  { timestamps: true },
)

const Content = mongoose.model('Content', ContentSchema)

module.exports = Content
