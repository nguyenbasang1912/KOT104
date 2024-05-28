const { SuccessResponse } = require('../helpers/responseHandle')
const CategoryService = require('../services/category.service')

const addNewCategory = async (req, res) => {
  const { name, parentId = null } = req.body
  const thumb = req.image
  return new SuccessResponse({
    message: 'Create category success',
    data: await CategoryService.addCategory(name, parentId, thumb)
  }).json(res)
}

const getAllCategories = async (req, res) => {
  return new SuccessResponse({
    message: 'Find all categories success',
    data: await CategoryService.getAllCategories()
  }).json(res)
}

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params
  return new SuccessResponse({
    message: 'delete category success',
    data: await CategoryService.deleteCategory(categoryId)
  }).json(res)
}

const updateCategory = async (req, res) => {
  const { categoryId } = req.params
  const { name, parentId } = req.body
  return new SuccessResponse({
    message: 'update category success',
    data: await CategoryService.updateCategory(categoryId, name, parentId)
  }).json(res)
}

module.exports = {
  addNewCategory,
  deleteCategory,
  updateCategory,
  getAllCategories
}