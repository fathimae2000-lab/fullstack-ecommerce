// create order
const createOrder = `
INSERT INTO orders (user_id, items, total_amount, address, payment_method, status)
VALUES ($1, $2, $3, $4, $5, 'pending')
RETURNING *;
`

// get all orders
const getOrders = `
SELECT id, user_id, items, total_amount, address, payment_method, status, created_at
FROM orders
ORDER BY created_at DESC;
`

// get orders by user
const getOrdersByUserId = `
SELECT id, user_id, items, total_amount, address, payment_method, status, created_at
FROM orders
WHERE user_id = $1
ORDER BY created_at DESC;
`

// get single order by id
const getOrderById = `
SELECT id, user_id, items, total_amount, address, payment_method, status, created_at
FROM orders
WHERE id = $1;
`

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId
}