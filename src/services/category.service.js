const { ErrorResponse } = require('../helpers/responseHandle')
const Category = require('../models/category.model')
const ProductService = require('./product.service')

const addCategory = async (name, parentId = null, thumb) => {
  const category = await Category.create({
    category_name: name,
    parent_id: parentId,
    thumb: thumb
  })
  if (!category) throw new ErrorResponse({ message: 'Create Category Failed' })
  return category
}

const getAllCategories = async () => {
  const categories = await Category.find({ status: true }).select(['category_name', 'thumb']).lean()
  return categories
}

const deleteCategory = async (categoryId) => {
  const category = await Category.findOne({ _id: categoryId })
  if (!category) throw new ErrorResponse({ message: 'Category doesn\'t exist' })
  const existProduct = await ProductService.findProductByCategory(categoryId)
  if (existProduct?.length > 0) throw new ErrorResponse({ message: 'Category contain the product, cannot delete' })

  category.status = false
  await category.save()
  return {}
}

const updateCategory = async (categoryId, name, parentId = null) => {
  const category = await Category.findOne({ _id: categoryId })
  if (!category) throw new ErrorResponse({ message: 'Category doesn\'t exist' })

  category.category_name = name
  category.parent_id = parentId ?? category.parent_id
  return await category.save()
}

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
  getAllCategories
}