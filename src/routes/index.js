const express = require('express')
const router = express.Router()

router.use('/api/product', require('./product'))
router.use('/api/category', require('./category'))
router.use('/api/cart', require('./cart'))

module.exports = router