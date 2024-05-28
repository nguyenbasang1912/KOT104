const { model, Schema } = require('mongoose')

const productSchema = new Schema({
  product_name: { type: String, required: true },
  product_description: { type: String, default: '' },
  product_price: { type: Number },
  product_images: { type: Array, default: [] },
  product_thumb: { type: String, default: '' },
  isDraft: { type: Boolean, default: false },
  isPublish: { type: Boolean, default: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'category' },
  stock: { type: Number, default: 0 },
  model: { type: String, required: true },
  type: { type: Array, default: [] }
}, {
  timestamps: true
})

productSchema.index({ product_name: 'text', product_description: 'text' })

productSchema.pre('save', function (next) {
  if (this.product_images.length > 0) {
    this.product_thumb = this.product_images[0].url ?? ""
  }
  next()
})


module.exports = model('product', productSchema)