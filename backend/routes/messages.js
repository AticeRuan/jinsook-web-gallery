const express = require('express')
const router = express.Router()
const {
  getMessages,
  getOneMessage,
  createMessage,
  deleteMessage,
} = require('../controllers/messageControler')
const requireAuth = require('../middlewares/requireAuth')

router.get('/', requireAuth, getMessages)
router.post('/', createMessage)
router.get('/:id', requireAuth, getOneMessage)
router.delete('/:id', requireAuth, deleteMessage)

module.exports = router
