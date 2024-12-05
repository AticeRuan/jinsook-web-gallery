const express = require('express')
const router = express.Router()
const requireAuth = require('../middlewares/requireAuth')
const {
  getContentByPage,
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/contentController')

// Public routes
router.get('/:page', getContentByPage)

// Protected routes - require authentication

router.post('/', requireAuth, createContent)
router.patch('/:id', requireAuth, updateContent)
router.delete('/:id', requireAuth, deleteContent)

module.exports = router
