const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");
const { ErrorResponse } = require("../helpers/responseHandle");

const addProductToCart = async ({ userId, productId, quantity }) => {
  const product = await ProductModel.findOne({ _id: productId }).lean();

  if (!product) throw new ErrorResponse({ message: "product doesn't exist" });

  if (quantity > product.stock) throw new ErrorResponse({message: 'quantity out of range'})

  return await updateCart({ userId, productId, quantity });
};

const updateCart = async ({ userId, productId, quantity }) => {
  const options = { upsert: true, new: true };

  if (+quantity === 0) {
    // Xóa sản phẩm khỏi giỏ hàng nếu số lượng là 0
    return await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      options
    );
  } else {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const cart = await CartModel.findOne({
      userId,
      "products.productId": productId,
    });

    if (cart) {
      // Cập nhật số lượng sản phẩm nếu đã tồn tại trong giỏ hàng
      return await CartModel.findOneAndUpdate(
        { userId, "products.productId": productId },
        { $set: { "products.$.quantity": quantity } },
        options
      );
    } else {
      // Thêm sản phẩm mới vào giỏ hàng nếu chưa tồn tại
      return await CartModel.findOneAndUpdate(
        { userId },
        { $addToSet: { products: { productId, quantity } } },
        options
      );
    }
  }
};

const findListCart = async (userId) => {
  return await CartModel.findOne({ userId }).lean().select(['products']) || [];
};

module.exports = {
  addProductToCart,
  findListCart
};
