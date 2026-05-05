import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../ui/Loader'
import './MyOrder.scss'

function MyOrders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      if (!user) { navigate('/login'); return }
      try {
        const res = await fetch(`http://localhost:5000/api/orders/user/${user.id}`)
        const data = await res.json()
        if (res.ok) setOrders(data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [navigate])

  if (loading) return <Loader />

  return (
    <div className="orders-page">
      <div className="container">

        <h2 className="orders-title">My Orders</h2>

        {orders.length === 0 ? (
          <p className="empty-msg text-center">No orders yet.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">

              <div className="order-header">
                <span className="order-id">#{String(order.id).padStart(5, '0')}</span>
                <span className={`order-status ${order.status === 'delivered' ? 'status-delivered' : ''}`}>
                  {order.status || 'pending'}
                </span>
              </div>

              <div className="order-meta">
                <span className="order-total">₹{order.total_amount}</span>
                <span className="order-date">
                  {new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>

              <div className="items-section">
                <p className="items-label">Items</p>
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.product_name}</span>
                    <span className="item-qty-price">{item.quantity} × ₹{item.price}</span>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  )
}

export default MyOrders