const { SuccessResponse } = require("../helpers/responseHandle");
const { asyncHandler } = require("../helpers/handError");
const CartService = require("../services/cart.service");

const addProductToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  new SuccessResponse({
    message: "add product success",
    data: await CartService.addProductToCart({ userId, productId, quantity }),
  }).json(res);
});

const findListCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  new SuccessResponse({
    message: "find list cart success",
    data: await CartService.findListCart(userId),
  }).json(res);
});

module.exports = {
  addProductToCart,
  findListCart
}
