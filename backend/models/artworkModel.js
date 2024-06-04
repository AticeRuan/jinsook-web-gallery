const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArtworkSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['paintings', 'illustrations', 'childrens-books', 'handcrafts'],
      required: true,
    },
    price: { type: String, required: true },
    description: { type: String },
    medium: { type: String },
    dimensions: { type: String },
    imageUrl: { type: String },
    theme: { type: String },
    featured: { type: Boolean, default: false },
    header: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Artwork = mongoose.model('Artwork', ArtworkSchema)

module.exports = Artwork
