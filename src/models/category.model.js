const { model, Schema } = require('mongoose')

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  status: { type: Boolean, default: true },
  parent_id: { type: Schema.Types.ObjectId, default: null },
  thumb: { type: Object, default: {} }
}, {
  timestamps: true
})

module.exports = model('category', categorySchema)