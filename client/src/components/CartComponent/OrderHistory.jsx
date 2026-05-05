import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersByUser } from '../../productAPI/ProductThunk'
import { useNavigate } from 'react-router-dom'
import Loader from '../../ui/Loader'
import './OrderHistory.scss'

function OrderHistory() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders, orderLoading, orderError } = useSelector((state) => state.product)

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    dispatch(fetchOrdersByUser(user.id))
  }, [dispatch])

  const getStatus = (status) => {
    const s = status?.toLowerCase() || 'pending'
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  if (orderLoading) return <Loader />
  if (orderError) return <p className="text-center text-danger mt-5">{orderError}</p>

  return (
    <div className="container order-history">

      {/* Header */}
      <div className="oh-header">
        <h3>My Orders</h3>
        <p>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="oh-empty">
          <div className="oh-empty__icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h5>No orders yet</h5>
          <p>Looks like you haven't placed any orders.</p>
          <button className="btn-shop" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>

      ) : (

        // Order Cards
        orders.map((order) => (
          <div className="oh-card" key={order.id}>

            {/* Top: Order ID + Status */}
            <div className="oh-card__top">
              <span className="oh-card__id">Order #{order.id}</span>
              <span className={`oh-status ${order.status?.toLowerCase() || 'pending'}`}>
                {getStatus(order.status)}
              </span>
            </div>

            <hr className="oh-divider" />

            {/* Info Grid */}
            <div className="oh-card__info">
              <div className="oh-info-item">
                <label>Date</label>
                <span>{new Date(order.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}</span>
              </div>

              <div className="oh-info-item">
                <label>Payment</label>
                <span>{order.payment_method?.toUpperCase()}</span>
              </div>

              <div className="oh-info-item oh-info-item--full">
                <label>Delivery Address</label>
                <span>{order.address}</span>
              </div>
            </div>

            <hr className="oh-divider" />

            {/* Bottom: Total + Button */}
            <div className="oh-card__bottom">
              <p className="oh-total">
                <span>Total</span>
                ₹{Number(order.total_amount).toLocaleString()}
              </p>
              <button
                className="oh-detail-btn"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                View Details
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory