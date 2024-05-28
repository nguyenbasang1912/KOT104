const { ErrorResponse } = require('../helpers/responseHandle')
const Product = require('../models/product.model')
const Category = require('../models/category.model')
const { unSelectedField } = require('../utils')

const findProductByCategory = async (categoryId) => {
  const category = await Category.findOne({ status: true, _id: categoryId }).lean()
  if (!category) throw new ErrorResponse({message: 'Category doesn\'t exist'})
  const products = await Product.find({ category_id: categoryId, isPublish: true }).lean()
  return products
}

const findAllProducts = async (limit = 30, page = 0, select = []) => {
  const skip = limit * page
  const products = await Product.find({ isPublish: true })
    .limit(limit)
    .skip(skip)
    .select(select)
    .lean()
  return products
}

const addNewProduct = async (body) => {
  const categoryId = await Category.findOne({ _id: body.category_id, status: true }).lean()
  if (!categoryId) throw new ErrorResponse({ message: 'Category doesn\'t exist' })
  const product = await Product.create({ ...body })
  return product
}

const updateProduct = async (productId, body) => {
  const product = await Product.findByIdAndUpdate(productId, body, { new: true })
  if (!product) throw new ErrorResponse('Update product failed')
  return product
}

const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId)
  console.log(product)
  return {}
}

const findDetailProduct = async (productId) => {
  const product = await Product
    .findOne({ _id: productId, isPublish: true })
    .select(unSelectedField(['product_thumb', '__v', 'isDraft', 'isPublish'])).lean()
  if (!product) throw new ErrorResponse({ message: 'Product doesn\'t exist' })
  return product
}

const searchProduct = async (keyword) => {
  console.log(keyword)
  const products = await Product.find({ $text: { $search: keyword } }).lean()
  return products
}

module.exports = {
  findProductByCategory,
  findAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  findDetailProduct,
  searchProduct
}