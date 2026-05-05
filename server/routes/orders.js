const express = require('express')
const router = express.Router()

const {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId
} = require('../controllers/orders')

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrderById)
router.get('/user/:userId', getOrdersByUserId)

module.exports = router