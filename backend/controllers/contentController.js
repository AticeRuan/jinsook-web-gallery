const Content = require('../models/contentModel')
const mongoose = require('mongoose')

// Get content by page
const getContentByPage = async (req, res) => {
  const { page } = req.params

  try {
    const content = await Content.find({ page }).sort({ createdAt: -1 })

    if (!content || content.length === 0) {
      return res.status(404).json({ message: 'No content found for this page' })
    }

    res.status(200).json(content)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Create new content
const createContent = async (req, res) => {
  const { page, section, content } = req.body

  // Validation
  let emptyFields = []
  if (!page) emptyFields.push('page')
  if (!section) emptyFields.push('section')
  if (!content || content.length === 0) emptyFields.push('content')

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: 'Please fill in all required fields',
      emptyFields,
    })
  }

  try {
    // Validate content array structure
    const isValidContent = content.every(
      (item) =>
        typeof item.text === 'string' && typeof item.isBold === 'boolean',
    )

    if (!isValidContent) {
      return res.status(400).json({
        error:
          'Invalid content format. Each content item must have text (string) and isBold (boolean)',
      })
    }

    const newContent = await Content.create({
      page,
      section,
      content,
    })

    res.status(201).json(newContent)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update content
const updateContent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid content ID' })
  }

  try {
    const content = await Content.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true },
    )

    if (!content) {
      return res.status(404).json({ error: 'Content not found' })
    }

    res.status(200).json(content)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete content
const deleteContent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid content ID' })
  }

  try {
    const content = await Content.findOneAndDelete({ _id: id })

    if (!content) {
      return res.status(404).json({ error: 'Content not found' })
    }

    res.status(200).json(content)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getContentByPage,
  createContent,
  updateContent,
  deleteContent,
}
