import React from 'react'
import BreadCrumb from '../ui/BreadCrumb'
import CartItems from '../components/CartComponent/CartItems'
import Order from '../components/CartComponent/Order'
import './CartPage.scss'

function CartPage() {
  return (
    <div className='container cart-page'>
      <BreadCrumb home={"Home"} text={"Cart"} />

      <h2 className='cart-heading'>YOUR CART</h2>

      <div className='cart-layout'>
        <CartItems />
        <Order />
      </div>
    </div>
  )
}

export default CartPage