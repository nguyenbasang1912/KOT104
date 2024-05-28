const cloudinary = require('../configs/cloundinary')
const { SuccessResponse } = require('../helpers/responseHandle')
const ProductService = require('../services/product.service')
const { getSelectedField, unSelectedField } = require('../utils')

const addNewProduct = async (req, res) => {
  const body = req.body

  return new SuccessResponse({
    message: 'Create new product success',
    data: await ProductService.addNewProduct(body)
  }).json(res)
}

const deleteProduct = async (req, res) => {
  const { productId } = req.params
  return new SuccessResponse({
    message: 'Delete product success',
    data: await ProductService.deleteProduct(productId)
  }).json(res)
}

const updateProduct = async (req, res) => {
  const body = req.body
  const { productId } = req.params
  return new SuccessResponse({
    message: 'Update product success',
    data: await ProductService.updateProduct(productId, body)
  }).json(res)
}

const findAllProducts = async (req, res) => {
  const { page, limit } = req.query
  return new SuccessResponse({
    message: 'Find all product success',
    data: await ProductService.findAllProducts(limit, page, unSelectedField(['isDraft', 'isPublish', '__v', 'category_id']))
  }).json(res)
}

const findDetailProduct = async (req, res) => {
  const { productId } = req.params
  return new SuccessResponse({
    message: 'Find detail product success',
    data: await ProductService.findDetailProduct(productId)
  }).json(res)
}

const findProductByCategory = async (req, res) => {
  const { categoryId } = req.params
  return new SuccessResponse({
    message: 'Find product by category success',
    data: await ProductService.findProductByCategory(categoryId)
  }).json(res)
}

module.exports = {
  addNewProduct,
  deleteProduct,
  updateProduct,
  findAllProducts,
  findDetailProduct,
  findProductByCategory
}