const express = require('express')
const { upload, handleUploadImage } = require('../../configs/uploadFile')
const router = express.Router()
const ProductController = require('../../controllers/product.controller')
const { asyncHandler } = require('../../helpers/handError')

router.post('', upload.array(['images']), handleUploadImage, asyncHandler(ProductController.addNewProduct))
router.delete('/:productId', asyncHandler(ProductController.deleteProduct))
router.get('', asyncHandler(ProductController.findAllProducts))
router.get('/:productId', asyncHandler(ProductController.findDetailProduct))
router.put('/:productId', upload.array(['images']), handleUploadImage, asyncHandler(ProductController.updateProduct))
router.get('/category/:categoryId', asyncHandler(ProductController.findProductByCategory))
router.get('/search/:keyword', asyncHandler(ProductController.searchProduct))

module.exports = router