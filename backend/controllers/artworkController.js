const Artworks = require('../models/artworkModel')
const mongoose = require('mongoose')

// Get all artworks
const getArtworks = async (req, res) => {
  try {
    const artworks = await Artworks.find().sort({ createdAt: -1 })

    res.status(200).json(artworks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Get one artwork
const getOneArtwork = async (req, res) => {
  try {
    const artwork = await Artworks.findById(req.params.id)

    res.status(200).json(artwork)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get artwork by category
const getArtworksByCategory = async (req, res) => {
  const category = req.params.category

  try {
    const artworks = await Artworks.find({ category: category }).sort({
      createdAt: -1,
    })

    res.status(200).json(artworks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Create a new artwork
const createArtwork = async (req, res) => {
  const {
    title,
    description,
    category,
    price,
    imageUrl,
    theme,
    medium,
    dimensions,
    featured,
    header,
  } = req.body
  let emptyFields = []
  //input validation
  if (!title) {
    emptyFields.push('title')
  }
  if (!category) {
    emptyFields.push('category')
  }
  if (!price) {
    emptyFields.push('price')
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ err: 'Please fill in all the fields.', emptyFields })
  }

  try {
    const artwork = await Artworks.create({
      title,
      description,
      category,
      price,
      imageUrl,
      theme,
      medium,
      dimensions,
      featured,
      header,
    })
    res.status(200).json(artwork)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

//update a artwork
const updateArtwork = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'Artwork not found' })
  }

  try {
    const artwork = await Artworks.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    )

    if (!artwork) {
      return res.status(404).json({ err: 'Artwork not found' })
    }

    res.status(200).json(artwork)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete a artwork
const deleteArtwork = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'Artwork not found' })
  }

  const artwork = await Artworks.findOneAndDelete({ _id: id })

  if (!artwork) return res.status(404).json({ err: 'Artwork not found' })

  res.status(200).json(artwork)
}

module.exports = {
  getArtworks,
  getOneArtwork,
  getArtworksByCategory,
  createArtwork,
  updateArtwork,
  deleteArtwork,
}
