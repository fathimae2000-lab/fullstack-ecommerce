const pool = require('../config/db')
const queries = require('../queries/orders')

// ✅ CREATE
const createOrder = async ({ user_id, items, total_amount, address, payment_method }) => {
  const result = await pool.query(
    queries.createOrder,
    [user_id, JSON.stringify(items), total_amount, address, payment_method || 'cod']
  )
  return result.rows[0]
}

// ✅ GET ALL
const getOrders = async () => {
  const result = await pool.query(queries.getOrders)
  return result.rows
}

// ✅ GET BY ID
const getOrderById = async (id) => {
  const result = await pool.query(queries.getOrderById, [id])
  return result.rows[0]
}

// ✅ GET BY USER
const getOrdersByUserId = async (userId) => {
  const result = await pool.query(queries.getOrdersByUserId, [userId])
  return result.rows
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId
}