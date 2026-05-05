const orderRepositories = require('../repositories/orders')
const asyncHandler = require('express-async-handler')
const errorResponse = require('../utlis/errorResponse')

// ✅ CREATE ORDER
const createOrder = asyncHandler(async (req, res, next) => {
  const { user_id, items, total_amount, address, payment_method } = req.body

  console.log("ORDER RECEIVED:", req.body) // ← check terminal when order fails

  if (!user_id || !items || !total_amount) {
    return next(new errorResponse("Missing fields", 400))
  }

  const newOrder = await orderRepositories.createOrder({
    user_id,
    items,
    total_amount,
    address,
    payment_method  // ✅ added
  })

  res.status(201).json({
    success: true,
    data: newOrder
  })
})

// ✅ GET ALL
const getOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderRepositories.getOrders()
  res.status(200).json({
    success: true,
    data: orders
  })
})

// ✅ GET BY ID
const getOrderById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const order = await orderRepositories.getOrderById(id)

  if (!order) {
    return next(new errorResponse("Order not found", 404))
  }

  res.status(200).json({
    success: true,
    data: order
  })
})

// ✅ GET BY USER
const getOrdersByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  const orders = await orderRepositories.getOrdersByUserId(userId)

  res.status(200).json({
    success: true,
    data: orders
  })
})

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId
}