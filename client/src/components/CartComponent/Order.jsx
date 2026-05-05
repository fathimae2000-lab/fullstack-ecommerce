import React from 'react'
import './Order.scss'
import Button from '../../ui/Button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Order() {
  const navigate = useNavigate()
  const { productCart, totalPrice } = useSelector((state) => state.product)


  

  const storedUser = localStorage.getItem('user')
  let user = null
  if (storedUser) {
    try {
      user = JSON.parse(storedUser)
    } catch (err) {
      user = null
    }
  }

  const handleCheckout = () => {
    if (productCart.length === 0) {
      alert('Your cart is empty')
      return
    }
    if (!user) {
      // ✅ fix: navigate with state was wrong syntax before
      navigate('/login', { state: { from: '/checkout' } })
    } else {
      navigate('/checkout')
    }
  }
    return (
      <>
      <div className='order'>
          <p>Order Summary</p>
          <div>
              <p>Total</p>
              <p>{totalPrice}</p>
          </div>
          <Button  onclick={handleCheckout} text={"Go to Checkout"}/>
      </div>
      </>
    )
  }

  export default Order