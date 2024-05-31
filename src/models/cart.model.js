const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  products: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('cart', cartSchema)
