import React from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import './CartItems.scss'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, removeFromCart } from '../../productAPI/ProductSlice'


function CartItems() {

  const dispatch = useDispatch()

  const { productCart = [], totalPrice } = useSelector((state) => state.product)

  const handleDelete = (id) => {
    dispatch(removeFromCart(id))
  }

  return (

    <>
      {productCart.length == 0 ? <h2>Empty Cart</h2> : (
        <div className='carts'>
          {productCart.map(item => (

            <div className='cart-item' key={item.id}>

              {/* Image */}
              <img width={125} src={item.imageUrl} alt={item.product_name} />

              {/* Info */}
              <div className='cart-info'>

                <div className='cart-name'>
                  <p className='title'>{item.product_name}</p>
                  {item.offerprice ? (
                    <>
                      {item.offerprice} {""}
                      <span className='price' style={{ textDecoration: 'line-through', color: 'grey' }}>{item.price}</span>
                    </>
                  ) : (
                    item.price
                  )}
                </div>

                {/* Actions */}
                <div className='side-cart'>
                  <FaTrash color='red' className='delete' onClick={() => {
                    handleDelete(item.id)
                  }} />

                  <div className='cart-btn'>
                    <FaMinus onClick={() => {
                      dispatch(decrement(item.id))
                    }} />
                    <span>{item.quantity}</span>
                    <FaPlus onClick={() => {
                      dispatch(increment(item.id))
                    }} />
                  </div>
                </div>

              </div>

            </div>
          ))}

          {/* Total Price */}
          <div className='cart-total'>
            <h3>Total: {totalPrice}</h3>
          </div>

        </div>
      )}

    </>
  )
}

export default CartItems