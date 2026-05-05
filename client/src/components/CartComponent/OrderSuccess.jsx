import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearOrderState } from '../../productAPI/ProductSlice'
import './orderSuccess.scss'

function OrderSuccess() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ✅ clean up order state when leaving page
  useEffect(() => {
    return () => {
      dispatch(clearOrderState())
    }
  }, [dispatch])

  return (
    <div className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '60vh', textAlign: 'center' }}>

      <div style={{ fontSize: '64px' }}>✅</div>
      <h2 className="mt-3">Order Placed Successfully!</h2>
      <p className="text-muted">Thank you for your order. We'll deliver it soon.</p>

      <div className="d-flex gap-3 mt-4">
        <button
          className="btn btn-dark rounded-pill px-4"
          onClick={() => navigate('/orders')}
        >
          View My Orders
        </button>
        <button
          className="btn btn-outline-dark rounded-pill px-4"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>

    </div>
  )
}

export default OrderSuccess