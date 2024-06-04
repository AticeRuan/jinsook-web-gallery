const Artwork = require('../models/artworkModel')
// Check if there's an existing artwork with header=true in the same category,
// If found, update the existing artwork's header field to false
const ensureSingleHeader = async (req, res, next) => {
  try {
    const { category, header } = req.body

    if (header === true) {
      const existingHeaderArtwork = await Artwork.findOne({
        category,
        header: true,
      })

      if (existingHeaderArtwork) {
        await Artwork.findByIdAndUpdate(existingHeaderArtwork._id, {
          header: false,
        })
      }
    }

    next()
  } catch (error) {
    console.error('Error updating header:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = ensureSingleHeader
