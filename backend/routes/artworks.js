const express = require('express')
const router = express.Router()
const {
  getArtworks,
  getOneArtwork,
  getArtworksByCategory,
  createArtwork,
  updateArtwork,
  deleteArtwork,
} = require('../controllers/artworkController')
const validateCategory = require('../middlewares/validateCategory')
const ensureSingleHeader = require('../middlewares/ensureSingleHeader')
const requireAuth = require('../middlewares/requireAuth')

router.get('/', getArtworks)
router.post('/', requireAuth, ensureSingleHeader, createArtwork)

router.use('/:category', validateCategory)
router.get('/:category', getArtworksByCategory)

router.get('/:category/:id', getOneArtwork)
router.patch('/:category/:id', requireAuth, ensureSingleHeader, updateArtwork)
router.delete('/:category/:id', requireAuth, deleteArtwork)

module.exports = router
