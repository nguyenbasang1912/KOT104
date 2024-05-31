const express = require('express')
const router = express.Router()
const CartController = require('../../controllers/cart.controller')

router.post('', CartController.addProductToCart)
router.get('/:userId', CartController.findListCart)

module.exports = router