const validateCategory = (req, res, next) => {
  const { category } = req.params
  const allowedCategories = [
    'paintings',
    'goods',
    'childrens-books',
    'crafts',
    'feature',
  ]

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' })
  }
  next()
}

module.exports = validateCategory
