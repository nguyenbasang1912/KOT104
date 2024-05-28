const express = require('express')
const router = express.Router()
const CategoryController = require('../../controllers/category.controller')
const { asyncHandler } = require('../../helpers/handError')
const { upload, handleUploadSingleImage } = require('../../configs/uploadFile')

router.post('', upload.single('thumb'), handleUploadSingleImage, asyncHandler(CategoryController.addNewCategory))
router.get('', asyncHandler(CategoryController.getAllCategories))
router.put('/:categoryId', asyncHandler(CategoryController.updateCategory))
router.delete('/:categoryId', asyncHandler(CategoryController.deleteCategory))

module.exports = router