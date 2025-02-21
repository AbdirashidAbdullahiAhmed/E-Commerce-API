const Order = require('../models/Order')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { chechPermissions } = require('../utils')
const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'fake-client'
  return { client_secret, amount }
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}
const createOrder = async (req, res) => {
  const {
    items: cartItems,
    tax,
    shippingFee,
    // total,
    // paymentMethod,
    // paymentResult,
  } = req.body
  if (cartItems && cartItems.length === 0) {
    throw new CustomError.BadRequestError('No order items')
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee')
  }
  let orderItems = []
  let subtotal = 0
  for (let item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `Product not found with id : ${item.product}`
      )
    }
    const { _id, name, price, image } = dbProduct
    // console.log(_id, name, price, image)
    const singleOrderItem = {
      name,
      price,
      image,
      amount: item.amount,
      product: _id,
    }
    orderItems = [...orderItems, singleOrderItem]
    subtotal += price * item.amount
  }
  //   console.log(orderItems)
  //   console.log(subtotal)
  const total = subtotal + tax + shippingFee
  //get client secret
  const paymentIntent = await fakeStripeAPI({ amount: total, currency: 'usd' })
  const order = await Order.create({
    tax,
    shippingPrice: shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
    // paymentIntentId: paymentIntent.id,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
}
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
  }
  chechPermissions(req.user, order.user)
  res.status(StatusCodes.OK).json({ order })
}
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params
  const { paymentIntentId } = req.body
  if (!paymentIntentId) {
    throw new CustomError.BadRequestError('Please provide payment intent id')
  }
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`)
  }
  chechPermissions(req.user, order.user)
  order.status = 'processing'
  order.paymentIntentId = paymentIntentId
  await order.save()
  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getCurrentUserOrders,
  updateOrder,
}
