const mongoose = require('mongoose')

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
})
const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
      //   default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      //   default: 0.0,
    },
    subtotal: {
      type: Number,
      required: true,
      //   default: 0.0,
    },
    total: {
      type: Number,
      required: true,
      //   default: 0.0,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enmu: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      //   required: true,
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
      //   required: true,
    },
  },

  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
