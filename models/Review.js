const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 10,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
)
ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
module.exports = mongoose.model('Review', ReviewSchema)

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ])

  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}

ReviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.product)
})

ReviewSchema.pre('remove', function () {
  this.constructor.calculateAverageRating(this.product)
})
